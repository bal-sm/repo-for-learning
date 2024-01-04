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

### Behind the SQL

Little note:
> Let's make this a thing, throughout this topic and document.

**This** (call **`save()`**) -performs-> an `INSERT` SQL statement (BTS) -> ...

Mine lagi:
> Tapi saya pun belum mengerti gimana isi SQL nya, sebenernya.

### Notes

- Django **does not** hit the database until you explicitly call `save()`.
- `save()` -/-> return value (maksudnya moal mere value nanaon deui)
- `save()` <-takes- a number of advanced options not described here, but [here](https://docs.djangoproject.com/en/5.0/ref/models/instances/#django.db.models.Model.save)
  - > nanti ubah ke link di repo ieu, maintenance note.
- `create()` -> create an object and `save()` it in a single step.
  - Read more about [`create()`](https://docs.djangoproject.com/en/5.0/ref/models/querysets/#django.db.models.query.QuerySet.create).

## Saving changes to objects — Mahmuda's version

To _save **changes**_ to an object that's already in the database, use `save()`, again, yes.

### Code

```python
>>> from blog.models import Blog
>>> b_2 = Blog(name="Yoko Ono's Blog", tagline="All the latest Yoko Ono's news.") # ngikutin aja, I love the Beatles.
>>> b_2.save()
>>> b_2.name = "Yoko Ono and Sean's Blog"
>>> b_2.save()
```

### Behind the SQL

**This** -performs-> an `UPDATE` SQL statement (BTS) -> ...

Again, them:
> Django **does not** hit the database until you explicitly call `save()`.

Maintenance note:
> Add the SQL statement here, please.

### Saving `ForeignKey` and `ManyToManyField` fields

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

### Retrieving all objects

- The simplest way to retrieve objects from a table is to **get all of them**. 
  - To do this, use `all()` method on a `Manager`.

    ```python
    >>> all_entries = Entry.objects.all()
    ```

    Mine, again:
    > Refer to [this `models.py`](#models-used-as-reference) for this `Entry` model.

  - > The `all()` method returns a `QuerySet` of all _thoose_ `objects`-objects in the database, me.

---

### Retrieving specific objects with filters

- `QuerySet` <-returned-by- `all()`
  - -describes-> all objects -in-the-> database table
  - Usually though, you'll need to select only a subset of the complete set of objects.

- To create such a subset, 
  - -> you refine the initial `QuerySet`, 
  - -> adding filter conditions.
  - The two most common ways to refine a `QuerySet` are:
    - `filter(**kwargs)`
      - _**Returns** a new `QuerySet`_ containing objects that **match** _the given **lookup parameters**_.
    - `exclude(**kwargs)`
      - **Returns a new `QuerySet`** containing objects that **do not match** the given **lookup parameters**.

Them:
> The lookup parameters (`**kwargs` in the above function definitions) should be in the format described in [Field lookups](#field-lookups--mahmudas-version) below.

...

### Field lookups — Mahmuda's version

...

...
