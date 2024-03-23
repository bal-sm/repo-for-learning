# How `CASCADE` works

[The code](https://github.com/django/django/blob/761946f8e1b6d725f83fa4f3b04ca9750f486009/django/db/models/deletion.py#L22):

```python
def CASCADE(collector, field, sub_objs, using):
    collector.collect(
        sub_objs,
        source=field.remote_field.model,
        source_attr=field.name,
        nullable=field.null,
        fail_on_restricted=False,
    )
    if field.null and not connections[using].features.can_defer_constraint_checks:
        collector.add_field_update(field, None, sub_objs)
```

## Question 1

> @workspace /explain Write an explanation for the active selection as paragraphs of text.

## Answer 1

The [`CASCADE`](command:_github.copilot.openSymbolInFile?%5B%22django%2Fdb%2Fmodels%2Fdeletion.py%22%2C%22CASCADE%22%5D "django/db/models/deletion.py") function is a method used in Django's ORM for handling deletions of objects that are related through a foreign key with a [`CASCADE`](command:_github.copilot.openSymbolInFile?%5B%22django%2Fdb%2Fmodels%2Fdeletion.py%22%2C%22CASCADE%22%5D "django/db/models/deletion.py") deletion rule. This function is typically called when an object is deleted, and it needs to delete other objects that are related to it through a [`CASCADE`](command:_github.copilot.openSymbolInFile?%5B%22django%2Fdb%2Fmodels%2Fdeletion.py%22%2C%22CASCADE%22%5D "django/db/models/deletion.py") relationship.

The function takes four parameters: [`collector`](command:_github.copilot.openSymbolInFile?%5B%22django%2Fdb%2Fmodels%2Fdeletion.py%22%2C%22collector%22%5D "django/db/models/deletion.py"), [`field`](command:_github.copilot.openSymbolInFile?%5B%22django%2Fdb%2Fmodels%2Fdeletion.py%22%2C%22field%22%5D "django/db/models/deletion.py"), [`sub_objs`](command:_github.copilot.openSymbolInFile?%5B%22django%2Fdb%2Fmodels%2Fdeletion.py%22%2C%22sub_objs%22%5D "django/db/models/deletion.py"), and [`using`](command:_github.copilot.openSymbolInFile?%5B%22django%2Fdb%2Fmodels%2Fdeletion.py%22%2C%22using%22%5D "django/db/models/deletion.py").

- [`collector`](command:_github.copilot.openSymbolInFile?%5B%22django%2Fdb%2Fmodels%2Fdeletion.py%22%2C%22collector%22%5D "django/db/models/deletion.py") is an instance of the [`Collector`](command:_github.copilot.openSymbolInFile?%5B%22django%2Fdb%2Fmodels%2Fdeletion.py%22%2C%22Collector%22%5D "django/db/models/deletion.py") class, which is used to collect and delete objects related to the main object being deleted.
- [`field`](command:_github.copilot.openSymbolInFile?%5B%22django%2Fdb%2Fmodels%2Fdeletion.py%22%2C%22field%22%5D "django/db/models/deletion.py") is the field on the related object that holds the foreign key.
- [`sub_objs`](command:_github.copilot.openSymbolInFile?%5B%22django%2Fdb%2Fmodels%2Fdeletion.py%22%2C%22sub_objs%22%5D "django/db/models/deletion.py") are the related objects that need to be deleted.
- [`using`](command:_github.copilot.openSymbolInFile?%5B%22django%2Fdb%2Fmodels%2Fdeletion.py%22%2C%22using%22%5D "django/db/models/deletion.py") is the alias of the database on which the deletion operation is to be performed.

The function first calls the [`collect`](command:_github.copilot.openSymbolInFile?%5B%22django%2Fdb%2Fmodels%2Fdeletion.py%22%2C%22collect%22%5D "django/db/models/deletion.py") method on the [`collector`](command:_github.copilot.openSymbolInFile?%5B%22django%2Fdb%2Fmodels%2Fdeletion.py%22%2C%22collector%22%5D "django/db/models/deletion.py") object. This method is used to add the [`sub_objs`](command:_github.copilot.openSymbolInFile?%5B%22django%2Fdb%2Fmodels%2Fdeletion.py%22%2C%22sub_objs%22%5D "django/db/models/deletion.py") to the collection of objects to be deleted. The [`source`](command:_github.copilot.openSymbolInFile?%5B%22django%2Fdb%2Fmodels%2Fdeletion.py%22%2C%22source%22%5D "django/db/models/deletion.py") parameter is the model that the [`field`](command:_github.copilot.openSymbolInFile?%5B%22django%2Fdb%2Fmodels%2Fdeletion.py%22%2C%22field%22%5D "django/db/models/deletion.py") belongs to. The [`source_attr`](command:_github.copilot.openSymbolInFile?%5B%22django%2Fdb%2Fmodels%2Fdeletion.py%22%2C%22source_attr%22%5D "django/db/models/deletion.py") parameter is the name of the [`field`](command:_github.copilot.openSymbolInFile?%5B%22django%2Fdb%2Fmodels%2Fdeletion.py%22%2C%22field%22%5D "django/db/models/deletion.py"). The [`nullable`](command:_github.copilot.openSymbolInFile?%5B%22django%2Fdb%2Fmodels%2Fdeletion.py%22%2C%22nullable%22%5D "django/db/models/deletion.py") parameter indicates whether the [`field`](command:_github.copilot.openSymbolInFile?%5B%22django%2Fdb%2Fmodels%2Fdeletion.py%22%2C%22field%22%5D "django/db/models/deletion.py") can be null. The [`fail_on_restricted`](command:_github.copilot.openSymbolInFile?%5B%22django%2Fdb%2Fmodels%2Fdeletion.py%22%2C%22fail_on_restricted%22%5D "django/db/models/deletion.py") parameter is set to `False`, which means that an error won't be raised even if it's prohibited to delete such objects due to [`RESTRICT`](command:_github.copilot.openSymbolInFile?%5B%22django%2Fdb%2Fmodels%2Fdeletion.py%22%2C%22RESTRICT%22%5D "django/db/models/deletion.py").

Then, if the [`field`](command:_github.copilot.openSymbolInFile?%5B%22django%2Fdb%2Fmodels%2Fdeletion.py%22%2C%22field%22%5D "django/db/models/deletion.py") can be null and the database does not support deferred constraint checks, the function calls the [`add_field_update`](command:_github.copilot.openSymbolInFile?%5B%22django%2Fdb%2Fmodels%2Fdeletion.py%22%2C%22add_field_update%22%5D "django/db/models/deletion.py") method on the [`collector`](command:_github.copilot.openSymbolInFile?%5B%22django%2Fdb%2Fmodels%2Fdeletion.py%22%2C%22collector%22%5D "django/db/models/deletion.py") object. This method schedules an update for the [`field`](command:_github.copilot.openSymbolInFile?%5B%22django%2Fdb%2Fmodels%2Fdeletion.py%22%2C%22field%22%5D "django/db/models/deletion.py") on the [`sub_objs`](command:_github.copilot.openSymbolInFile?%5B%22django%2Fdb%2Fmodels%2Fdeletion.py%22%2C%22sub_objs%22%5D "django/db/models/deletion.py") to set it to `None`. This is done to avoid database integrity errors when the main object is deleted before the related objects.

Mine, maintenance note:
> Jangan lupa ih rapihin itu linknya bikin govlog.

## Question 2 - Follow-up

> how the `collector` gets passed as `CASCADE` argument?

## Answer 2

The `collector` object is typically created and passed to the `CASCADE` function by Django's deletion process. When you call the `delete` method on a Django model instance, Django creates a `Collector` object and uses it to collect all related objects that need to be deleted due to `CASCADE` relationships.

Here's a simplified example of how this might look:

```python
from django.db import router
from django.db.models.deletion import Collector, CASCADE

def delete_obj(obj):
    using = router.db_for_write(obj.__class__, instance=obj)
    collector = Collector(using=using)
    collector.collect([obj])
    for model, instances in collector.data.items():
        for obj in instances:
            for field in model._meta.get_fields(include_hidden=True):
                if field.remote_field and field.remote_field.on_delete == CASCADE:
                    CASCADE(collector, field, [obj], using)
    collector.delete()
```

In this example, `delete_obj` is a function that deletes a Django model instance and all related objects that have a `CASCADE` relationship. It first determines the database alias to use for the deletion (`using`). Then it creates a `Collector` object and uses it to collect the objects to be deleted. It then iterates over all fields of the model, and if the field is a foreign key with a `CASCADE` deletion rule, it calls the `CASCADE` function, passing the `collector`, the field, a list containing the object, and the database alias. Finally, it calls the `delete` method on the `collector` to perform the deletion.

Please note that this is a simplified example and the actual Django deletion process is more complex and handles many more cases.

## Question 3

> how `CASCADE` can be passed into `on_delete` as keyword argument, which django's code that does the implementation

Mine:
> really sic, i know

## Answer 3

### Skip

In Django, `on_delete` is a required argument for `ForeignKey` and `OneToOneField` relationships. It's used to specify what should happen when the referenced object is deleted. `CASCADE` is one of the options that can be passed to `on_delete`.

Here's an example of how it's used:

```python
from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=100)

class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
```

In this example, `models.CASCADE` is passed to `on_delete` for the `author` field in the `Book` model. This means that when an `Author` object is deleted, all `Book` objects associated with it will also be deleted.

### Baca

The implementation of this behavior is spread across several parts of Django's codebase. The `on_delete` argument is processed when the `ForeignKey` field is initialized, which happens in the `__init__` method of the `ForeignKey` class in `django/db/models/fields/related.py`.

The actual deletion behavior is implemented in the `delete` method of the `Collector` class in `django/db/models/deletion.py`. This method iterates over all objects to be deleted, and for each object, it checks the `on_delete` behavior of each related field and calls the appropriate function (`CASCADE`, `PROTECT`, etc.).

The `CASCADE` function itself is defined in `django/db/models/deletion.py`. It collects related objects that need to be deleted and adds them to the `Collector`.

## Setelah baca sana kemari source code

[`Collector`](https://github.com/django/django/blob/761946f8e1b6d725f83fa4f3b04ca9750f486009/django/db/models/deletion.py#L96) -> [`NestedObjects`](https://github.com/django/django/blob/761946f8e1b6d725f83fa4f3b04ca9750f486009/django/contrib/admin/utils.py#L182) -> `get_deleted_objects` -> [`collector = NestedObjects(using=using, origin=objs)`](https://github.com/django/django/blob/761946f8e1b6d725f83fa4f3b04ca9750f486009/django/contrib/admin/utils.py#L137)

> kayak gitu alurnya.

> pokoknya gini, (karena bingung), kalo jul-jal-jol `def CASCADE(collector, field, sub_objs, using)` (arguments-nya), berarti itu teh inherit/untuk dipanggil di function lainnya (bisa disebut parent function gening). Gampang kan?

> oiya terus teh gimana sih mereka mengolah `on_delete`? bentar geura, masih belum ketemu, (tapi poko'e pasti kayak gitu juga, ada "parent" function yang mengolah `on_delete` tersebut).

..., TBA.
