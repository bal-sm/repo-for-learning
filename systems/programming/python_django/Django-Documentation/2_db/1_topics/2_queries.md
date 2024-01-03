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

### Philosophy/How-Django-utilizes-Python-objects-convention.

- To represent **`database`-`table data`** <-> **Python objects**, Django uses an intuitive system:
  - A model **class** <-represents--> a database **table**, and
  - An **instance** of that _(model)_ _**class**_ <-"--> **A particular record** in the database table.

### Code

To create an object -> instantiate _these_-> model class + keyword arguments (fields as parameters) -then-> call `save()` -to-save-it-to-the-> database.

Assuming `Model`s -live-in-> a file => `mysite/blog/models.py`, here's an example:

```python
>>> from blog.models import Blog
>>> b = Blog(name="Beatles Blog", tagline="All the latest Beatles news.")
>>> b.save()
```

#### Behind the SQL

Little note:
> Let's make this a thing, throughout this topic and document.

**This** (call **`save()`**) -performs-> an `INSERT` SQL statement (BTS) -> ...

Mine lagi:
> Tapi saya pun belum mengerti gimana isi SQL nya, sebenernya.

#### Notes

- `save()` -/-> return value (maksudnya moal mere value nanaon deui)
- `save()` <-takes- a number of advanced options not described here, but [here](https://docs.djangoproject.com/en/5.0/ref/models/instances/#django.db.models.Model.save)
  - > nanti ubah ke link di repo ieu, maintenance note.
- `create()` -> create an object and `save()` it in a single step.
  - Read more about [`create()`](https://docs.djangoproject.com/en/5.0/ref/models/querysets/#django.db.models.query.QuerySet.create).

...
