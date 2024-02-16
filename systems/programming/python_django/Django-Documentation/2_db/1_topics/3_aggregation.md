# Aggregation

Them, skip:
> The topic guide on [Django’s database-abstraction API](./2_queries.md) described the way that you can use Django queries that create, retrieve, update and delete individual objects. 

Them:
> However, sometimes you will need to retrieve values that are derived by *summarizing* or *aggregating* a collection of objects. This topic guide describes the ways that *aggregate* *values* can be **generated** and **returned** _using Django queries_.

Throughout this guide, _we’ll refer to the following models_. These models are used to track the inventory for a series of online bookstores:

```python
from django.db import models


class Author(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()


class Publisher(models.Model):
    name = models.CharField(max_length=300)


class Book(models.Model):
    name = models.CharField(max_length=300)
    pages = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    rating = models.FloatField()
    authors = models.ManyToManyField(Author)
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)
    pubdate = models.DateField()


class Store(models.Model):
    name = models.CharField(max_length=300)
    books = models.ManyToManyField(Book)
```

## Cheat sheet — Unmodded

Them:
> In a hurry? Here’s how to do common aggregate queries, assuming the models above:

```python
# Total number of books.
>>> Book.objects.count()
2452

# Total number of books with publisher=BaloneyPress
>>> Book.objects.filter(publisher__name="BaloneyPress").count()
73

# Average price across all books, provide default to be returned instead
# of None if no books exist.
>>> from django.db.models import Avg
>>> Book.objects.aggregate(Avg("price", default=0))
{'price__avg': 34.35}

# Max price across all books, provide default to be returned instead of
# None if no books exist.
>>> from django.db.models import Max
>>> Book.objects.aggregate(Max("price", default=0))
{'price__max': Decimal('81.20')}

# Difference between the highest priced book and the average price of all books.
>>> from django.db.models import FloatField
>>> Book.objects.aggregate(
...     price_diff=Max("price", output_field=FloatField()) - Avg("price")
... )
{'price_diff': 46.85}

# All the following queries involve traversing the Book<->Publisher
# foreign key relationship backwards.

# Each publisher, each with a count of books as a "num_books" attribute.
>>> from django.db.models import Count
>>> pubs = Publisher.objects.annotate(num_books=Count("book"))
>>> pubs
<QuerySet [<Publisher: BaloneyPress>, <Publisher: SalamiPress>, ...]>
>>> pubs[0].num_books
73

# Each publisher, with a separate count of books with a rating above and below 5
>>> from django.db.models import Q
>>> above_5 = Count("book", filter=Q(book__rating__gt=5))
>>> below_5 = Count("book", filter=Q(book__rating__lte=5))
>>> pubs = Publisher.objects.annotate(below_5=below_5).annotate(above_5=above_5)
>>> pubs[0].above_5
23
>>> pubs[0].below_5
12

# The top 5 publishers, in order by number of books.
>>> pubs = Publisher.objects.annotate(num_books=Count("book")).order_by("-num_books")[:5]
>>> pubs[0].num_books
1323
```

## Generating aggregates over a `QuerySet` — Mahmuda's version

- Django provides two ways to generate aggregates.:
  1. The first way is to generate summary values over an entire `QuerySet`.:
     1. For example, say you wanted to calculate the average price of all books available for sale. Django’s query syntax provides a means for describing the set of all books:

        ```python
        >>> Book.objects.all()
        ```

     2. What we need is a way to calculate summary values over the objects that belong to this `QuerySet`. This is done by appending an `aggregate()` clause onto the `QuerySet`:

        ```python
        >>> from django.db.models import Avg
        >>> Book.objects.all().aggregate(Avg("price"))
        {'price__avg': 34.35}
        ```

     3. The `all()` is redundant in this example, so this could be simplified to:

        ```python
        >>> Book.objects.aggregate(Avg("price"))
        {'price__avg': 34.35}
        ```
    
     4. (Mod pisan) If you want to manually specify a name for the aggregate value:

        ```python
        >>> Book.objects.aggregate(average_price=Avg("price"))
        {'average_price': 34.35}
        ```

     5. If you want to generate more than one aggregate:

        ```python
        >>> from django.db.models import Avg, Max, Min
        >>> Book.objects.aggregate(Avg("price"), Max("price"), Min("price"))
        {'price__avg': 34.35, 'price__max': Decimal('81.20'), 'price__min': Decimal('12.99')}
        ```

## Generating aggregates for each item in a `QuerySet` — Light modded

2. The second way to generate summary values is to generate an independent summary for each object in a `QuerySet`.

Them:
> For example, if you are retrieving a list of books, you may want to know how many authors contributed to each book. Each `Book` has a many-to-many relationship with the `Author`; we want to summarize this relationship for each book in the `QuerySet`.

Per-object summaries can be generated using the `annotate()` clause. When an `annotate()` clause is specified, each object in the `QuerySet` will be annotated with the specified values.

The syntax for these annotations is identical to that used for the `aggregate()` clause. Each argument to `annotate()` describes an aggregate that is to be calculated. For example, to annotate books with the number of authors:

```python
# Build an annotated queryset
>>> from django.db.models import Count
>>> q = Book.objects.annotate(Count("authors"))
# Interrogate the first object in the queryset
>>> q[0]
<Book: The Definitive Guide to Django>
>>> q[0].authors__count
2
# Interrogate the second object in the queryset
>>> q[1]
<Book: Practical Django Projects>
>>> q[1].authors__count
1
```

As with `aggregate()`, the name for the annotation is automatically derived from the name of the aggregate function and the name of the field being aggregated. You can override this default name by providing an alias when you specify the annotation:

```python
>>> q = Book.objects.annotate(num_authors=Count("authors"))
>>> q[0].num_authors
2
>>> q[1].num_authors
1
```

- Unlike `aggregate()`, `annotate()` is _*not* a terminal clause_.
  - The output of the `annotate()` clause is a `QuerySet`; this `QuerySet` can be modified using any other `QuerySet` operation, including `filter()`, `order_by()`, or even additional calls to `annotate()`.

### Combining multiple aggregations — Light modded

Combining multiple aggregations with `annotate()` will [yield the wrong results](https://code.djangoproject.com/ticket/10060) because joins are used instead of subqueries:

```python
>>> book = Book.objects.first()
>>> book.authors.count()
2
>>> book.store_set.count()
3
>>> q = Book.objects.annotate(Count("authors"), Count("store"))
>>> q[0].authors__count
6
>>> q[0].store__count
6
```

For most aggregates, there is no way to avoid this problem, however, the `Count` aggregate has a `distinct` parameter that may help:

```python
>>> q = Book.objects.annotate(
...     Count("authors", distinct=True), Count("store", distinct=True)
... )
>>> q[0].authors__count
2
>>> q[0].store__count
3
```

Them:
> _If in doubt, inspect the SQL query!_
>
> In order to understand what happens in your query, consider inspecting the `query` property of your `QuerySet`.

## Joins and aggregates — Mahmuda's version

Them:
> So far, we have dealt with aggregates over fields that belong to the model being queried. However, sometimes the value you want to aggregate will belong to a model that *is related* to the model you are querying.
>
> When specifying the field to be aggregated in an aggregate function, Django will allow you to use the same [double underscore notation](./2_queries.md#field-lookups--mahmudas-version):

Mine:
> `field__lookuptype=value. `

Them:
> that is used when referring to related fields in filters. Django will then handle any table joins that are required to retrieve and aggregate the related value.

---

For example, to find the price range of books offered in each store, you could use the annotation:

```python
>>> from django.db.models import Max, Min
>>> Store.objects.annotate(min_price=Min("books__price"), max_price=Max("books__price"))
```

Them:
> This tells Django to retrieve the `Store` model, join (through the many-to-many relationship) with the `Book` model, and aggregate on the price field of the book model to produce a minimum and maximum value.

---

The same rules apply to the `aggregate()` clause. If you wanted to know the lowest and highest price of any book that is available for sale in any of the stores, you could use the aggregate:

```python
>>> Store.objects.aggregate(min_price=Min("books__price"), max_price=Max("books__price"))
```

---

Join chains can be as deep as you require. For example, to extract the age of the youngest author of any book available for sale, you could issue the query:

```python
>>> Store.objects.aggregate(youngest_age=Min("books__authors__age"))
```

---

### Following relationships backwards — Mahmuda's version

Them:
> In a way similar to [Lookups that span relationships](./2_queries.md#lookups-that-span-relationships--mahmudas-version), aggregations and annotations on fields of models or models that are related to the one you are querying can include traversing “reverse” relationships. The lowercase name of related models and double-underscores are used here too.

---

Them:
> For example, we can ask for all publishers, annotated with their respective total book stock counters (note how we use `book` to specify the `Publisher` -> `Book` reverse foreign key hop):

Mine:
> `Book` + ForeignKey -> `Publisher` -> `book` -> `Book`

```python
>>> from django.db.models import Avg, Count, Min, Sum
>>> p = Publisher.objects.annotate(Count("book"))
>>> p[0].book__count
```

---

Them:
> We can also ask for the oldest book of any of those managed by every publisher:

```python
>>> Publisher.objects.aggregate(oldest_pubdate=Min("book__pubdate"))
```

---

Them:
> This doesn’t apply just to foreign keys. It also works with many-to-many relations. For example, we can ask for every author, annotated with the total number of pages considering all the books the author has (co-)authored (note how we use `book` to specify the `Author` -> `Book` reverse many-to-many hop):

```python
>>> a = Author.objects.annotate(total_pages=Sum("book__pages"))
>>> a[0].total_pages
```

---

Them:
> Or ask for the average rating of all the books written by author(s) we have on file:

```python
>>> ano_a = Author.objects.aggregate(average_rating=Avg("book__rating"))
>>> ano_a.average_rating
```

---

## Aggregations and other `QuerySet` clauses

### `filter()` and `exclude()` — Mahmuda's version

Why this is MV:
> - Jump to the code aja

---

```python
QuerySet.objects.filter(...=...).annotate(...=...(...)) # ✔️, valid.
```

```python
>>> from django.db.models import Avg, Count
>>> Book.objects.filter(name__startswith="Django").annotate(num_authors=Count("authors"))
```

---

```python
QuerySet.objects.filter(...=...).aggregate(...=...(...)) # also, ✔️, valid.
```

```python
>>> Book.objects.filter(name__startswith="Django").aggregate(Avg("price"))
```

---

#### Filtering on annotations — Mahmuda's version

Why this is MV:
> - Jump to the code aja
>   + extended code
> - Dirumusin aja

---

```python
QuerySet.objects.annotate(the_alias=Func("the_field")).filter(the_alias__anything=anything_2)
```

---

```python
>>> Book.objects.annotate(num_authors=Count("authors")).filter(num_authors__gt=1)
```

---

```python
QuerySet.objects.annotate((first_annotation, second_annotation_plus_filter))
```

---

```python
>>> highly_rated = Count("book", filter=Q(book__rating__gte=7))
>>> a = Author.objects.annotate(num_books=Count("book"), highly_rated_books=highly_rated)
>>> a[0].num_books
>>> a[0].highly_rated_books
```

---

[_Conditional aggregation_](https://docs.djangoproject.com/en/5.0/ref/models/conditional-expressions/#conditional-aggregation)

```python
QuerySet.objects.aggregate(..., filter=Q(...=...))
```

Maintenance note:
> Pindah jadi a dedicated file di `ref`.

Them, a note:
> _Choosing between `filter` and `QuerySet.filter()`_
>
> Avoid using the `filter` argument with a single annotation or aggregation. It’s more efficient to use `QuerySet.filter()` to exclude rows. The aggregation `filter` argument is only useful when using two or more aggregations over the same relations with different conditionals.

---

#### Order of `annotate()` and `filter()` clauses — Mahmuda's version

Why this is MV:
> - Jump to the code aja
> - Dirumusin aja
> - Ilustrasi + Contoh + Hasil-in aja

---

```python
QuerySet.objects.annotate(...).filter(...)
```

=/= (is not equivalent to.., *not* *commutative*)

```python
QuerySet.objects.filter(...).annotate(...)
```

---

bla-bla-bla

Mine:
> Makanya, urutan `annotate()` dan `filter()` itu penting, dan menghasilkan hasil-hasil yang berbeda.

Them:
> Given:
> - Publisher A has two books with ratings 4 and 5.
> - Publisher B has two books with ratings 1 and 4.
> - Publisher C has one book with rating 1.

Mine:
> Nah kan kalo misalnya dicari buku-buku yang ratingnya lebih dari 3 di setiap `Publisher`, jadinya gini:
> - Publisher A, 2 buku
> - Publisher B, 1 buku
> - Publisher C, 0 buku
>
> Nah sekarang mari kita lihat apa yang terjadi apabila "switch it up" the `filter()` and `annotate()` clause.

Them-:
> Here’s an example with the `Count` aggregate:

```python
>>> a, b = Publisher.objects.annotate(num_books=Count("book", distinct=True)).filter(
...     book__rating__gt=3.0
... )
>>> a, a.num_books
(<Publisher: A>, 2) # ✔️
>>> b, b.num_books
(<Publisher: B>, 2) # ❌

---

>>> a, b = Publisher.objects.filter(book__rating__gt=3.0).annotate(num_books=Count("book"))
>>> a, a.num_books
(<Publisher: A>, 2) # ✔️
>>> b, b.num_books
(<Publisher: B>, 1) # ✔️
```

Mine:
> Tuh keliatan kan, yang bener gimana?

Them:
> Both queries return a list of publishers that have at least one book with a rating exceeding 3.0, hence publisher C is excluded.
> 
> In the first query, the annotation precedes the filter, so the filter has no effect on the annotation. `distinct=True` is required to avoid a [query bug](https://docs.djangoproject.com/en/5.0/topics/db/aggregation/#combining-multiple-aggregations).
> 
> The second query counts the number of books that have a rating exceeding 3.0 for each publisher. The filter precedes the annotation, so the filter constrains the objects considered when calculating the annotation.

---

_Kalau `Avg`..._

Mine, a prelude:
> ..., TBA aja dulu hehe, sayangggg ingetinn aku, maksudnya gimana.

Them:
> Here’s another example with the `Avg` aggregate:

```python
>>> a, b = Publisher.objects.annotate(avg_rating=Avg("book__rating")).filter(
...     book__rating__gt=3.0
... )
>>> a, a.avg_rating
(<Publisher: A>, 4.5)  # (5+4)/2
>>> b, b.avg_rating
(<Publisher: B>, 2.5)  # (1+4)/2

>>> a, b = Publisher.objects.filter(book__rating__gt=3.0).annotate(
...     avg_rating=Avg("book__rating")
... )
>>> a, a.avg_rating
(<Publisher: A>, 4.5)  # (5+4)/2
>>> b, b.avg_rating
(<Publisher: B>, 4.0)  # 4/1 (book with rating 1 excluded)
```

Mine, conclusion:
> ..., TBA lagi, sayangggg.

Them:
> The first query asks for the average rating of all a publisher’s books for publisher’s that have at least one book with a rating exceeding 3.0. The second query asks for the average of a publisher’s book’s ratings for only those ratings exceeding 3.0.
>
> It’s difficult to intuit how the ORM will translate complex querysets into SQL queries so when in doubt, inspect the SQL with `str(queryset.query)` and write plenty of tests.

---

### `order_by()` — Mahmuda's version

```python
QuerySet.objects.annotate(some_alias=...).order_by("some_alias")
```

---

For example:

```python
>>> Book.objects.annotate(num_authors=Count("authors")).order_by("num_authors")
```

---

### `values()` — Mahmuda's version (coming soon)

..., TBA.

Mine, maintenance:
> Sayanggg, nanti sama kamu aja ya, tambahin hasil dictionary-nya, jadi gimana.

#### Order of `annotate()` and `values()` clauses

..., idem.

#### Interaction with `order_by()`

..., idem.

### Aggregating annotations — Mahmuda's version

```python
QuerySet.objects.annotate(some_alias=Func("a_field_or_something")).aggregate(Func("some_alias"))
```

```python
>>> from django.db.models import Avg, Count
>>> Book.objects.annotate(num_authors=Count("authors")).aggregate(Avg("num_authors"))
{'num_authors__avg': 1.66}
```

### Aggregating on empty querysets or groups — Mahmuda's version

...
