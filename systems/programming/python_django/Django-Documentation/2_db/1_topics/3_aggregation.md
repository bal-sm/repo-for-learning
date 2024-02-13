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

## Generating aggregates over a `QuerySet`

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

...

## Generating aggregates for each item in a `QuerySet`

...

### Combining multiple aggregations

...

## Joins and aggregates

...

### Following relationships backwards

...

## Aggregations and other `QuerySet` clauses

...

### `filter()` and `exclude()`

...

#### Filtering on annotations

...

#### Order of `annotate()` and `filter()` clauses

...

### `order_by()`

...

### `values()`

...

#### Order of `annotate()` and `values()` clauses

...

#### Interaction with `order_by()`

...

### Aggregating annotations

...

### Aggregating on empty querysets or groups

...
