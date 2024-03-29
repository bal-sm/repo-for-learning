# Making queries — Mahmuda's version

Mine:
> Taken from, [Making queries from official docs](https://docs.djangoproject.com/en/5.0/topics/db/queries/).

Django -automatically-> [Data models -> Database-abstraction API <-that-> lets you create, retrieve, update, and delete objects]-> how to use this API -⬇️

## Models used as reference

```python
from datetime import date

from django.db import models


class Blog(models.Model):
    name = models.CharField(max_length=100)
    tagline = models.TextField()

    def __str__(self):
        return self.name


class Author(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()

    def __str__(self):
        return self.name


class Entry(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)
    headline = models.CharField(max_length=255)
    body_text = models.TextField()
    pub_date = models.DateField()
    mod_date = models.DateField(default=date.today)
    authors = models.ManyToManyField(Author)
    number_of_comments = models.IntegerField(default=0)
    number_of_pingbacks = models.IntegerField(default=0)
    rating = models.IntegerField(default=5)

    def __str__(self):
        return self.headline
```

## Creating objects — Mahmuda's version

### Philosophy/How-Django-utilizes-Python-objects-convention — Mahmuda's version

- To represent **`database`-`table data`** <-> **Python objects**, Django uses an intuitive system:
  - A model **class** <-represents--> a database **table**, and
  - An **instance** of that _(model)_ _**class**_ <-"--> **A particular record** in the database table.

### The Code

To create an object -> instantiate _these_-> model class + keyword arguments (fields as parameters) -then-> call `save()` -to-save-it-to-the-> database.

Assuming `Model`s -live-in-> a file => `mysite/blog/models.py`, here's an example:

```python
>>> from blog.models import Blog
>>> b = Blog(name="Beatles Blog", tagline="All the latest Beatles news.")
>>> b.save()
```

### Behind the SQL — Mahmuda's version

Little note:
> Let's make this a thing, throughout this topic and document.

**This** (call **`save()`**) -performs-> an `INSERT` SQL statement (BTS) -> ...

Mine lagi:
> Tapi saya pun belum mengerti gimana isi SQL nya, sebenernya.

### Notes — Mahmuda's version

- Django **does not** hit the database until you explicitly call `save()`.
- `save()` -/-> return value (maksudnya moal mere value nanaon deui)
- `save()` <-takes- a number of advanced options not described here, but [here](https://docs.djangoproject.com/en/5.0/ref/models/instances/#django.db.models.Model.save)
  - > nanti ubah ke link di repo ieu, maintenance note.
- `create()` -> create an object and `save()` it in a single step.
  - Read more about [`create()`](https://docs.djangoproject.com/en/5.0/ref/models/querysets/#django.db.models.query.QuerySet.create).

## Saving changes to objects — Mahmuda's version

To _save **changes**_ to an object that's already in the database, use `save()`, again, yes.

### The Code

```python
>>> from blog.models import Blog
>>> b_2 = Blog(name="Yoko Ono's Blog", tagline="All the latest Yoko Ono's news.") # ngikutin aja, I love the Beatles.
>>> b_2.save()
>>> b_2.name = "Yoko Ono and Sean's Blog"
>>> b_2.save()
```

### Behind the SQL — Mahmuda's version

**This** -performs-> an `UPDATE` SQL statement (BTS) -> ...

Again, them:
> Django **does not** hit the database until you explicitly call `save()`.

Maintenance note:
> Add the SQL statement here, please.

### Saving `ForeignKey` and `ManyToManyField` fields — Mahmuda's version

Almost similar to [Creating objects](#creating-objects--mahmudas-version).

Based on [this `models.py`](#models-used-as-reference):

```python
>>> from blog.models import Blog, Entry
>>> entry = Entry.objects.get(pk=1)
>>> cheese_blog = Blog.objects.get(name="Cheddar Talk")
>>> entry.blog = cheese_blog
>>> entry.save()
```

- Updating a `ManyToManyField` works a little differently:
  - use the `add()` method on the field to add a record to the relation.

    ```python
    >>> from blog.models import Author
    >>> joe = Author.objects.create(name="Joe")
    >>> entry.authors.add(joe)
    ```

  - To add multiple records to a `ManyToManyField` in one go:

    ```python
    >>> john = Author.objects.create(name="John")
    >>> paul = Author.objects.create(name="Paul")
    >>> george = Author.objects.create(name="George")
    >>> ringo = Author.objects.create(name="Ringo")
    >>> entry.authors.add(john, paul, george, ringo)
    ```

  - > Django will complain if you try to assign or add an object of the wrong type, them.

## Retrieving objects — Mahmuda's version

To retrieve objects from your database -> construct a `QuerySet` -via-> a `Manager` on your model class.

- A `QuerySet` -represents-> _a collection of **objects**_ from your **database**.
  - It can have zero, one or many _filters_.
  - Filters narrow down the query results _based on the given **parameters**_.
  - In _SQL terms_, a `QuerySet` -equates-to-a-> `SELECT` statement, 
    - and a filter -is-a-limiting-clause---such-as-> `WHERE` or `LIMIT`.

- How to get a `QuerySet` which contains all the objects you queried:
  - Each model -has-at-least-one-> Default `Manager` / `objects` -> `objects` + arguments -> `QuerySet`
  - Access it directly via the model class, like so:

    ```python
    >>> Blog.objects
    <django.db.models.manager.Manager object at ...>
    >>> b = Blog(name="Foo", tagline="Bar")
    >>> b.objects
    Traceback:
        ...
    AttributeError: "Manager isn't accessible via Blog instances."
    ```
    - > `Manager`s / `objects` are accessible only via model classes, ~~rather than from model instances~~,
      - > to _enforce a separation_ between: 
        - > **“table-level”** operations and 
        - > **“record-level”** operations.
        - > them.
        - > again gening eta level-level.

Them, important / ignore aja sih bebas, soalnya dupe / penjelasan lebih:
> - The **`Manager`** is the **main source of `QuerySets`** for a model. 
>   - For example, `Blog.objects.all()` -returns-a-> `QuerySet` -that-contains-all-> `Blog` objects in the database.

### Retrieving all objects — Mahmuda's version

- The simplest way to retrieve objects from a table is to **get all of them**. 
  - To do this, use `all()` method on a `Manager`.

    ```python
    >>> all_entries = Entry.objects.all()
    ```

    Mine, again:
    > Refer to [this `models.py`](#models-used-as-reference) for this `Entry` model.

  - > The `all()` method returns a `QuerySet` of all _thoose_ `objects`-objects in the database, me.

### Retrieving specific objects with filters — Mahmuda's version

- `QuerySet` <-returned-by- `all()`
  - -describes-> all objects -in-the-> database table
  - Usually though, you'll need to select only a subset of the complete set of objects.

- To create such a subset, 
  - -> you refine the initial `QuerySet`, 
  - -> adding filter conditions.
  - The two most common ways to refine a `QuerySet` are:
    - `filter(**kwargs)`
      - _Returns a new `QuerySet` containing objects that_ **match** _the given lookup parameters_.
    - `exclude(**kwargs)`
      - _Returns a new `QuerySet` containing objects that_ **do not match** _the given lookup parameters_.

Them:
> The lookup parameters (`**kwargs` in the above function definitions) should be in the format described in [Field lookups](#field-lookups--mahmudas-version) below.

#### For example

To get a `QuerySet` of:

- Blog entries from the year 2006:

  ```python
  Entry.objects.filter(pub_date__year=2006)
  ```

  - or:

    ```python
    Entry.objects.all().filter(pub_date__year=2006)
    ```

    Learning note:

    ```{note}
    Them:
    > With the default manager class, it is the same as: ... (above)

    Maksudnya kalo custom manager class, gak bisa? atau gimana?
    ```

#### Chaining filters — Mahmuda's version

Them, modded:
> - The result of refining => a `QuerySet` is -itself-a=> `QuerySet`, 
>   - so it’s possible to chain refinements together.

##### For example

```python
>>> Entry.objects.filter(headline__startswith="What").exclude(
...     pub_date__gte=datetime.date.today()
... ).filter(pub_date__gte=datetime.date(2005, 1, 30))
```

- This takes the initial `QuerySet` of _all entries in the database_ -> adds a filter, -then-an-> exclusion, -then-> another filter. 
  - The final result =is=a=> `QuerySet` =containing=> _all entries_ =with=> _a headline_ that:
    - **starts** **with** _“What”_, 
    - that were published between January 30, 2005, and the current day.

Mine:
> Fix the styling, please, rada ribet lagi.

#### Filtered `QuerySet`s are unique — Mahmuda's version

- Each time you refine a `QuerySet` -> you get a **brand-new** `QuerySet` 
  - that _is in **no way**_ **bound** to the previous `QuerySet`.
  - _Each refinement_ **creates** a *separate* and *distinct* `QuerySet` that can be *stored*, *used* and *reused*.

##### Example

```python
>>> q1 = Entry.objects.filter(headline__startswith="What")
>>> q2 = q1.exclude(pub_date__gte=datetime.date.today())
>>> q3 = q1.filter(pub_date__gte=datetime.date.today())
```

Them, skip aja, kecuali yang di-**bold**:
> - These three `QuerySet`s are separate. 
>   - The first is a base `QuerySet` containing all entries that contain a headline starting with “What”. 
>   - The second is a subset of the first, with an additional criteria that excludes records whose `pub_date` is today or in the future. 
>   - The third is a subset of the first, with an additional criteria that selects only the records whose `pub_date` is today or in the future. 
>   - **The initial `QuerySet` (`q1`) is unaffected by the refinement process.**

#### `QuerySet`s are lazy — Mahmuda's version

Mine:
> Penting banget inih. It really is optimized, makanya stop overthink! ME!

- `QuerySet`s are lazy:
  - the act of creating a `QuerySet` doesn’t involve any database activity. 
  - You can stack `filter`s together all day long, and 
    - Django **won’t actually run** the query until the `QuerySet` is evaluated. 

##### Example

```python
>>> q = Entry.objects.filter(headline__startswith="What")
>>> q = q.filter(pub_date__lte=datetime.date.today())
>>> q = q.exclude(body_text__icontains="food")
>>> print(q)
```

Mine:
> Jadi pas "diminta" saat `print(q)`, baru database-nya diakses. Sehingga sebenarnya database hanya **diakses satu kali**, bukan tiga kali.

Them, skip aja kalo udah ngerti:
> Though this looks like three database hits, in fact it hits the database only once, at the last line (`print(q)`). In general, the results of a `QuerySet` aren’t fetched from the database until you “ask” for them. When you do, the `QuerySet` is _evaluated_ by accessing the database. For more details on exactly when evaluation takes place, see When `QuerySet`s are evaluated, [from the official docs](https://docs.djangoproject.com/en/5.0/ref/models/querysets/#when-querysets-are-evaluated), [~~from this repo~~](belum-dibuat).

### Retrieving a single object with `get()` - Mahmuda's version

- `filter()` will always -> give you a `QuerySet`
  - even if only a *single* object matches the query - 
  - in this case, it will be a `QuerySet` containing a single element.

vs.

- or, you can use the `get()` method on a `Manager` which returns the object directly,
  - If you know there is only one object that matches your query.

For example:

```python
>>> one_entry = Entry.objects.get(pk=1)
```

Mine, learning note:
> - Makanya usahain kalo pake `get()`, parameters (fields) -nya yang:
>   - berupa `primary_key`
>   - `unique=True`
>   - `unique_together`-nya (ykiyk)

Them:
> You can use any query expression with `get()`, just like with `filter()` - again, see [Field lookups](#field-lookups--mahmudas-version) below.

Them, important / skip ykiyk:
> - Note that there is a difference between *using `get()`*, and *using `filter()` with a slice of `[0]`*. 
>   - If there are no results that match the query, `get()` -> will *raise a `DoesNotExist` exception*. 
>   - _This exception is an attribute of the model class that the query is *being performed on*_ - 
>   - **so in the code above, if there is no `Entry` object with a primary key of `1`, Django will raise **`Entry.DoesNotExist`**.**
>
> - Similarly, Django will complain *if more than one item* **matches** the `get()` query. 
>   - *In this case, it will raise `MultipleObjectsReturned`*, 
>   - **which again is an attribute of the model class itself.**

### Other `QuerySet` methods — Just a note edition

Them:
> Most of the time you’ll use `all()`, `get()`, `filter()` and `exclude()` when you need to look up objects from the database. However, that’s far from all there is; see the [`QuerySet` API Reference](../2_ref_slash_bookmarks/1_models/10_querysets/2_queryset_api_slash_bookmarks.md) for a complete list of all the various `QuerySet` methods.

### Limiting `QuerySet`s — Mahmuda's version

Mine, important:
> Skip aj gpp, da.

Them:
> - Use a subset of Python’s array-slicing syntax _to limit your `QuerySet` to *a certain number of results*._
>   - > This is the equivalent of SQL’s `LIMIT` and `OFFSET` clauses.

1-5 objects:

```python
>>> Entry.objects.all()[:5]
```

Them, SQLnya cenah:
> `LIMIT 5`

6-10 objects:

```python
>>> Entry.objects.all()[5:10]
```

Them, SQLnya cenah:
> `OFFSET 5 LIMIT 5`

~~-1 object:~~

```
Entry.objects.all()[-1]
# JUST KIDDING
```

Mine:
> bikin error

Them:
> Negative indexing (i.e. `Entry.objects.all()[-1]`) is not supported.

Them:
> - Generally, slicing a `QuerySet` -returns-a-new-> `QuerySet` – *it doesn’t evaluate the query*.
>   - An exception is _if you use the “step” parameter of Python slice syntax_. 

For example, this would actually execute the query in order to return _a list of every (2) *second* object of the first 10_:

```python
>>> Entry.objects.all()[:10:2]
```

Them:
> Further filtering or ordering of a sliced queryset is **prohibited** due to the ambiguous nature of how that might work.

Them:
> To retrieve a *single* object rather than a list (e.g. `SELECT foo FROM bar LIMIT 1`), use an index instead of a slice. For example, this returns the first `Entry` in the database, after ordering entries alphabetically by headline:

```python
>>> Entry.objects.order_by("headline")[0]
```

This is roughly equivalent to:

```python
>>> Entry.objects.order_by("headline")[0:1].get()
```

Them:
> Note, however, that the first of these will raise `IndexError` while the second will raise `DoesNotExist` if no objects match the given criteria. See `get()` for more details.

### Field lookups — Mahmuda's version

Them, skip:
> - Field lookups are how you specify the meat of an SQL `WHERE` clause. 
>   - They’re specified as keyword arguments to the `QuerySet` methods `filter()`, `exclude()` and `get()`.

Basic lookups keyword arguments take the form:

```python
field__lookuptype=value. 
```

(That’s a double-underscore). 

For example:

```python
>>> Entry.objects.filter(pub_date__lte="2006-01-01")
```

translates (roughly) into the following SQL:

```sql
SELECT * FROM blog_entry WHERE pub_date <= '2006-01-01';
```

Them, skip:
> How this is possible
>
> Python has the ability to define functions that accept arbitrary name-value arguments whose names and values are evaluated at runtime. For more information, see [Keyword Arguments](https://docs.python.org/3/tutorial/controlflow.html#tut-keywordargs) in the official Python tutorial.

---

Harus kayak gini:

```python
field-tea__lookuptype=value. 
```

Nah,

```
field-tea = field-specified-in-a-lookup = model-field
```

Kecuali, kalo berupa `ForeignKey`:

```python
ForeignKeyField_id # = contain the raw value of the foreign model’s primary key # ⏎
blog_id # ⏎
>>> Entry.objects.filter(blog_id=4)
```

---

```python
Entry.objects.filter(blog_id="sixty_nine")
# TypeError, 'cause invalid keyword argument
```

---

Them:
> The database API supports about two dozen lookup types; a complete reference can be found in the [field lookup reference](https://docs.djangoproject.com/en/5.0/ref/models/querysets/#field-lookups). To give you a taste of what’s available, here’s some of the more common lookups you’ll probably use:

Maintenance note:
> Jangan lupa rangkum "field lookup reference" (bookmark-kin maksudnya).

- `exact`
  - An “exact” match.
  - Example:

    ```python
    >>> Entry.objects.get(headline__exact="Cat bites dog")
    ```

  - Would generate SQL along these lines:

    ```sql
    SELECT ... WHERE headline = 'Cat bites dog';
    ```
  
  - By the way,
    
    Me:
    > ~~I'm going out tonight.~~ ~~Nice.~~

    Them:
    > If you don’t provide a lookup type – that is, if your keyword argument doesn’t contain a double underscore – the lookup type is assumed to be `exact`.
    >
    > For example, the following two statements are equivalent:

    ```python
    >>> Blog.objects.get(id__exact=14)  # Explicit form
    >>> Blog.objects.get(id=14)  # __exact is implied
    ```

    Them:
    > This is **for convenience**, because **`exact`** lookups are the common case.
- `iexact`
  - A case-insensitive match.
    - > A=a, B=b, ....
  - So, the query:

    ```python
    >>> Blog.objects.get(name__iexact="beatles blog")
    ```

    Them:
    > Would match a `Blog` titled **"Beatles Blog"**, **"beatles blog"**, or even **"BeAtlES blOG"**.
- `contains`
  - Case-sensitive (version of) containment test.
  - For example:

    ```python
    Entry.objects.get(headline__contains="Lennon")
    ```

  - Roughly translates to this SQL:

    ```sql
    SELECT ... WHERE headline LIKE '%Lennon%';
    ```

    Them:
    > Note this will match the `headline` **'Today Lennon honored'** ~~but not *'today lennon honored'*~~.
- `icontains`
  - > versi case-insensitive dari `contains`
- `startswith`, `endswith`
  - Starts-with and ends-with search, respectively.
  - `istartswith` and `iendswith`
    - > the case-insensitive versions.

Them:
> Again, this only scratches the surface. A complete reference can be found in the [field lookup reference](https://docs.djangoproject.com/en/5.0/ref/models/querysets/#field-lookups).

Maintenance note:
> dupe biar inget, rangkum tea.

### Lookups that span relationships — Mahmuda's version

Them:
> Django offers a powerful and intuitive way to “follow” relationships in lookups, taking care of the SQL **`JOIN`**s for you automatically, behind the scenes.

Masih them:
> To span a relationship, use the field name of related fields across models, separated by double underscores, until you get to the field you want.

Learning note:
> Ovt masalah formatting note eta, cuman da saya teh utama prakteknya. Jadi gini udah cukup: ..

`foreignkey_field__foreignkey_field__field` (dst.)

---

- For example:

  ```python
  >>> Entry.objects.filter(blog__name="Beatles Blog")
  ```

- Jangan lupa ada, reverse-nya juga gening:
  - `related_query_name=entry`
  - Misal:

    ```python
    >>> Blog.objects.filter(entry__headline__contains="Lennon")
    ```
    
    - Terus:
      - `Entry` whose `headline` contains `Lennon`, ada 1 objek
        - Returned: that one object

- If:
  
  Them, remove kalo udah:
  > If you are filtering across multiple relationships and one of the intermediate models doesn’t have a value that meets the filter condition, Django will treat it as if there is an empty (all values are `NULL`), but valid, object there. All this means is that no error will be raised. For example, in this filter:

  ```python
  Blog.objects.filter(entry__authors__name="Lennon")
  ```

  Them, remove kalo udah:
  > , if there was no `author` associated with an entry, it would be treated as if there was also no `name` attached, rather than raising an error because of the missing `author`. ..

  - Terus:
    - `authors` ❌ (gak ada sama sekali)
      - returned: empty `QuerySet`, rather an error because of the missing `author`.
    - `authors` ✔️, but `authors` with `Lennon` as `name` ❌
      - returned: empty `QuerySet` juga.

  - masalah `isnull`:

    Them:
    > The only case where it might be confusing is if you are using `isnull`. Thus:
    > 
    > ```python
    > Blog.objects.filter(entry__authors__name__isnull=True)
    > ```
    > 
    > will return `Blog` objects that have an empty `name` on the `author` and also those which have an empty `author` on the `entry`. If you don’t want those latter objects, you could write:
    > 
    > ```python
    > Blog.objects.filter(entry__authors__isnull=False, entry__authors__name__isnull=True)
    > ```

    Mine, my feedback nanti kirim meureun:
    > Gak dikasih tau **"misalnya"** soalnya gak ada attribute `null` di field `name` of `Author`.

#### Spanning multi-valued relationships — Mahmuda's version

From Google Translate:
> _Span_
>
> - as noun:
>   - the full extent of something from end to end; the amount of space that something covers.
> - as verb:
>   - (of a bridge, arch, etc.) extend from side to side of.
> - as adjective:
>   - see spick and span.
> - ~~as abbreviation:~~
>   - ~~Spaniard. (wut)~~

Mine, learning note:
> Mari kita pake approach ~~"langsung praktek" lagi~~ "mari kita bedah".

- Exhibit A:

  ```python
  Blog.objects.filter(entry__headline__contains="Lennon", entry__pub_date__year=2008)
  ```

  - Select all blogs which fulfill these conditions:
    - At least have **one** entry from `2008`,
    - having (and) `Lennon` in its headline.
    - *(the same entry satisfying **both** conditions)*

- Exhibit B:

  ```python
  Blog.objects.filter(entry__headline__contains="Lennon").filter(
      entry__pub_date__year=2008
  )
  ```

  - Select all blogs which fulfill these conditions:
    - ~~At least have **one** entry from `2008`,~~
    - ~~and those blogs that are selected have at least one entry contains `Lennon` in its headline~~
    - > oops.
    - At least have **one** entry which contains `Lennon` in its headline,
    - and those blogs that are selected, have at least one entry from `2008`.

Mine, learning + maintenance note:
> harus bikin rating bangga/enggak bangga euy, buat tiap "Mahmuda's version", ~~tapi yang ini enggak hehe `:(`~~ just kidding, bagus loh ini cara ngerangkumnya, karena intricate jadi dijelasinnya "per line", cuman memang masih bisa di-improved.

Mine:
> Nah sekarang prakteknya.

- > Perkiraan hasil dari queries-nya apabila ada kontennya.
  - Suppose:
    - there is only one blog:
      - that has both entries:
        - entries containing `Lennon`, **and**
        - entries from `2008`.
      - but those entries different to each other:
        - none of the entries:
          - from `2008` contained;
          - `Lennon`.
  - The Exhibit A:
    - would not return any blogs;
  - but the Exhibit B:
    - would return that one blog;
    - > soalnya:
      - `Blog`s dengan `entry__headline__contains="Lennon"` ✔️ (ada)
      - > terus blogs di atas teh, "punya" `entry__pub_date__year=2008` ✔️ (juga)
  - > udahlah ada `Q` juga lagi. pokoknya inget bedanya `and` sama `or`.

Them, skip aja:
> **Note**
>
> As the second (more permissive) query chains multiple filters, it performs multiple joins to the primary model, potentially yielding duplicates.
>
> ```python
> >>> from datetime import date
> >>> beatles = Blog.objects.create(name="Beatles Blog")
> >>> pop = Blog.objects.create(name="Pop Music Blog")
> >>> Entry.objects.create(
> ...     blog=beatles,
> ...     headline="New Lennon Biography",
> ...     pub_date=date(2008, 6, 1),
> ... )
> <Entry: New Lennon Biography>
> >>> Entry.objects.create(
> ...     blog=beatles,
> ...     headline="New Lennon Biography in Paperback",
> ...     pub_date=date(2009, 6, 1),
> ... )
> <Entry: New Lennon Biography in Paperback>
> >>> Entry.objects.create(
> ...     blog=pop,
> ...     headline="Best Albums of 2008",
> ...     pub_date=date(2008, 12, 15),
> ... )
> <Entry: Best Albums of 2008>
> >>> Entry.objects.create(
> ...     blog=pop,
> ...     headline="Lennon Would Have Loved Hip Hop",
> ...     pub_date=date(2020, 4, 1),
> ... )
> <Entry: Lennon Would Have Loved Hip Hop>
> >>> Blog.objects.filter(
> ...     entry__headline__contains="Lennon",
> ...     entry__pub_date__year=2008,
> ... )
> <QuerySet [<Blog: Beatles Blog>]>
> >>> Blog.objects.filter(
> ...     entry__headline__contains="Lennon",
> ... ).filter(
> ...     entry__pub_date__year=2008,
> ... )
> <QuerySet [<Blog: Beatles Blog>, <Blog: Beatles Blog>, <Blog: Pop Music Blog]>
> ```

Them, skip aja:
> The behavior of `filter()` for queries that span multi-value relationships, as described above, is not implemented equivalently for `exclude()`. Instead, the conditions in a single `exclude()` call will not necessarily refer to the same item.
> 
> For example, the following query would exclude blogs that contain _both_ entries with `Lennon` in the headline _and_ entries published in `2008`:
> 
> ```python
> Blog.objects.exclude(
>     entry__headline__contains="Lennon",
>     entry__pub_date__year=2008,
> )
> ```
> 
> However, unlike the behavior when using `filter()`, this will not limit blogs based on entries that satisfy both conditions. In order to do that, i.e. to select all blogs that do not contain entries published with `Lennon` that were published in `2008`, you need to make two queries:
> 
> ```python
> Blog.objects.exclude(
>     entry__in=Entry.objects.filter(
>         headline__contains="Lennon",
>         pub_date__year=2008,
>     ),
> )
> ```

### Reference fields on the model with `F()` expressions — Mahmuda's version

Old title: "Filters can reference fields on the model"

Them:
> In the examples given so far, we have constructed filters that compare the value of a model field with a constant. But what if you want to compare the value of a model field with another field on the same model?

Mine:
> Kalau filters dipakai buat membandingkan konten dari model *field* dengan suatu konstan. Nah, `F()` ini bisa dipakai untuk "compare" field to field.

Them:
> Django provides `F` expressions to allow such comparisons. Instances of `F()` act as a reference to a model field within a query. These references can then be used in query filters to compare the values of two different fields on the same model instance.

Mine:
> `F("the-name-of-the-field")`
>
> terus bisa dipakai sebagai field lookup value tea, kayak gini:
> 
> `field-tea__lookuptype=F("the-name-of-the-field")`

Them:
> For example, to find a list of all blog entries that have had more comments than pingbacks, we construct an `F()` object to reference the pingback count, and use that `F()` object in the query:

```python
>>> from django.db.models import F
>>> Entry.objects.filter(number_of_comments__gt=F("number_of_pingbacks"))
```

Mine:
> Tuh dari sini, `number_of_comments` dan `number_of_pingbacks`-nya:

```python
...
class Entry(models.Model):
    ...
    number_of_comments = models.IntegerField(default=0)
    number_of_pingbacks = models.IntegerField(default=0)
    ...
```

---

**Examples**

Them:
> Django supports the use of addition, subtraction, multiplication, division, modulo, and power arithmetic with `F()` objects, both with constants and with other `F()` objects. To find all the blog entries with more than _twice_ as many comments as pingbacks, we modify the query:

```python
>>> Entry.objects.filter(number_of_comments__gt=F("number_of_pingbacks") * 2)
```

Them:
> To find all the entries where the rating of the entry is less than the sum of the pingback count and comment count, we would issue the query:

```python
>>> Entry.objects.filter(rating__lt=F("number_of_comments") + F("number_of_pingbacks"))
```

Them:
> You can also use the double underscore notation to span relationships in an `F()` object. An `F()` object with a double underscore will introduce any joins needed to access the related object. For example, to retrieve all the entries where the author’s name is the same as the blog name, we could issue the query:

```python
>>> Entry.objects.filter(authors__name=F("blog__name"))
```

Them:
> For date and date/time fields, you can add or subtract a `timedelta` object. The following would return all entries that were modified more than 3 days after they were published:

```python
>>> from datetime import timedelta
>>> Entry.objects.filter(mod_date__gt=F("pub_date") + timedelta(days=3))
```

Them:
> The `F()` objects support bitwise operations by `.bitand()`, `.bitor()`, `.bitxor()`, `.bitrightshift()`, and `.bitleftshift()`. For example:

```python
>>> F("somefield").bitand(16)
```

Them, (but whatever, I won't ever be a corporate slave, amen.):
> Oracle
>
> Oracle doesn’t support bitwise XOR operation.

Read more, tentunya:
> - [`F()` expressions](https://docs.djangoproject.com/en/5.0/ref/models/expressions/#django.db.models.F)
> - [`timedelta`](https://docs.python.org/3/library/datetime.html#datetime.timedelta)
>
> Nanti kalo udah dirangkum, ubah, maintenance note.

### Expressions can reference transforms — Mahmuda's version

Django supports using transforms in expressions.

Mine:
> Cuman sekedar **examples**.

For example, to find all `Entry` objects published in the same year as they were last modified:

```python
>>> from django.db.models import F
>>> Entry.objects.filter(pub_date__year=F("mod_date__year"))
```

To find the earliest year an entry was published, we can issue the query:

```python
>>> from django.db.models import Min
>>> Entry.objects.aggregate(first_published_year=Min("pub_date__year"))
```

This example finds the value of the highest rated entry and the total number of comments on all entries for each year:

```python
>>> from django.db.models import OuterRef, Subquery, Sum
>>> Entry.objects.values("pub_date__year").annotate(
...     top_rating=Subquery(
...         Entry.objects.filter(
...             pub_date__year=OuterRef("pub_date__year"),
...         )
...         .order_by("-rating")
...         .values("rating")[:1]
...     ),
...     total_comments=Sum("number_of_comments"),
... )
```

### The `pk` lookup shortcut — Mahmuda's version

For convenience, Django provides a `pk` lookup shortcut, which stands for “primary key”.

Mine, jadi, literally, with conditions:
> `id`=`pk`.

In the example `Blog` model, the primary key is the `id` field, so these three statements are equivalent:

```python
>>> Blog.objects.get(id__exact=14)  # Explicit form
>>> Blog.objects.get(id=14)  # __exact is implied
>>> Blog.objects.get(pk=14)  # pk implies id__exact
```

bla-bla-bla

```python
# Get blogs entries with id 1, 4 and 7
>>> Blog.objects.filter(pk__in=[1, 4, 7])

# Get all blog entries with id > 14
>>> Blog.objects.filter(pk__gt=14)
```

bla-bla-bla

```python
>>> Entry.objects.filter(blog__id__exact=3)  # Explicit form
>>> Entry.objects.filter(blog__id=3)  # __exact is implied
>>> Entry.objects.filter(blog__pk=3)  # __pk implies __id__exact
```

### Escaping percent signs and underscores in `LIKE` statements — Light read — Unmodded

The field lookups that equate to `LIKE` `SQL` statements (`iexact`, `contains`, `icontains`, `startswith`, `istartswith`, `endswith` and `iendswith`) will automatically escape the two special characters used in `LIKE` statements – the percent sign and the underscore. (In a `LIKE` statement, the percent sign signifies a multiple-character wildcard and the underscore signifies a single-character wildcard.)

This means things should work intuitively, so the abstraction doesn’t leak. For example, to retrieve all the entries that contain a percent sign, use the percent sign as any other character:

```python
>>> Entry.objects.filter(headline__contains="%")
```

Django takes care of the quoting for you; the resulting `SQL` will look something like this:

```sql
SELECT ... WHERE headline LIKE '%\%%';
```

Same goes for underscores. Both percentage signs and underscores are handled for you transparently.

### Caching and `QuerySet`s — Mahmuda's version

Approach-nya:
> Step-by-step + listing method tea.

- Each `QuerySet` contains a cache _to **minimize** *database* *access*_. 
  - Understanding how it works will allow you to write the *most efficient code*.

/

Them:
> Each `QuerySet` contains a cache to minimize database access. Understanding how it works will allow you to write the most efficient code.

Mine, mildning note:
> Which is better? Hm.

---

1. In a newly created `QuerySet`,
   - the cache is **empty**. [ ].
2. The first time a `QuerySet` is 
   1. *evaluated* ✔️ – and, hence, 
   2. a database query *happens* ✔️ – 
   3. Django *saves* the query results in the **`QuerySet`’s cache** ✔️(✔️) and - 
   4. *returns* the results that have been **explicitly requested** ✔️ 
      > (e.g., the next element, if the `QuerySet` is being iterated over). 
   5. *Subsequent evaluations* of the `QuerySet` **reuse** the cached results.

Them:
> Keep this caching behavior in mind, because **it may bite you** if you *don’t* use your `QuerySet`s **correctly**. For example, the following will create two `QuerySet`s, evaluate them, and throw them away:

Lanjut,

```python
>>> print([e.headline for e in Entry.objects.all()]) # the 1st execution, hits the database.
>>> print([e.pub_date for e in Entry.objects.all()]) # the 2nd execution, *also* **hits** the database, therefore **unnecessary** overhead.
```

- That means the same database query will be *executed* **twice**,
  - effectively **doubling** your *database* **load**. 
- Also, there’s a possibility the two lists:
  - the before list,
  - and the after list.
  - may not *include* the **same** database records, 
    - because an `Entry` may have been *added* or *deleted* in the split second **between the two requests**:
      - the before list,
      - the before list + irregulaties (added/deleted entries tea) = the after list.
        - > bisa jadi race condition juga, tapi rada out of topic.

To avoid this problem, **save** the `QuerySet` and reuse it:

```python
>>> queryset = Entry.objects.all()  # This is *saving* the **`QuerySet`**.
>>> print([p.headline for p in queryset])  # Evaluate the query set.
>>> print([p.pub_date for p in queryset])  # Reuse the cache from the evaluation.
```

Read more:
> [`QuerySet`](https://docs.djangoproject.com/en/5.0/ref/models/querysets/#django.db.models.query.QuerySet)

#### When `QuerySet`s are **not cached** — Mahmuda's version

- Querysets *do not always* **cache** *their* **results**.
  1. When **evaluating** only _part_ of the queryset,
  2. the cache is **checked**,
     - but if it is not populated
       - (cache not found ❌)
     - then the items *returned* by the **subsequent** query are not **cached**. 
       - **Specifically**, this means that [limiting the queryset](#limiting-querysets--mahmudas-version) using:
         - an array slice or
           - ex: `Things.object.all()[5:10]`.
         - an index.
           - ex: `Things.object.all()[2]`
           - > read again, [Limiting `QuerySet`s](#limiting-querysets--mahmudas-version)
         - will **not** *populate* the *cache*.

- For example, 
  - _repeatedly_ *getting* a *certain* **index** in a queryset object will **query** the *database* each time:

    ```python
    >>> queryset = Entry.objects.all()
    >>> print(queryset[5])  # Queries the database
    >>> print(queryset[5])  # Queries the database again
    ```

  - However, if the entire queryset *has already* been *evaluated*, the cache will be **checked** instead:

    ```python
    >>> queryset = Entry.objects.all()
    >>> [entry for entry in queryset]  # Queries the database
    >>> print(queryset[5])  # Uses cache
    >>> print(queryset[5])  # Uses cache
    ```

  - Here are some examples of other actions that will *result* in the **entire 'queryset'** being **evaluated** and therefore **populate** the cache:

    ```python
    >>> [entry for entry in queryset]
    >>> bool(queryset)
    >>> entry in queryset
    >>> list(queryset)
    ```

Them:
> - Simply **printing** the 'queryset':
>   - will not **populate** the cache ❌ 
>     - > therefore kosong, [ ].
> - This is because *the call* to `__repr__()` 
>   - only **returns** a slice of the entire queryset.

Mine, a question, learning note:
> Tapi bukannya print sama cuman call di shell itu beda? Nanti kita cek aja

## Asynchronous queries — Mahmuda's version

- If you are writing asynchronous views or code, 
  - you **cannot** use the ORM for *queries* ❌
    - _(in quite the way we have described above)_, 
  - as you **cannot** **call** **blocking** synchronous code from asynchronous code ❌:
    1. it will block up the event loop 
    2. (or, more likely, Django will notice and raise a `SynchronousOnlyOperation` to *stop* *that* from **happening**).

- Fortunately, you *can* *do* *many* *queries* using Django’s **asynchronous** *query* *APIs*. 
  - Every method that might block - such as:
    - `get()` or `delete()` 
    - has an asynchronous variant (`aget()` or `adelete()`), 
    - and when you **iterate** over *results*, you can use asynchronous iteration (`async for`) instead.

### Query iteration — Mahmuda's version

- The default way of iterating over a query - with `for` -:
  - will result in a **blocking** database query _behind the scenes_ 
    - as Django *loads* the *results* at *iteration* *time*. 
  - To fix this, you can swap to `async for`:

```python
async for entry in Authors.objects.filter(name__startswith="A"):
    ...
```

---

Them, skip:
> Be aware that you also can’t do other things that might iterate over the queryset, such as wrapping `list()` around it to force its evaluation (you can use `async for` in a comprehension, if you want it).

~~`list(queryset.objects.all())`~~ ❌

`[async for item in queryset.objects.all()]` ✔️

---

Them:
> Because `QuerySet` methods like `filter()` and `exclude()` do not actually run the query - they set up the queryset to run when it’s iterated over - you can use those freely in asynchronous code.

`queryset.objects.filter(field=value, ...)` ✔️

`queryset.objects.exclude(field=value, ...)` ✔️

etc.

Them:
> For a guide to which methods can keep being used like this, and which have asynchronous versions, read the next section.

### `QuerySet` and manager methods — Mahmuda's version

Them:
> Some methods on managers and querysets - like `get()` and `first()` - force execution of the queryset and are blocking. Some, like `filter()` and `exclude()`, don’t force execution and so are safe to run from asynchronous code. But how are you supposed to tell the difference?

Mine, ~~TL;DR~~, bahasa Indonesia:
> - Kan gini:
>   - `get()` dan `first()` memaksa untuk dilakukan eksekusi pada 'queryset' dan mengakibatkan terjadinya *blocking*.
>   - Cuman `filter()` dan `exclude()` sebaliknya, sehingga bisa dijalankan dalam asynchronous code.
>   - Sehingga gimana sih cara membedakannya?

Them, skip:
> While you could poke around and see if there is an a-prefixed version of the method (for example, we have `aget()` but not `afilter()`), there is a more logical way - look up what kind of method it is in the [`QuerySet` reference](../2_ref_slash_bookmarks/1_models/10_querysets/README.md).

- In there, you’ll find the methods on `QuerySet`s grouped into two sections:
  - _Methods that return new 'queryset's_: 
    - These are the **non-blocking** *ones*, and
    - **don’t have asynchronous** versions.
    - > You’re free to use these in any situation, though read the notes on `defer()` and `only()` before you use them.
  - _Methods that do not return 'queryset's_: 
    - These are the **blocking** *ones*, and 
    - **have asynchronous** versions -:
      - the asynchronous name for each 
        - is noted in its documentation, 
        - though our standard pattern is to add an `a-` prefix.
        - example(s):
          - `get()` vs. `aget()`

---

Them:
> Using this distinction, you can work out when you **need to use asynchronous versions**, and when **you don’t**. For example, here’s a valid asynchronous query:

```python
user = await User.objects.filter(username=my_input).afirst()
```

- The explanations:
  - `filter()` returns a queryset, and 
    - so it’s fine to keep chaining it inside an asynchronous environment, 
  - whereas `first()` *evaluates* and *returns* a model instance -:
    - thus, we **change** to **`afirst()`**, and 
    - **use** `await` _at the front of the whole expression_ 
    - in order to call it in an asynchronous-friendly way.

Them, as a note:
> If you forget to put the `await` part in, you may see errors like “`coroutine object has no attribute x`” or “`<coroutine …>`” strings in place of your model instances. If you ever see these, you are missing an `await` somewhere to turn that coroutine into a real value.

### "Async" Transactions — as a note

Them:
> Transactions are **not currently supported** with asynchronous queries and updates. You will find that trying to use one raises `SynchronousOnlyOperation`.
>
> If you wish to use a transaction, we suggest you write your ORM code inside a separate, synchronous function and then call that using `sync_to_async` - see [Asynchronous support](https://docs.djangoproject.com/en/5.0/topics/async/) for more.

Mine, a learning and maintenance note:
> Kalau [Asynchronous support](https://docs.djangoproject.com/en/5.0/topics/async/) udah dirangkum, ubah linknya ke yang di `rfl` ini dongggg.

## Querying `JSONField` — Mahmuda's version

- Lookups implementation is **different** in **`JSONField`**, 
  - mainly *due* to **the existence of key transformations**.

To demonstrate, we will use the following example model:

```python
from django.db import models


class Dog(models.Model):
    name = models.CharField(max_length=200)
    data = models.JSONField(null=True)

    def __str__(self):
        return self.name
```

### Storing and querying for `None` — Light read — Unmodded

As with other fields, storing `None` as the field’s value will store it as `SQL` `NULL`. While not recommended, it is possible to store `JSON` scalar `null` instead of `SQL` `NULL` by using `Value(None, JSONField())`.

Whichever of the values is stored, when retrieved from the database, the `Python` representation of the `JSON` scalar `null` is the same as `SQL` `NULL`, i.e. `None`. Therefore, it can be hard to distinguish between them.

This only applies to `None` as the top-level value of the field. If `None` is inside a `list` or `dict`, it will always be interpreted as `JSON` `null`.

When querying, `None` value will always be interpreted as `JSON` `null`. To query for `SQL` `NULL`, use `isnull`:

```python
>>> Dog.objects.create(name="Max", data=None)  # SQL NULL.
<Dog: Max>
>>> Dog.objects.create(name="Archie", data=Value(None, JSONField()))  # JSON null.
<Dog: Archie>
>>> Dog.objects.filter(data=None)
<QuerySet [<Dog: Archie>]>
>>> Dog.objects.filter(data=Value(None, JSONField()))
<QuerySet [<Dog: Archie>]>
>>> Dog.objects.filter(data__isnull=True)
<QuerySet [<Dog: Max>]>
>>> Dog.objects.filter(data__isnull=False)
<QuerySet [<Dog: Archie>]>
```

Unless you are sure you wish to work with `SQL` `NULL` values, consider setting `null=False` and providing a suitable default for empty values, such as `default=dict`.

Mine:
> Let's do it. My own personal project have this very thing `JSONField`. Meureun mau aku jadiin abstract model juga kayaknya.

### Key, index, and path transforms — Mahmuda's version

- To query based on **a given dictionary key**,
  - use *that key* as **the lookup name**:

```python
>>> Dog.objects.create(
...     name="Rufus",
...     data={
...         "breed": "labrador",
...         "owner": {
...             "name": "Bob",
...             "other_pets": [
...                 {
...                     "name": "Fishy",
...                 }
...             ],
...         },
...     },
... )
# <Dog: Rufus>
>>> Dog.objects.create(name="Meg", data={"breed": "collie", "owner": None})
# <Dog: Meg>
>>> Dog.objects.filter(data__breed="collie")
# <QuerySet [<Dog: Meg>]>
```

---

- If *the key* is **an integer**,
  - it will be interpreted as *an index* **transform** in *an array*:

```python
>>> Dog.objects.filter(data__owner__other_pets__0__name="Fishy")
# <QuerySet [<Dog: Rufus>]>
```

Note from them:
> If the key you wish to query by clashes with the name of another lookup, use the `contains` lookup instead.

---

To query for *missing keys*, use the **`isnull` lookup**:

```python
>>> Dog.objects.create(name="Shep", data={"breed": "collie"})
# <Dog: Shep>
>>> Dog.objects.filter(data__owner__isnull=True)
# <QuerySet [<Dog: Shep>]>
```

Them, tuh bisa:
> The lookup examples given above implicitly use the `exact` lookup. Key, index, and path transforms can also be chained with: `icontains`, `endswith`, `iendswith`, `iexact`, `regex`, `iregex`, `startswith`, `istartswith`, `lt`, `lte`, `gt`, and `gte`, as well as with [Containment and key lookups](#containment-and-key-lookups--mahmudas-version).

#### `KT()` expressions — Light read — Light modded

Them:
> New in Django 4.2.

`django.db.models.fields.json.KT` / `class KT(lookup)`

- Represents the text value of:
  - a key, 
  - index, or 
  - path transform -
  - of `JSONField`. 
  - You can use the __double underscore notation__ in `lookup` to **chain** _dictionary key_ and _index transforms_.

For example:

```python
>>> from django.db.models.fields.json import KT
>>> Dog.objects.create(
...     name="Shep",
...     data={
...         "owner": {"name": "Bob"},
...         "breed": ["collie", "lhasa apso"],
...     },
... )
<Dog: Shep>
>>> Dogs.objects.annotate(
...     first_breed=KT("data__breed__1"), owner_name=KT("data__owner__name")
... ).filter(first_breed__startswith="lhasa", owner_name="Bob")
<QuerySet [<Dog: Shep>]>
```

Note from them:
> Due to the way in which key-path queries work, `exclude()` and `filter()` are not guaranteed to produce exhaustive sets. If you want to include objects that do not have the path, add the `isnull` lookup.

Warning from them:
> Since any string could be a key in a JSON object, any lookup other than those listed below will be interpreted as a key lookup. No errors are raised. Be extra careful for typing mistakes, and always check your queries work as you intend.

MariaDB and Oracle users:
> Using `order_by()` on key, index, or path transforms will sort the objects using the string representation of the values. This is because MariaDB and Oracle Database do not provide a function that converts JSON values into their equivalent SQL values.

Oracle users
> On Oracle Database, using `None` as the lookup value in an `exclude()` query will return objects that do not have `null` as the value at the given path, including objects that do not have the path. On other database backends, the query will return objects that have the path and the value is not `null`.

PostgreSQL users
> On PostgreSQL, if only one key or index is used, the SQL operator `->` is used. If multiple operators are used then the `#>` operator is used.

SQLite users
> On SQLite, "`true`", "`false`", and "`null`" string values will always be interpreted as `True`, `False`, and JSON `null` respectively.

### Containment and key lookups — Mahmuda's version

#### `contains`

- The `contains` lookup is *overridden* on `JSONField`:
  - The returned objects are those where the given `dict` of key-value pairs are all contained in _the top-level of the field_.
  - For example: ->

->:

```python
>>> Dog.objects.create(name="Rufus", data={"breed": "labrador", "owner": "Bob"})
<Dog: Rufus>
>>> Dog.objects.create(name="Meg", data={"breed": "collie", "owner": "Bob"})
<Dog: Meg>
>>> Dog.objects.create(name="Fred", data={})
<Dog: Fred>
>>> Dog.objects.filter(data__contains={"owner": "Bob"})
<QuerySet [<Dog: Rufus>, <Dog: Meg>]>
>>> Dog.objects.filter(data__contains={"breed": "collie"})
<QuerySet [<Dog: Meg>]>
```

Oracle and SQLite:
> `contains` is not supported on Oracle and SQLite.

Mine:
> who the fuck, cuman kalo development pake SQLite, bingung sih.

#### `contained_by`

- _This is the inverse of the contains lookup_ -:
  - the objects returned will be those where the key-value pairs on the object are *a subset* of those in the value passed. 
  - For example: ->

->:

```python
>>> Dog.objects.create(name="Rufus", data={"breed": "labrador", "owner": "Bob"})
# <Dog: Rufus>
>>> Dog.objects.create(name="Meg", data={"breed": "collie", "owner": "Bob"})
# <Dog: Meg>
>>> Dog.objects.create(name="Fred", data={})
# <Dog: Fred>
>>> Dog.objects.filter(data__contained_by={"breed": "collie", "owner": "Bob"})
# <QuerySet [<Dog: Meg>, <Dog: Fred>]>
>>> Dog.objects.filter(data__contained_by={"breed": "collie"})
# <QuerySet [<Dog: Fred>]>
```

Mine, learning note:
> Langsung aja liat contohnya, tuh, (tuing-tuing), jadinya bandingin `data__contained_by` sama `data` objectnya. Ngerti kan? :( I'll do something lagi siah ih.

Them, a note:
> Oracle and SQLite
> 
> `contained_by` is not supported on Oracle and SQLite.

#### `has_key`

Returns objects where the given key is in the top-level of the data. For example:

```python
>>> Dog.objects.create(name="Rufus", data={"breed": "labrador"})
# <Dog: Rufus>
>>> Dog.objects.create(name="Meg", data={"breed": "collie", "owner": "Bob"})
# <Dog: Meg>
>>> Dog.objects.filter(data__has_key="owner")
# <QuerySet [<Dog: Meg>]>
```

#### `has_keys`

Returns objects where all of the given keys are in the top-level of the data. For example:

```python
>>> Dog.objects.create(name="Rufus", data={"breed": "labrador"})
<Dog: Rufus>
>>> Dog.objects.create(name="Meg", data={"breed": "collie", "owner": "Bob"})
<Dog: Meg>
>>> Dog.objects.filter(data__has_keys=["breed", "owner"])
<QuerySet [<Dog: Meg>]>
```

#### `has_any_keys`

Returns objects where any of the given keys are in the top-level of the data. For example:

```python
>>> Dog.objects.create(name="Rufus", data={"breed": "labrador"})
<Dog: Rufus>
>>> Dog.objects.create(name="Meg", data={"owner": "Bob"})
<Dog: Meg>
>>> Dog.objects.filter(data__has_any_keys=["owner", "breed"])
<QuerySet [<Dog: Rufus>, <Dog: Meg>]>
```

## Complex lookups with `Q` objects — Mahmuda's version

- Keyword argument queries – in `filter()`, etc. – are “`AND`”ed together. 
  - `filter(field=value, field=value)` -> 'filter(field=value & field=value)' -ish
  - If you need to **execute** *more* **complex queries** 
    - _(for example, queries with `OR` statements)_,
    - you *can* *use* **`Q` objects**.

Read more:
> about [`Q` objects, `django.db.models.Q`, here](../2_ref_slash_bookmarks/1_models/10_querysets/3_query-related_tools/1_django.db.models.Q.md).

A `Q` object (`django.db.models.Q`) is an object *used* *to* **encapsulate** ***a collection of keyword arguments***. 

Them, skip:
> These keyword arguments are specified as in “Field lookups” above.

For example, this `Q` object **encapsulates** ***a single `LIKE` query***:

```python
from django.db.models import Q

Q(question__startswith="What")
```

- `Q` objects can be combined using:
  - the `&`, 
  - `|`, and 
  - `^` operators. 
  - When an operator is used on two `Q` objects, it yields a new `Q` object.
    - > `Q` + operator + `Q` => new `Q`, mine.

---

For example, this statement yields a single `Q` object that **represents** ***the “`OR`” of two "question__startswith" queries***:

```python
Q(question__startswith="Who") | Q(question__startswith="What")
```

This is equivalent to the following SQL `WHERE` clause:

```sql
WHERE question LIKE 'Who%' OR question LIKE 'What%'
```

---

- You can **compose** ***statements of arbitrary complexity*** by:
  - > pengulangan paragraf di atas ini teh, maintenance note, is it a good thing?, learning note.
  - combining Q objects with the: 
    - &, 
    - |, and 
    - ^ operators. 
  - and use parenthetical grouping:
    - `(`,
    - `)`. 
  - Also, `Q` objects can be negated: 
    - using the ~ operator, 
      - **allowing** ***for combined lookups*** that combine both:
        - a normal query and
        - a negated (`NOT`) query
        - ->

->:

```python
Q(question__startswith="Who") | ~Q(pub_date__year=2005)
```

---

Them, skip:
> - Each lookup function that takes keyword-arguments (e.g. `filter()`, `exclude()`, `get()`) 
>   - can also be passed one or more `Q` objects as positional (not-named) arguments. 
>   - If you provide multiple `Q` object arguments to a lookup function, the arguments will be “`AND`”ed together. For example: ->

->:

```python
Poll.objects.get(
    Q(question__startswith="Who"),
    Q(pub_date=date(2005, 5, 2)) | Q(pub_date=date(2005, 5, 6)),
)
```

… roughly translates into the `SQL`:

```sql
SELECT * from polls WHERE question LIKE 'Who%'
    AND (pub_date = '2005-05-02' OR pub_date = '2005-05-06')
```

Mine:
> kalo mau pake `&` beneran jadi gini
> ```python
> Poll.objects.get(
>     Q(question__startswith="Who") &
>     (Q(pub_date=date(2005, 5, 2)) | Q(pub_date=date(2005, 5, 6)))
> )
> ```

---

bla-bla-bla

Mine, penjelasan bla-bla-bla:
> With respect to Django devs, da ini tulisan buat saya doang da, hehe.

Mine:
> Kalo mau di mix `Q` objects dan keyword arguments. Keyword arguments nya harus didepan.

```python
Poll.objects.get(
    Q(pub_date=date(2005, 5, 2)) | Q(pub_date=date(2005, 5, 6)),
    question__startswith="Who",
)
# ✔️✔️✔️
```

```python
# INVALID QUERY
Poll.objects.get(
    question__startswith="Who",
    Q(pub_date=date(2005, 5, 2)) | Q(pub_date=date(2005, 5, 6)),
)
# ❌❌❌
```

---

Them, interesting:
> See also
> 
> The [`OR` lookups examples](https://github.com/django/django/blob/main/tests/or_lookups/tests.py) in Django’s unit tests show some possible uses of `Q`.

Mine, learning and maintenance note, for consideration:
> Kalau misalnya menarik untuk dirangkum, terus udah, maka link lah `rfl` nya, hapus yang ini.

---

## Comparing objects — Mahmuda's version

- To **compare** ***two model instances***, 
  - use the standard Python comparison operator, 
    - the double equals sign: `==`.
  - Behind the scenes, that *compares* **the primary key values** _of two models_.

bla-bla-bla

```python
>>> some_entry == other_entry  # equivalent to
>>> some_entry.id == other_entry.id
```

bla-bla-bla

Mine:
> kalo `pk`-nya bukan `id` tapi `name`

```python
>>> some_obj == other_obj
>>> some_obj.name == other_obj.name
```

---

## Deleting objects — Mahmuda's version

- The delete method, 
  - conveniently, is named `delete()`. 
  - This method immediately:
    - *deletes* **the object** and 
    - *returns* *the number of objects deleted* and 
    - (*returns*) *a dictionary* *with the number of deletions* *per object type*. 
    - Example: ->

->:

```python
>>> e.delete()
# (1, {'blog.Entry': 1})
```

You can also *delete objects* **in bulk**. Every `QuerySet` has *a `delete()` method*, which **deletes all members** *of that `QuerySet`*.

bla-bla-bla

```python
>>> Entry.objects.filter(pub_date__year=2005).delete()
# (5, {'webapp.Entry': 5})
```

---

Them, cautionary tale:
> Keep in mind that this will, whenever possible, be executed purely in `SQL`, and so the `delete()` methods of individual object instances will not necessarily be called during the process. If you’ve provided a custom `delete()` method on a model class and want to ensure that it is called, you will need to “manually” delete instances of that model (e.g., by iterating over a `QuerySet` and calling `delete()` on each object individually) rather than using the bulk `delete()` method of a QuerySet.

~~`Modol.objects.filter(...).delete()`~~ ❌

```python
the_modol = Modol.objects.filter(...)

for item in the_modol:
    item.delete() ✔️

# Jadinya:

class Modol(models.Model):
    ...

    def delete(...):
        # akan terjalankan. ✔️✔️✔️
```

---

- When Django *deletes* **an object**, 
  - by default it **emulates** **the behavior of the SQL constraint** ***`ON DELETE CASCADE`***
    - _(in other words, any objects which had foreign keys pointing at the object to be deleted will be deleted along with it.)_
      - For example: ->

```python
b = Blog.objects.get(pk=1)
# This will delete the `Blog` and all of its `Entry` objects.
b.delete()
```

This cascade behavior is **customizable** via the `on_delete` argument to the `ForeignKey`.

---

Them, cautionary tale:
> Note that `delete()` is the only `QuerySet` method that is not exposed on a `Manager` itself. This is a safety mechanism to prevent you from accidentally requesting `Entry.objects.delete()`, and **deleting** **all** the entries. If you do want to delete all the objects, then you have to explicitly request a complete query set:
>
> `Entry.objects.all().delete()`

Learning note:
> Nah itu teh gimana cara disable delete completely nya, soalnya on my own personal project, aku mau ada things yang terukir di database itu, **uneditable**, ya maksudnya jadi **read-only**.

---

## Copying model instances — Mahmuda's version

- Although there is **no built-in method** for copying model instances, 
  - it is possible to easily *create* *new* *instance* *with all fields’ values* **copied**. 
  - In the simplest case, you can set `pk` to `None` and `_state.adding` to `True`. Using our blog example: ->

->:

```python
blog = Blog(name="My blog", tagline="Blogging is easy")
blog.save()  # blog.pk == 1

blog.pk = None
blog._state.adding = True
blog.save()  # blog.pk == 2
```

---

Them, usage in inheritance, skip aja.
> Due to how inheritance works, you have to set both `pk` and `id` to `None`, and `_state.adding` to True:
>
> ```python
> django_blog.pk = None
> django_blog.id = None
> django_blog._state.adding = True
> django_blog.save()  # django_blog.pk == 4
> ```

Mine, CAUTIONARY TALE:
> DON'T EVER USE INHERITANCE, SOALNYA BIKIN GOBLOK, UDAH PAKE FOREIGNKEY, ONETOONEFIELD, MANYTOMANYFIELD AJA.

---

_Copy relations of `ManyToManyField`_

Them:
> This process doesn’t copy relations that aren’t part of the model’s database table. For example, `Entry` has a `ManyToManyField` to `Author`. After duplicating an entry, you **must** set the many-to-many relations for the new entry:
> 
> ```python
> entry = Entry.objects.all()[0]  # some previous entry
> old_authors = entry.authors.all()
> entry.pk = None
> entry._state.adding = True
> entry.save()
> entry.authors.set(old_authors)
> ```

---

_Copy the relation of `OneToOneField`_

Them:
> For a `OneToOneField`, you must duplicate the related object and assign it to the new object’s field to **avoid violating** _the one-to-one *unique constraint*_. For example, assuming `entry` is already duplicated as above:
> 
> ```python
> detail = EntryDetail.objects.all()[0]
> detail.pk = None
> detail._state.adding = True
> detail.entry = entry
> detail.save()
> ```

---

Read more about:
> [`._state` here](../2_ref_slash_bookmarks/1_models/9_instances/9_other_attributes__._state.md).

## Updating multiple objects at once — Light modded

Sometimes you want to set a field to *a particular value* for *all the objects* in **a `QuerySet`**. You can do this with the `update()` method. For example:

```python
# Update all the headlines with pub_date in 2007.
Entry.objects.filter(pub_date__year=2007).update(headline="Everything is the same")
```

---

- You can only set non-relation fields and `ForeignKey` fields using this method. 
  - To update *a non-relation field*, *provide* **the new value as a constant**. 
  - To update *`ForeignKey` fields*, *set* *the new value* to be **the new model instance** _you want to point to_. For example:

```python
>>> b = Blog.objects.get(pk=1)

# Change every Entry so that it belongs to this Blog.
>>> Entry.objects.update(blog=b)
```

---

Them:
> The `update()` method is applied instantly and returns the number of rows matched by the query (which may not be equal to the number of rows updated if some rows already have the new value). The only restriction on the `QuerySet` being updated is that it can only access one database table: the model’s main table. You can filter based on related fields, but you can only update columns in the model’s main table. Example:

```python
>>> b = Blog.objects.get(pk=1)

# Update all the headlines belonging to this Blog.
>>> Entry.objects.filter(blog=b).update(headline="Everything is the same")
```

---

Them:
> Be aware that the `update()` method is converted directly to an SQL statement. It is a bulk operation for direct updates. It doesn’t run any `save()` methods on your models, or emit the `pre_save` or `post_save` signals (which are a consequence of calling `save()`), or honor the `auto_now` field option. If you want to save every item in a `QuerySet` and make sure that the `save()` method is called on each instance, you don’t need any special function to handle that. Loop over them and call `save()`:

```python
for item in my_queryset:
    item.save()
```

---

Them, modded:
> Calls to update can also use (`F` expressions) to update one field based on the value of another field in the model. This is especially useful for incrementing counters based upon their current value. 
> 
> For example, to increment the pingback count for every entry in the blog:

```python
>>> Entry.objects.update(number_of_pingbacks=F("number_of_pingbacks") + 1)
```

---

Them, gak bisa gini cenah:
> However, unlike `F()` objects in filter and exclude clauses, you can’t introduce joins when you use `F()` objects in an update – you can only reference fields local to the model being updated. If you attempt to introduce a join with an F`()` object, a `FieldError` will be raised:

```python
# This will raise a FieldError
>>> Entry.objects.update(headline=F("blog__name"))
```

---

## Related objects — Mahmuda's version

- When you define a relationship in a model 
  - _(i.e., a `ForeignKey`, `OneToOneField`, or `ManyToManyField`)_, 
  - _instances of that model_ *will* *have* **a convenient API** to **access** the *related object(s)*.

---

_For example_

- Using the models at the top of this page, for example: 
  - an `Entry` object `e`
    - can get its associated `Blog` object
      - by accessing the `blog` attribute: 
        - `e.blog`.

Them:
> (Behind the scenes, this functionality is implemented by Python [descriptors](https://docs.python.org/3/howto/descriptor.html). This shouldn’t really matter to you, but we point it out here for the curious.)

---

- Django also *creates* **API accessors** for **the “other” side** _of the relationship_ –:
  - *the link* _from the related model_ *to* _the model that defines the relationship_. 
    - > bagus gak sih ngerangkum kayak gini teh, learning + maintenance note.
  - For example, 
    - a `Blog` object -> `b` has access to -> a list of all related `Entry` objects via -> the `entry_set` attribute: 
      - `b.entry_set.all()`.

Them, skip:
> All examples in this section use the sample `Blog`, `Author` and `Entry` models defined at the top of this page.

---

### One-to-many relationships — Mahmuda's version

#### Forward — Mahmuda's version

Them, bla-bla-bla:
> If a model has a `ForeignKey`, instances of that model will have access -> to the related (foreign) object via -> an attribute of the model.

Example:

```python
>>> e = Entry.objects.get(id=2)
>>> e.blog  # Returns the related Blog object.
```

---

_Get and set is available_

bla-bla-bla

```python
>>> e = Entry.objects.get(id=2)
>>> e.blog = some_blog
>>> e.save()
```

Mine, learning note, terus buat kalyan:
> ih bla-bla-bla bikin set-sat-set gening, CUMAN PASTINYA BISA JADI KONOTASI NEGATIF, ini teh for my own learning experience aja ya gys.

---

Remove relation if `null=True`

bla-bla-bla

```python
>>> e = Entry.objects.get(id=2)
>>> e.blog = None
>>> e.save()  # "UPDATE blog_entry SET blog_id = NULL ...;"
```

---

_Caching_

bla-bla-bla

```python
>>> e = Entry.objects.get(id=2)
>>> print(e.blog)  # Hits the database to retrieve the associated Blog.
>>> print(e.blog)  # Doesn't hit the database; uses cached version.
```

---

#### Following relationships “backward” — Mahmuda's version

bla-bla-bla aja deh

```python
>>> b = Blog.objects.get(id=1)
>>> b.entry_set.all()  # Returns all Entry objects related to Blog.

# b.entry_set is a Manager that returns QuerySets.
>>> b.entry_set.filter(headline__contains="Lennon")
>>> b.entry_set.count()
```

---

bla-bla-bla

Mine, TL;DR:
> If `blog = ForeignKey(Blog, on_delete=models.CASCADE, `**`related_name='entries'`**`)`:

```python
>>> b = Blog.objects.get(id=1)
>>> b.entries.all()  # Returns all Entry objects related to Blog.

# b.entries is a Manager that returns QuerySets.
>>> b.entries.filter(headline__contains="Lennon")
>>> b.entries.count()
```

---

#### Using a custom reverse manager — Light read — Unmodded

By default the `RelatedManager` used for reverse relations is a subclass of the [default manager](https://docs.djangoproject.com/en/5.0/topics/db/managers/#manager-names) for that model. If you would like to specify a different manager for a given query you can use the following syntax:

Maintenance note:
> Kalau `managers` udah dirangkum, ganti linknya yang `rfl` dong.

```python
from django.db import models


class Entry(models.Model):
    # ...
    objects = models.Manager()  # Default Manager
    entries = EntryManager()  # Custom Manager


b = Blog.objects.get(id=1)
b.entry_set(manager="entries").all()
```

If `EntryManager` performed default filtering in its `get_queryset()` method, that filtering would apply to the `all()` call.

Specifying a custom reverse manager also enables you to call its custom methods:

```python
b.entry_set(manager="entries").is_published()
```

Them, a note:
> _Interaction with prefetching_
> 
> When calling `prefetch_related()` with a reverse relation, the default manager will be used. If you want to prefetch related objects using a custom reverse manager, use `Prefetch()`. For example:
>
> ```python
> from django.db.models import Prefetch
> 
> prefetch_manager = Prefetch("entry_set", queryset=Entry.entries.all())
> Blog.objects.prefetch_related(prefetch_manager)
> ```

#### Additional methods to handle related objects — Mahmuda's version

In addition to the `QuerySet` methods defined in “Retrieving objects” above, the `ForeignKey` `Manager` has additional methods used to handle the set of related objects. A synopsis of each is below, 

Them:
> and complete details can be found in the [related objects reference / `relations` ref](../2_ref_slash_bookmarks/1_models/6_relations.md).

Read more about:
> - [`django.db.models.query.QuerySet` dalem `QuerySet` API, here](../2_ref_slash_bookmarks/1_models/10_querysets/2_queryset_api_slash_bookmarks.md)
> - [`ForeignKey` / `django.db.models.ForeignKey`, here](../2_ref_slash_bookmarks/1_models/1_fields/3_relationship_fields/1_ForeignKey.md)
> - [`django.db.models.Manager` dalem `managers` folder](./5_managers.md)

- `add(obj1, obj2, ...)`
  - **Adds** *the specified model objects* to the related object set.
- `create(**kwargs)`
  - *Creates* a new object,
  - *saves* it and
  - **puts** it in *the related object set*.
  - **Returns** _the newly created object_.
- `remove(obj1, obj2, ...)`
  - **Removes** the specified model objects from _the related object set_.
- `clear()`
  - **Removes** **all** *objects* from _the related object set_.
- `set(objs)`
  - **Replace** _the set of related objects_.

---

- To **assign** *the members of a related set*, 
  - ***use the `set()` method*** _with an iterable of object instances_. For example, if `e1` and `e2` are `Entry` instances: ->

->:

```python
b = Blog.objects.get(id=1)
b.entry_set.set([e1, e2])
```

- If the `clear()` method is *available*, 
  - **any** preexisting objects will be **removed** from the `entry_set` 
    - *before* all objects in the iterable (in this case, a list) are *added* to the set. 
- If the `clear()` method is *not available*, 
  - **all** objects in the iterable will be **added**
    - *without* *removing* any existing elements.

Mine, learning note:
> Maksud *not available* teh kalau memang udah gak ada `object` apapun dalam `b.entry_set`

---

Them, rada cautionary tale:
> - *Each* *“reverse”* *operation* _described in this section_ **has** **an immediate effect** **on the database**. 
>   - Every addition, creation and deletion is *immediately and automatically* **saved** ***to the database***.

---

### Many-to-many relationships — Mahmuda's version

bla-bla-bla

```python
e = Entry.objects.get(id=3)
e.authors.all()  # Returns all Author objects for this Entry.
e.authors.count()
e.authors.filter(name__contains="John")

a = Author.objects.get(id=5)
a.entry_set.all()  # Returns all Entry objects for this Author.
```

Mine:
> Tuh mirip sama one-to-many relationship reverse-nya.

---

`authors = models.ManyToManyField(Author, related_name='entries')`

```
a = Author.objects.get(id=6)
a.entries.all()  # Returns all Entry objects for this Author.
```

mine.

---

`add(), set(), and remove()` are available:

```python
a = Author.objects.get(id=7)
a.entry_set.set([e1, e2])
```

mine.

---

the methods also accept primary key values:

```python
a.entry_set.set([e1.pk, e2.pk])
```

mine.

---

### One-to-one relationships — Mahmuda's version

- One-to-one relationships are **very similar** to many-to-one relationships. 
  - If you define a `OneToOneField` on your model,
    - _instances of that model_ *will* *have* *access* _**to the related object**_ 
      - *via* ***an attribute of the model***.

---

For example:

```python
class EntryDetail(models.Model):
    entry = models.OneToOneField(Entry, on_delete=models.CASCADE)
    details = models.TextField()


ed = EntryDetail.objects.get(id=2)
ed.entry  # Returns the related Entry object.
```

---

- _The difference_ *comes* in **“reverse” queries**:
  - The related model in a one-to-one relationship *also* has access |=> to a `Manager` object, 
    - but that `Manager` represents a single object, **rather than** _a collection of objects_: ->

->:

```python
e = Entry.objects.get(id=2)
e.entrydetail  # returns the related EntryDetail object
```

---

- If **no object** _has been assigned to this relationship_,
  - Django will raise a `DoesNotExist` **exception**.

_Instances can be assigned to the *reverse relationship* in **the same way** as you would assign the *forward relationship*:_

```python
e.entrydetail = ed
```

---

### How are the backward relationships possible? — Light read — Unmodded

Other object-relational mappers require you to define relationships on both sides. The Django developers believe this is a violation of the DRY (Don’t Repeat Yourself) principle, so Django only requires you to define the relationship on one end.

But how is this possible, given that a model class doesn’t know which other model classes are related to it until those other model classes are loaded?

The answer lies in the [app registry / `django.apps.apps`](https://docs.djangoproject.com/en/5.0/ref/applications/#django.apps.apps). When Django starts, it imports each application listed in [`INSTALLED_APPS`](https://docs.djangoproject.com/en/5.0/ref/settings/#std-setting-INSTALLED_APPS), and then the `models` module inside each application. Whenever a new model class is created, Django adds backward-relationships to any related models. If the related models haven’t been imported yet, Django keeps tracks of the relationships and adds them when the related models eventually are imported.

Them, important, and cautionary tale:
> For this reason, it’s particularly important that all the models you’re using be defined in applications listed in [`INSTALLED_APPS`](https://docs.djangoproject.com/en/5.0/ref/settings/#std-setting-INSTALLED_APPS). Otherwise, backwards relations may not work properly.

Mine, learning and maintenance note:
> ih itu belum dirangkum 2 link itu. apalagi masalah `settings` kan lagian.

### Queries over related objects — Mahmuda's version

- _Queries involving *related objects*_ **follow the same rules** as _queries involving *normal value fields*_.
  - When *specifying* **the value** for *a query* to match:
    - you may use either an object instance itself, or
      - ex: `b`, `Blog` object with `id=5`
    - the primary key value for the object.
      - ex: `5`, `id` (field, tea gening)

For example, if you have a `Blog` object `b` with `id=5` (tea gening), the *following three queries* would be **identical**:

```python
Entry.objects.filter(blog=b)  # Query using object instance
Entry.objects.filter(blog=b.id)  # Query using `id` from instance
Entry.objects.filter(blog=5)  # Query using `id` directly
```

## Falling back to raw SQL — Light read — Unmodded

Them, "tuh bisa" aja:
> If you find yourself needing to write an SQL query that is too complex for Django’s database-mapper to handle, you can fall back on writing SQL by hand. Django has a couple of options for writing raw SQL queries; see [Performing raw SQL queries](./6_sql.md).

Them, penting:
> Finally, it’s important to note that the Django database layer is merely an interface to your database. You can access your database via other tools, programming languages or database frameworks; there’s nothing Django-specific about your database.

## Bal notes

Overall experience:
> Rame banget ngerangkum ini. Perjalanannya sangat puanjang, cuman memuaskan. Aku banyak belajar banyak hal. Cuman kalo dipikir-pikir, apa harus semua `topics` dirangkum gitu ya? Kayaknya mah kalo rangkuman ini, harus banget, soalnya LITERALLY the core of aliran data dari database ke view-nya. Nah kalo custom `managers` (a topic deui), itu mah kapan-kapan aja nulisnya, bisa di look through aja, kalo sebenernya udah dibaca semua.
