# `update_fields` of `save()` method

Maintenance noteL
> Pembelajaran saya, this should have its own section kan ya? (sic)

- Read more
  - <https://docs.djangoproject.com/en/5.0/topics/db/models/>
  - <https://docs.djangoproject.com/en/5.0/ref/models/instances/#specifying-which-fields-to-save>

```python
product.name = "Name changed again"
product.save(update_fields=["name"])
```

The `update_fields` argument can be any iterable containing strings. An empty `update_fields` iterable will skip the save. A value of None will perform an update on all fields.

Tuh kalo `None` isi dari `update_fields`, berarti semua `field` di update, kalau ada value-nya, berarti field itu aja yang di update.

Di contoh di atas, `name` field doang yang di update.
