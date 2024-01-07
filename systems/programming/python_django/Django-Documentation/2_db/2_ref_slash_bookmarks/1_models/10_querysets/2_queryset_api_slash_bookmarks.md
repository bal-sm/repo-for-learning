# `QuerySet` API / Bookmarks

Mine:
> Taken from, [official docs](https://docs.djangoproject.com/en/5.0/ref/models/querysets/#queryset-api).

Here’s the formal declaration of a `QuerySet`:

```python
class QuerySet(model=None, query=None, using=None, hints=None)
```

...

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
