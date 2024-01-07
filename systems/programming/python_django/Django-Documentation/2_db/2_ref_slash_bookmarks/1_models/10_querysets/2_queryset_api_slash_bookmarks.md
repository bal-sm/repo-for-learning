# `QuerySet` API / Bookmarks

Mine:
> Taken from, [official docs](https://docs.djangoproject.com/en/5.0/ref/models/querysets/#queryset-api).

Here’s the formal declaration of a `QuerySet`:

```python
class QuerySet(model=None, query=None, using=None, hints=None)
```

- Usually when you’ll interact with a `QuerySet` you’ll use it by *chaining filters*.
  
  ```python
  >>> Entry.objects.filter(headline__startswith="What").exclude(
  ...     pub_date__gte=datetime.date.today()
  ... ).filter(pub_date__gte=datetime.date(2005, 1, 30))
  ```

  Maintenance note, kapan-kapan aja:
  > Dupe ini teh, terus belum di link the real "chaining filter" dari repo ini. Bingung. Bantuin sayang.

  - To make this work, most `QuerySet` methods return new querysets. 
    
    Them:
    > These methods are covered in detail later in this section.

## `QuerySet`s public attributes

The `QuerySet` class has the following public attributes you can use for *introspection*:

- `ordered`
  - `True` _if the `QuerySet` is **ordered**_
    - — i.e. has an `order_by()` clause or a default ordering on the model. 
  - `False` otherwise.
- `db`
  - _The database that *will be used*_ if _this query is *executed now*_.

Mine, learning note:
> Maksudnya meureun *public attributes* teh `QuerySet.ordered`, meureun ya.

## Methods that return new `QuerySet`s

Mine (temporary note):
> Ambil dua aja dulu, sebagai contoh.

- [`filter()`](https://docs.djangoproject.com/en/5.0/ref/models/querysets/#filter)
  - Returns a new `QuerySet` containing objects that **match** the given lookup parameters.
- [`exclude()`](https://docs.djangoproject.com/en/5.0/ref/models/querysets/#exclude)
  - Returns a new `QuerySet` containing objects that **do not match** the given lookup parameters.

...

Mine (temporary note 2):
> Lanjutin kalo sering ditulis API-nya.
