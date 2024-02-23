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

### Modifying a manager’s initial `QuerySet` - Mahmuda's version

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

---

- You can override a `Manager`’s base `QuerySet` by **overriding** the **`Manager.get_queryset()`** method. 
  - `get_queryset()` should return a `QuerySet` with the properties you require.

For example, bla-bla-bla:

```python
# First, define the Manager subclass.
class DahlBookManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(author="Roald Dahl")


# Then hook it into the Book model explicitly.
class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=50)

    objects = models.Manager()  # The default manager.
    dahl_objects = DahlBookManager()  # The Dahl-specific manager.
```

bla-bla-bla

```python
Book.objects.all() # ✔️, Returns all books.
Book.dahl_objects.all() # ✔️, Returns all books by Roald Dahl.
Book.dahl_objects.filter(title="Matilda") # ✔️, Returns all books by Roald Dahl with the title "Matilda".
Book.dahl_objects.count() # ✔️, Returns the amount of books by Roald Dahl.
```

---

- This example also pointed out another _interesting_ technique:
  - using **multiple managers** on the same model. 
    - You can attach as *many* *`Manager()`* instances to a model as you’d like. 
      - This is a **non-repetitive way** to define common “filters” for your models.

For example:

```python
class AuthorManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(role="A")


class EditorManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(role="E")


class Person(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    role = models.CharField(max_length=1, choices={"A": _("Author"), "E": _("Editor")})
    people = models.Manager()
    authors = AuthorManager()
    editors = EditorManager()
```

```python
>>> Person.authors.all() # ✔️, Returns all authors.
>>> Person.editors.all() # ✔️, Returns all editors.
>>> Person.people.all() # ✔️, Returns all people.
```

### Default managers - Light modded

`Model._default_manager`

Them, baca aja:
> If you use custom `Manager` objects, take note that the first `Manager` Django encounters (in the order in which they’re defined in the model) has a special status. Django interprets the first `Manager` defined in a class as the “default” `Manager`, and several parts of Django (including [`dumpdata`](https://docs.djangoproject.com/en/5.0/ref/django-admin/#django-admin-dumpdata)) will use that `Manager` exclusively for that model. As a result, it’s a good idea to be careful in your choice of default manager in order to avoid a situation where overriding `get_queryset()` results in an inability to retrieve objects you’d like to work with.
>
> You can specify a custom default manager using [`Meta.default_manager_name`](https://docs.djangoproject.com/en/5.0/ref/models/options/#django.db.models.Options.default_manager_name).
>
> If you’re writing some code that must handle an unknown model, for example, in a third-party app that implements a generic view, use this manager (or [`_base_manager`](https://docs.djangoproject.com/en/5.0/topics/db/managers/#django.db.models.Model._base_manager)) rather than assuming the model has an `objects` manager.

### Base managers - Light modded

`Model._base_manager`

#### Using managers for related object access - Light modded

Them, baca aja:
> By default, Django uses an instance of the `Model._base_manager` manager class when accessing related objects (i.e. `choice.question`), not the `_default_manager` on the related object. This is because Django needs to be able to retrieve the related object, even if it would otherwise be filtered out (and hence be inaccessible) by the default manager.
>
> If the normal base manager class ([`django.db.models.Manager`](https://docs.djangoproject.com/en/5.0/topics/db/managers/#django.db.models.Manager)) isn’t appropriate for your circumstances, you can tell Django which class to use by setting [`Meta.base_manager_name`](https://docs.djangoproject.com/en/5.0/ref/models/options/#django.db.models.Options.base_manager_name).
>
> Base managers aren’t used when querying on related models, or when [accessing a one-to-many or many-to-many relationship](https://docs.djangoproject.com/en/5.0/topics/db/queries/#backwards-related-objects). For example, if the `Question` model [from the tutorial](https://docs.djangoproject.com/en/5.0/intro/tutorial02/#creating-models) had a `deleted` field and a base manager that filters out instances with `deleted=True`, a queryset like `Choice.objects.filter(question__name__startswith='What')` would include choices related to deleted questions.

#### Don’t filter away any results in this type of manager subclass - Light modded

Them, unmodded:
> This manager is used to access objects that are related to from some other model. In those situations, Django has to be able to see all the objects for the model it is fetching, so that *anything* which is referred to can be retrieved.
>
> Therefore, you should not override `get_queryset()` to filter out any rows. If you do so, Django will return incomplete results.

### Calling custom `QuerySet` methods from the manager - Light modded

Them:
> While most methods from the standard `QuerySet` are accessible directly from the `Manager`, this is only the case for the extra methods defined on a custom `QuerySet` if you also implement them on the `Manager`:

```python
class PersonQuerySet(models.QuerySet):
    def authors(self):
        return self.filter(role="A")

    def editors(self):
        return self.filter(role="E")


class PersonManager(models.Manager):
    def get_queryset(self):
        return PersonQuerySet(self.model, using=self._db)

    def authors(self):
        return self.get_queryset().authors()

    def editors(self):
        return self.get_queryset().editors()


class Person(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    role = models.CharField(max_length=1, choices={"A": _("Author"), "E": _("Editor")})
    people = PersonManager()
```

Them:
> This example allows you to call both `authors()` and `editors()` directly from the manager `Person.people`.

### Creating a manager with `QuerySet` methods - Mahmuda's version

_Them, skip_

Bisa gini:

```python
class Person(models.Model):
    ...
    people = PersonQuerySet.as_manager()
    # jadi sama kayak
    #people = PersonManager() # tapi langsung ke PersonQuerySet
```

_Them, skip_

Me:
> Ovt, sumpahh itu yang bla-bla-bla, I don't mean to offend, heueuh, jadi gitu aja.

Methods that are copied by `as_manager()`:

```python
class CustomQuerySet(models.QuerySet):
    # Available on both Manager and QuerySet.
    def public_method(self):
        return

    # Available only on QuerySet.
    def _private_method(self):
        return

    # Available only on QuerySet.
    def opted_out_public_method(self):
        return

    opted_out_public_method.queryset_only = True

    # Available on both Manager and QuerySet.
    def _opted_in_private_method(self):
        return

    _opted_in_private_method.queryset_only = False
```

#### `from_queryset()` - Mahmuda's version

`classmethod from_queryset(queryset_class)`

_Them, skip_

Bisa gini:

```python
class CustomManager(models.Manager):
    def manager_only_method(self):
        return


class CustomQuerySet(models.QuerySet):
    def manager_and_queryset_method(self):
        return


class MyModel(models.Model):
    objects = CustomManager.from_queryset(CustomQuerySet)()
```

```python
>>> MyModel.objects.manager_only_method() # ✔️
>>> MyModel.objects.manager_and_queryset_method() # ✔️, meureun
```

Bisa disimpen kayak gini:

```python
MyManager = CustomManager.from_queryset(CustomQuerySet)


class MyModel(models.Model):
    objects = MyManager()
```

### Custom managers and model inheritance - TL;DR

Mine, TL;DR:
> Jadi ada beberapa cara Django mengendalikan banyak _custom managers_ dalam _[model inheritance](https://docs.djangoproject.com/en/5.0/topics/db/models/#model-inheritance)_.

Them:
> 1. Managers from base classes are always inherited by the child class, using Python’s normal name resolution order (names on the child class override all others; then come names on the first parent class, and so on).
> 2. If no managers are declared on a model and/or its parents, Django automatically creates the `objects` manager.
> 3. The default manager on a class is either the one chosen with `Meta.default_manager_name`, or the first manager declared on the model, or the default manager of the first parent model.

Mine, TL;DR:
> Nah, aturan-aturan ini memberikan kebebasan dalam menginstall _a collection of custom managers on a group of models_, via _abstract base class_, tapi masih bisa mengubah _default manager_-nya.
>
> Baca dan contoh selanjutnya, dalam official docs, [Custom managers and model inheritance](https://docs.djangoproject.com/en/5.0/topics/db/managers/#custom-managers-and-model-inheritance).

### Implementation concerns - Skipped

Terlalu technical, baca aja di official docs, [Implementation concerns](https://docs.djangoproject.com/en/5.0/topics/db/managers/#implementation-concerns).

Cuman ini contoh kode-nya:

```python
>>> import copy
>>> manager = MyManager()
>>> my_copy = copy.copy(manager)
```

Mine, learning note:
> Ya kan ya? Siapa coba yang `copy` `manager` daripada langsung tulis aja, tapi suatu note "hati-hati" gitu, udahlah tulis aja? Enggak. Udah we jangan lupa **BACA** kalau ngerjain `Manager`s.

## Notes

Learning + maintenance note:
> Naha `managers` ada `topics` nya tapi gak ada `ref` nya ya?
