# Making queries

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

## Limiting `QuerySet`s — Mahmuda's version

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

...
