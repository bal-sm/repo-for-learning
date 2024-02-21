# Managers - WIP

Mine:
> Taken from -> <https://docs.djangoproject.com/en/5.0/topics/db/managers/>

`class Manager` / `django.db.models.Manager`

- A `Manager` is the *interface* through which database query operations are provided to Django *models*. 
  - At least one `Manager` exists for every model in a Django application.

The way `Manager` classes work is documented in [Making queries](./2_queries.md); this document specifically touches on model options that customize `Manager` behavior.

## Manager names - Mahmuda's version - Lite

Them, modded:
> - By default, Django adds a `Manager` with the name `objects` to every Django model class. 
>   - However, 
>     - if you want to use `objects` _as a field name_, or 
>     - if you want to use _a name other than `objects`_ for the `Manager`, 
>     - you *can* *rename* *it* _on a per-model basis_. 
>   - To rename the `Manager` for a given class, define a class attribute of type `models.Manager()` on that model.

For example:

```python
from django.db import models


class Person(models.Model):
    # ...
    people = models.Manager()
```

Them, light modded:
> - Using this example model, 
>   - `Person.objects` will generate an `AttributeError` exception, 
>   - but `Person.people.all()` will provide a list of all `Person` objects.

## Custom managers - WIP

- You can use a custom `Manager` _(in a particular model)_ by: 
  - extending the base `Manager` class and 
  - instantiating your custom `Manager` in your model.

- There are *two* **reasons** _you might want to customize a `Manager`_: 
  - to add *extra* **`Manager`** methods, and/or 
  - to modify the *initial* **`QuerySet`** the `Manager` returns.

### Adding extra manager methods

..., WIP.

### Modifying a manager’s initial `QuerySet`

..., WIP.

### Default managers

..., WIP.

### Base managers

..., WIP.

#### Using managers for related object access

..., WIP.

#### Don’t filter away any results in this type of manager subclass

..., WIP.

### Calling custom `QuerySet` methods from the manager

..., WIP.

### Creating a manager with `QuerySet` methods

..., WIP.

#### `from_queryset()`

..., WIP.

### Custom managers and model inheritance

..., WIP.

### Implementation concerns

..., WIP.

## Notes

Learning + maintenance note:
> Naha `managers` ada `topics` nya tapi gak ada `ref` nya ya?
