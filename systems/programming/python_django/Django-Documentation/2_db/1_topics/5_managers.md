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

### Adding extra manager methods - Mahmuda's version

- Adding extra `Manager` methods is the preferred way to add **“table-level”** *functionality* to your models. 
  - Illustration:
    | ✔️ | ✔️ |
    | ---- | ---- |
    | ✔️ | ✔️ |
  - _(For “row-level” functionality – i.e., functions that act on a single instance of a model object – use Model methods, not custom Manager methods.)_
    - Illustration:
      | ✔️ | ✔️ | ✔️ |
      | ---- | ---- | ---- |

For example, this custom `Manager` adds a method `with_counts()`:

```python
from django.db import models
from django.db.models.functions import Coalesce


class PollManager(models.Manager):
    def with_counts(self):
        return self.annotate(num_responses=Coalesce(models.Count("response"), 0))


class OpinionPoll(models.Model):
    question = models.CharField(max_length=200)
    objects = PollManager()


class Response(models.Model):
    poll = models.ForeignKey(OpinionPoll, on_delete=models.CASCADE)
    # ...
```

Them, skip:
> With this example, you’d use `OpinionPoll.objects.with_counts()` to get a `QuerySet` of `OpinionPoll` objects with the extra `num_responses` attribute attached.

Mine:
>
>```python
>>>> op = OpinionPoll.objects.with_counts()
>>>> op[0].num_responses
>```
>

Them, 2 important things:
> - A custom `Manager` method can return anything you want. 
>   - It doesn’t have to return a `QuerySet`.
> - Another thing to note is that `Manager` methods can access `self.model`:
>   - to get the model class to which they’re attached.

### Modifying a manager’s initial `QuerySet` - WIP

A `Manager`’s base `QuerySet` *returns* *all* **objects** in the system.

---

For example, using this model:

```python
from django.db import models


class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=50)
```

…the statement `Book.objects.all()` will *return* **all** *books* in the database.

```python
>>> Book.objects.all()
```

...

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
