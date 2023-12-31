# Models

Mine:
> Taken from, [Models, from official docs](https://docs.djangoproject.com/en/5.0/topics/db/models/).

## ...

...

## Model methods

...

### Overriding predefined model methods

Maintenance note -> Important note "nih gini caranya" -> Prerequisition note:
> Baca dulu ini, dari file [`2_Making-queries.md`](2_Making-queries.md) -> [Other model instance methods](2_Making-queries.md#other-model-instance-methods), and [Specifying which fields to save](2_Making-queries.md#specifying-which-fields-to-save).

...

Them:
> If you wish to update a field value in the `save()` method, you may also want to have this field added to the `update_fields` keyword argument. This will ensure the field is saved when `update_fields` is specified. For example:

```python
from django.db import models
from django.utils.text import slugify


class Blog(models.Model):
    name = models.CharField(max_length=100)
    slug = models.TextField()

    def save(
        self, force_insert=False, force_update=False, using=None, update_fields=None
    ):
        self.slug = slugify(self.name)
        if update_fields is not None and "name" in update_fields:
            update_fields = {"slug"}.union(update_fields)
        super().save(
            force_insert=force_insert,
            force_update=force_update,
            using=using,
            update_fields=update_fields,
        )
```

My own:
> Jadi gimana sih `update_fields` dan mekanisme update a record?
> 
> Tuh jadi kalo ada suatu object yang udah tertulis, terus diubah / **di-update** dengan value baru pada `field` tertentu -maka-> `field` yang terupdate dengan value baru tersebut -akan-tertulis-pada-> `update_fields` (dengan type: `set`) -yang-akan-dikelola-oleh-Django-sehingga-> new and updated model / object / record instance.

Mine:
> Dipindahin lebih dulu soalnya penting.

Maintenance note buat 2 note di atas:
> Pindahin / Dupe ke [`2_Making-queries.md`](2_Making-queries.md) -> [section Specifying which fields to save](https://docs.djangoproject.com/en/5.0/ref/models/instances/#specifying-which-fields-to-save).

...

## ...

...

## API-API things bookmarks

- [Model instance reference](https://docs.djangoproject.com/en/5.0/ref/models/instances/)
- [Model field reference](https://docs.djangoproject.com/en/5.0/ref/models/fields/)
- [Model `Meta` options](https://docs.djangoproject.com/en/5.0/ref/models/options/)

... (> add more, kalau ada)

## Notes

Mine lagi:
> I really remember this section ih, di Pangandaran lagi. One of good and calm memories.

Mine atas note atas:
> Makanya rangkum kapan-kapan aja, sekarang (30 December 2023) lagi di look through nih.

VERY IMPORTANT NOTE, personal experience note, FOR UPCOMING "Multi-table inheritance" section:
> DON'T EVER USE THIS, REALLY NOT WORTH IT, BETTER OFF USE REGULAR `OneToOneField`!!! WHY TF THESE STILL NOT DEPRECATED IN THE LATEST VERSION???

Mine, learning note:
> - Taken from [Retrieving objects](https://docs.djangoproject.com/en/5.0/topics/db/queries/#retrieving-objects):
>   - `Managers` -> `objects` -are-accessible-only-via-> _model classes_
>     - _(rather than from model instances)_, 
>     - to enforce a separation between:
>       - **“table-level” operations** _-> `objects` things_ and
>       - **“record-level” operations** _-> object / model instance / model methods things_.
> - Taken from [Model methods](https://docs.djangoproject.com/en/5.0/topics/db/models/#model-methods).
>   - Define custom methods on a model _to add custom **“row-level”** functionality_ to your objects. 
>     - Whereas:
>       - **`Manager` methods** are intended _to do **“table-wide”** things_, 
>       - **`django.models.Model`, model, methods** should _act on **a particular model** **("record-wide")** instance_.
> ---
> Maintenance note -> pindahin ke sini dan [`2_Making-queries.md`](2_Making-queries.md)

Mine, learning note 2, for upcoming "Model methods":
> The most important part of this section:
>
> The [model instance reference](https://docs.djangoproject.com/en/5.0/ref/models/instances/) has a complete list of [**methods automatically given to each model**](https://docs.djangoproject.com/en/5.0/ref/models/instances/#model-instance-methods). You can override most of these – see [**overriding predefined model methods**](https://docs.djangoproject.com/en/5.0/topics/db/models/#overriding-predefined-model-methods), below – but there are a couple that you’ll almost always want to define: ....

Last learning position:
> Masih di [Model methods](https://docs.djangoproject.com/en/5.0/topics/db/models/#model-methods)
