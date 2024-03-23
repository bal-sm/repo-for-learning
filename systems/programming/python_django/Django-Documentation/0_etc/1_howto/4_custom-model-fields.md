# How to create custom model fields - Soon

## Introduction - Unmodded

Them:
> The [model reference](../../2_db/1_topics/1_models.md) documentation explains how to use Django’s standard field classes – `CharField`, `DateField`, etc. For many purposes, those classes are all you’ll need. Sometimes, though, the Django version won’t meet your precise requirements, or you’ll want to use a field that is entirely different from those shipped with Django.
>
> Django’s built-in field types don’t cover every possible database column type – only the common types, such as `VARCHAR` and `INTEGER`. For more obscure column types, such as geographic polygons or even user-created types such as [PostgreSQL custom types](https://www.postgresql.org/docs/current/sql-createtype.html), you can define your own Django `Field` subclasses.
>
> Alternatively, you may have a complex Python object that can somehow be serialized to fit into a standard database column type. This is another case where a `Field` subclass will help you use your object with your models.

### Our example object - Mahmuda's version

Them:
> Creating custom fields requires a bit of attention to detail. To make things easier to follow, we’ll use a consistent example throughout this document: wrapping a Python object representing the deal of cards in a hand of [Bridge](https://en.wikipedia.org/wiki/Contract_bridge). Don’t worry, you don’t have to know how to play Bridge to follow this example. You only need to know that 52 cards are dealt out equally to four players, who are traditionally called *north*, *east*, *south* and *west*. Our class looks something like this:

```python
class Hand:
    """A hand of cards (bridge style)"""

    def __init__(self, north, east, south, west):
        # Input parameters are lists of cards ('Ah', '9s', etc.)
        self.north = north
        self.east = east
        self.south = south
        self.west = west

    # ... (other possibly useful methods omitted) ...
```

Them:
> This is an ordinary Python class, with nothing Django-specific about it. We’d like to be able to do things like this in our models (we assume the `hand` attribute on the model is an instance of `Hand`):
>
> ```python
> example = MyModel.objects.get(pk=1)
> print(example.hand.north)
> 
> new_hand = Hand(north, east, south, west)
> example.hand = new_hand
> example.save()
> ```
>
> We assign to and retrieve from the `hand` attribute in our model just like any other Python class. The trick is to tell Django how to handle saving and loading such an object.
>
> In order to use the `Hand` class in our models, we *do not* have to change this class at all. This is ideal, because it means you can easily write model support for existing classes where you cannot change the source code.

Note from them:
> You might only be wanting to take advantage of custom database column types and deal with the data as standard Python types in your models; strings, or floats, for example. This case is similar to our `Hand` example and we’ll note any differences as we go along.

Mine, addition:
> Makanya caranya gini:
>
> ```python
> class HandField(models.Field):
>     # ...
> ```
>
> Terus:
>
> ```python
> class MyModel(models.Model):
>     hand = HandField()
> ```
>
> Makanya bisa gini juga:
>
> ```python
> example = MyModel.objects.get(pk=1)
> print(example.hand.north)
> 
> new_hand = Hand(north, east, south, west)
> example.hand = new_hand
> example.save()
> ```
>
> Oh iya terus sama tergantung `from_db_value()`, `to_python()`, `get_prep_value()`, dan `value_to_string()` di `HandField` juga, baca aja di [bawah](#useful-methods).

## Background theory - Mahmuda's version

### Database storage - Mahmuda's version

Them:
> Let’s start with model fields. If you break it down, a model field provides a way to take a normal Python object – string, boolean, `datetime`, or something more complex like `Hand` – and convert it to and from a format that is useful when dealing with the database. (Such a format is also useful for serialization, but as we’ll see later, that is easier once you have the database side under control).
>
> Fields in a model must somehow be converted to fit into an existing database column type. Different databases provide different sets of valid column types, but the rule is still the same: those are the only types you have to work with. Anything you want to store in the database must fit into one of those types.
>
> Normally, you’re either writing a Django field to match a particular database column type, or you will need a way to convert your data to, say, a string.
>
> For our `Hand` example, we could convert the card data to a string of 104 characters by concatenating all the cards together in a predetermined order – say, all the *north* cards first, then the *east*, *south* and *west* cards. So `Hand` objects can be saved to text or character columns in the database.

Mine, TL;DR:
> A model field: normal Python object (string, boolean, `datetime`, or something more complex like `Hand`) -convert-it-to-> any existing database column type (`VARCHAR` and `INTEGER`).
>
> In case of our `HandField`: `Hand` object -convert-to-> 104 characters by concatenating all the cards (north first, then east, south, and west cards) -so-it-can-be-saved-to-> text / character columns in the database.

### What does a field class do? - Soon MV

Them:
> All of Django’s fields (and when we say *fields* in this document, we always mean model fields and not [form fields](https://docs.djangoproject.com/en/5.0/ref/forms/fields/)) are subclasses of [`django.db.models.Field`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#django.db.models.Field). Most of the information that Django records about a field is common to all fields – name, help text, uniqueness and so forth. Storing all that information is handled by `Field`. We’ll get into the precise details of what `Field` can do later on; for now, suffice it to say that everything descends from `Field` and then customizes key pieces of the class behavior.

Them:
> It’s important to realize that a Django field class is not what is stored in your model attributes. The model attributes contain normal Python objects. The field classes you define in a model are actually stored in the `Meta` class when the model class is created (the precise details of how this is done are unimportant here). This is because the field classes aren’t necessary when you’re just creating and modifying attributes. Instead, they provide the machinery for converting between the attribute value and what is stored in the database or sent to the [serializer](https://docs.djangoproject.com/en/5.0/topics/serialization/).

Mine, learning note:
> Rada ngerti btw. Mungkin bisa membantu -> <https://stackoverflow.com/questions/21818728/django-model-field-class-shows-itself-as-different-class>.

Them:
> Keep this in mind when creating your own custom fields. The Django `Field` subclass you write provides the machinery for converting between your Python instances and the database/serializer values in various ways (there are differences between storing a value and using a value for lookups, for example). If this sounds a bit tricky, don’t worry – it will become clearer in the examples below. Just remember that you will often end up creating two classes when you want a custom field:
>
> - The first class is the Python object that your users will manipulate. They will assign it to the model attribute, they will read from it for displaying purposes, things like that. This is the `Hand` class in our example.

Mine, learning note:
> Tuh kalo `CharField` berarti the first class nya tuh `str`.

Them:
> - The second class is the `Field` subclass. This is the class that knows how to convert your first class back and forth between its permanent storage form and the Python form.

## Writing a field subclass - Mahmuda's version

When planning your `Field` subclass,
1. first give some thought to which existing `Field` class your new field is most similar to.
   1. Can you subclass an existing Django field and save yourself some work? 
   2. If not, you should subclass the `Field` class, from which everything is descended.

- Initializing your new field is
  - a matter of separating out 
    - any arguments that are specific to your case
    - from the common arguments and 
    - passing the latter to the `__init__()` method of `Field` (or your parent class).

- In our example, we’ll call our field `HandField`. 
  - _(**It’s a good idea** to call your `Field` subclass `<Something>Field`, so it’s easily identifiable as a `Field` subclass.)_
  - It doesn’t behave like any existing field, so we’ll subclass directly from `Field`:

```python
from django.db import models


class HandField(models.Field):
    description = "A hand of cards (bridge style)"

    def __init__(self, *args, **kwargs):
        kwargs["max_length"] = 104
        super().__init__(*args, **kwargs)
```

- Our `HandField` accepts most of the standard field options _(see the list below)_, but we ensure it has a fixed length, since it only needs to hold 52 card values plus their suits; 104 characters in total.

Note:
> Many of Django’s model fields accept options that they don’t do anything with. For example, you can pass both [`editable`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#django.db.models.Field.editable) and [`auto_now`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#django.db.models.DateField.auto_now) to a [`django.db.models.DateField`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#django.db.models.DateField) and it will ignore the [`editable`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#django.db.models.Field.editable) parameter ([`auto_now`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#django.db.models.DateField.auto_now) being set implies `editable=False`). No error is raised in this case.
>
> This behavior simplifies the field classes, because they don’t need to check for options that aren’t necessary. They pass all the options to the parent class and then don’t use them later on. It’s up to you whether you want your fields to be more strict about the options they select, or to use the more permissive behavior of the current fields.

The `Field.__init__()` method takes the following parameters:
- `verbose_name`
- `name`
- `primary_key`
- `max_length`
- `unique`
- `blank`
- `null`
- `db_index`
- `rel`: Used for related fields (like `ForeignKey`). For advanced use only.
- `default`
- `editable`
- `serialize`: If `False`, the field will not be serialized when the model is passed to Django’s serializers. Defaults to `True`.
- `unique_for_date`
- `unique_for_month`
- `unique_for_year`
- `choices`
- `help_text`
- `db_column`
- `db_tablespace`: Only for index creation, if the backend supports tablespaces. You can usually ignore this option.
- `auto_created`: `True` if the field was automatically created, as for the `OneToOneField` used by model inheritance. For advanced use only.

All of the options without an explanation in the above list have the same meaning they do for normal Django fields. See the [field documentation](https://docs.djangoproject.com/en/5.0/ref/models/fields/) for examples and details.

### Field deconstruction - Mahmuda's version

- The counterpoint to writing your `__init__()` method is writing the `deconstruct()` method.
  - > `__init__` -> `deconstruct()`
  - **It’s used during [model migrations](https://docs.djangoproject.com/en/5.0/topics/migrations/)** 
    - to tell Django
      1. how to take an instance of your new field and 
      2. reduce it to a serialized form - 
         - in particular, what arguments to pass to `__init__()` to recreate it.

- If you haven’t added any extra options on top of the field you inherited from,
  - > `__init__`'s child == `__init__`'s parent
  - then there’s no need to write a new `deconstruct()` method.
- If, however, you’re changing the arguments passed in `__init__()` (like we are in `HandField`),
  - > the `max_length` tea
  - you’ll need to supplement the values being passed.

`deconstruct()` returns a tuple of four items:

```python
def deconstruct(self):
    ...

    return name, path, args, kwargs
```

- explanation of the four items:
  - `name`: The name of the field on the model / the field's attribute name.
    - e.g. `name="hand"`
      - > bukan `name="HandField"` kan ya? learning note, a question. jawab kalo dah tau.
    - generated by Django automatically [837]
  - `path`: The Python path to the field class, relative to the root of the module. / the full import path of the field class,
    - e.g. `path="django.db.models.TextField"`
    - generated by Django automatically [837]
  - `args`: the positional arguments (as a list)
    - e.g.: `args=[]`
    - > did you know that you actually don't need to unpack it yet? (pake `*`) karena nanti fungsi yang nerima mengunpack this list. learning note.
  - `kwargs`: the keyword arguments (as a dictionary)
    - e.g. `kwargs={"max_length": 104}`
    - > idem.

Them, skip aja:
> [837]: As a custom field author, you don’t need to care about the first two values; the base `Field` class has all the code to work out the field’s attribute name and import path. You do, however, have to care about the positional and keyword arguments, as these are likely the things you are changing.

For example, in our `HandField` class
1. we’re always forcibly setting `max_length` in `__init__()`.
2. The `deconstruct()` method on the base `Field` class will see this and try to return it in the keyword arguments;
3. thus, we can drop it from the keyword arguments for readability:
   - > terus kenapa cik itu boleh/harus di drop? soalnya `deconstruct()` digunain pas serializing/model migration ajah, which jadi data yang udah we, gak usah ditulis lagi da pasti kayak gitu-gitu aja. learning note, bingung/~~bikin ngerti~~ gak sih? nanti fix aja we.

```python
from django.db import models


class HandField(models.Field):
    def __init__(self, *args, **kwargs):
        kwargs["max_length"] = 104
        super().__init__(*args, **kwargs)

    def deconstruct(self):
        name, path, args, kwargs = super().deconstruct()
        del kwargs["max_length"]
        return name, path, args, kwargs
```

- If you add a new keyword argument,
  1. you need to write code in `deconstruct()` that puts its value into `kwargs` yourself.
  2. You should also omit the value from `kwargs` when it isn’t necessary to reconstruct the state of the field,
     - *such* as when the default value is being used:

```python
from django.db import models


class CommaSepField(models.Field):
    "Implements comma-separated storage of lists"

    def __init__(self, separator=",", *args, **kwargs):
        self.separator = separator
        super().__init__(*args, **kwargs)

    def deconstruct(self):
        name, path, args, kwargs = super().deconstruct()
        # Only include kwarg if it's not the default
        if self.separator != ",": # **[930]**
            kwargs["separator"] = self.separator
        return name, path, args, kwargs
```

Them, *remember*:
> More complex examples are beyond the scope of this document, but remember - for any configuration of your `Field` instance, `deconstruct()` must return arguments that you can pass to `__init__` to reconstruct that state.

Them, [930]:
> - Pay extra attention if you set new default values for arguments in the `Field` superclass; 
>   - you want to make sure they’re always included, rather than disappearing if they take on the old default value.

Them, cautionary note:
> In addition, try to avoid returning values as positional arguments; where possible, return values as keyword arguments for maximum future compatibility. If you change the names of things more often than their position in the constructor’s argument list, you might prefer positional, but bear in mind that people will be reconstructing your field from the serialized version for quite a while (possibly years), depending how long your migrations live for.

Mine, TL;DR:
> Don't ever return values as positional arguments. Avoid it as possible. Use keyword arguments instead.

Them, skip aja dulu:
> You can see the results of deconstruction by looking in migrations that include the field, and you can test deconstruction in unit tests by deconstructing and reconstructing the field:
>
> ```python
> name, path, args, kwargs = my_field_instance.deconstruct()
> new_instance = MyField(*args, **kwargs)
> self.assertEqual(my_field_instance.some_attribute, new_instance.some_attribute)
> ```

Mine, learning note:
> That's not helpful.. missing some piece of code.

### Field attributes not affecting database column definition

You can override `Field.non_db_attrs` to customize attributes of a field that don’t affect a column definition. It’s used during model migrations to detect no-op `AlterField` operations.

For example:

```python
class CommaSepField(models.Field):
    @property
    def non_db_attrs(self):
        return super().non_db_attrs + ("separator",)
```

Mine:
> That don't affect a column definition.. Huh?

### Changing a custom field’s base class

You can’t change the base class of a custom field because Django won’t detect the change and make a migration for it. For example, if you start with:

```python
class CustomCharField(models.CharField): ...
```

and then decide that you want to use `TextField` instead, you can’t change the subclass like this:

```python
class CustomCharField(models.TextField): ... # ❌
```

Instead, you must create a new custom field class and update your models to reference it:

```python
class CustomCharField(models.CharField): ...


class CustomTextField(models.TextField): ...
```

As discussed in [removing fields](https://docs.djangoproject.com/en/5.0/topics/migrations/#migrations-removing-model-fields), you must retain the original `CustomCharField` class as long as you have migrations that reference it.

### Documenting your custom field

As always, you should document your field type, so users will know what it is. In addition to providing a docstring for it, which is useful for developers, you can also allow users of the admin app to see a short description of the field type via the [`django.contrib.admindocs`](https://docs.djangoproject.com/en/5.0/ref/contrib/admin/admindocs/) application. To do this provide descriptive text in a [`description`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#django.db.models.Field.description) class attribute of your custom field. In the above example, the description displayed by the `admindocs` application for a `HandField` will be ‘A hand of cards (bridge style)’.

In the [`django.contrib.admindocs`](https://docs.djangoproject.com/en/5.0/ref/contrib/admin/admindocs/#module-django.contrib.admindocs) display, the field description is interpolated with `field.__dict__` which allows the description to incorporate arguments of the field. For example, the description for `CharField` is:

```python
description = _("String (up to %(max_length)s)")
```

### Useful methods

Them:
> Once you’ve created your `Field` subclass, you might consider overriding a few standard methods, depending on your field’s behavior. The list of methods below is in approximately decreasing order of importance, so start from the top.

#### Custom database types - Mahmuda's version

Them:
> Say you’ve created a PostgreSQL custom type called `mytype`. You can subclass `Field` and implement the `db_type()` method, like so:

```python
from django.db import models


class MytypeField(models.Field):
    def db_type(self, connection):
        return "mytype"
```

Them:
> Once you have `MytypeField`, you can use it in any model, just like any other `Field` type:

```python
class Person(models.Model):
    name = models.CharField(max_length=80)
    something_else = MytypeField()
```

---

_Them, skipped_

Mine, TL;DR:
> Kalau mau bikin jadi database agnostic maka harus dipisah tergantung `connection.vendor`-nya. Current built-in vendor names are: `sqlite`, `postgresql`, `mysql`, and `oracle`.

For example:

```python
class MyDateField(models.Field):
    def db_type(self, connection):
        if connection.vendor == "mysql":
            return "datetime"
        else:
            return "timestamp"
```

---

The [`db_type()`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#django.db.models.Field.db_type) and [`rel_db_type()`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#django.db.models.Field.rel_db_type) methods are called by Django:
1. when the framework constructs the `CREATE TABLE` statements for your application – 
   - that is, when you first create your tables. 
2. The methods are also called when constructing a `WHERE` clause that includes the model field – 
   - that is, when you retrieve data using `QuerySet` methods like `get()`, `filter()`, and `exclude()` and have the model field as an argument.

---

- Some database column types accept parameters,
  - such as `CHAR(25)`, 
    - where the parameter `25` represents the maximum column length. 
  - In cases like these, 
    - it’s more flexible if the parameter is **specified in the model** 
    - rather than being **hard-coded in the `db_type()`** method. 
    - For example, _it wouldn’t make much sense_ to have a `CharMaxlength25Field`, shown here:

```python
# This is a silly example of hard-coded parameters.
class CharMaxlength25Field(models.Field):
    def db_type(self, connection):
        return "char(25)"


# In the model:
class MyModel(models.Model):
    # ...
    my_field = CharMaxlength25Field()
```

- The *better* *way* of doing this would be to
  - *make* the *parameter* **specifiable** at run time – 
  - i.e., when the class is instantiated. 
  - To do that, implement `Field.__init__()`, like so:

```python
# This is a much more flexible example.
class BetterCharField(models.Field):
    def __init__(self, max_length, *args, **kwargs):
        self.max_length = max_length
        super().__init__(*args, **kwargs)

    def db_type(self, connection):
        return "char(%s)" % self.max_length


# In the model:
class MyModel(models.Model):
    # ...
    my_field = BetterCharField(25)
```

---

Note from them:
> - Finally, if your column requires truly complex SQL setup, 
>   - return `None` from [`db_type()`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#django.db.models.Field.db_type). 
>   - This will cause Django’s SQL creation code to **skip over** this **field**. 
>   - You are then responsible for creating the column in the right table in some other way, but this gives you a way to tell Django to get out of the way.

---

- The [`rel_db_type()`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#django.db.models.Field.rel_db_type) method is called by fields such as:
  - `ForeignKey` and
  - `OneToOneField`
  - that point to another field to
    - *determine* their database *column data types*. 
      - ->

-> For example, if you have an `UnsignedAutoField`, you also need the foreign keys that point to that field to use the same data type:

```python
# MySQL unsigned integer (range 0 to 4294967295).
class UnsignedAutoField(models.AutoField):
    def db_type(self, connection):
        return "integer UNSIGNED AUTO_INCREMENT"

    def rel_db_type(self, connection):
        return "integer UNSIGNED"
```

---

#### Converting values to Python objects - Mahmuda's version

Them, skip aja:
> If your custom [`Field`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#django.db.models.Field) class deals with data structures that are more complex than strings, dates, integers, or floats, then you may need to override [`from_db_value()`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#django.db.models.Field.from_db_value) and [`to_python()`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#django.db.models.Field.to_python).
>
> If present for the field subclass, `from_db_value()` will be called in all circumstances when the data is loaded from the database, including in aggregates and [`values()`](https://docs.djangoproject.com/en/5.0/ref/models/querysets/#django.db.models.query.QuerySet.values) calls.
>
> `to_python()` is called by deserialization and during the [`clean()`](https://docs.djangoproject.com/en/5.0/ref/models/instances/#django.db.models.Model.clean) method used from forms.

Mine, explanation:
> ~~Jadi gini:~~
> ~~- Database -> `from_db_value()` -> Python object~~
> ~~- Serialized data -> ↓~~
> ~~  - Cleaned data -> `to_python()` -> Python object~~
>
> Baca selanjutnya di [sini](#jadi-begini-mahmudas-note)

As a general rule, `to_python()` _should deal gracefully_ [833] with any of the following arguments:
- An instance of the correct type (e.g., `Hand` in our ongoing example).
- A string
- `None` (if the field allows `null=True`)

Mine, artinya [833]:
> harus menghadapinya dengan anggun. gracefully = neatly

---

- In our `HandField` class, 
  - we’re storing the data as a `VARCHAR` field in the database,
    - so we need to be able to process strings and `None`
      - in the `from_db_value()`.
  - In `to_python()`, we need to also handle `Hand` instances:

```python
import re

from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import gettext_lazy as _


def parse_hand(hand_string):
    """Takes a string of cards and splits into a full hand."""
    p1 = re.compile(".{26}")
    p2 = re.compile("..")
    args = [p2.findall(x) for x in p1.findall(hand_string)]
    if len(args) != 4:
        raise ValidationError(_("Invalid input for a Hand instance"))
    return Hand(*args)


class HandField(models.Field):
    # ...

    def from_db_value(self, value, expression, connection):
        if value is None:
            return value
        return parse_hand(value)

    def to_python(self, value):
        if isinstance(value, Hand):
            return value

        if value is None:
            return value

        return parse_hand(value)
```

Them:
> Notice that we always return a `Hand` instance from these methods. That’s the Python object type we want to store in the model’s attribute.
>
> For `to_python()`, if anything goes wrong during value conversion, you should
raise a [`ValidationError`](https://docs.djangoproject.com/en/5.0/ref/exceptions/#django.core.exceptions.ValidationError) exception.

Mine, learning note:
> What is `isinstance()`? Baca di [sini](../../../../python/_by_code/isinstance.md).

Mine, another learning note:
> Tuh ih dia juga nulis `parse_hand()` di luar ~~`HandField`~~ `Hand` class. Writing code style. is. relative. even if udah pake formatter and linter juga.

Mine, tuh, tanggapan another learning note:
> Tuh tuh tuh this is the better way, ya kan?
>
> ```python
> class Hand:
>     """A hand of cards (bridge style)"""
>
>     def __init__(self, north, east, south, west):
>         # Input parameters are lists of cards ('Ah', '9s', etc.)
>         self.north = north
>         self.east = east
>         self.south = south
>         self.west = west
>
>     @classmethod
>     def parse_hand(cls, hand_string):
>         """Takes a string of cards and splits into a full hand."""
>         p1 = re.compile(".{26}")
>         p2 = re.compile("..")
>         args = [p2.findall(x) for x in p1.findall(hand_string)]
>         if len(args) != 4:
>             raise ValidationError(_("Invalid input for a Hand instance"))
>         return cls(*args)
> ```

#### Converting Python objects to query values - Mahmuda's version

Mine, learning note:
> Query is when you interact with database, therefore query values are values that are made to interact with database.

- Since using a database requires conversion in both ways,
  - if you override [`from_db_value()`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#django.db.models.Field.from_db_value)
    - you also have to override [`get_prep_value()`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#django.db.models.Field.get_prep_value)
      - to convert Python objects back to query values.

Mine, learning note:
> Baca [ini](#jadi-begini-mahmudas-note).

For example:

```python
class HandField(models.Field):
    # ...

    def get_prep_value(self, value):
        return "".join(
            ["".join(l) for l in (value.north, value.east, value.south, value.west)]
        )
```

Note from them, warning, for MySQL user:
> If your custom field uses the `CHAR`, `VARCHAR` or `TEXT` types for MySQL, you must make sure that [`get_prep_value()`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#django.db.models.Field.get_prep_value) always returns a string type. MySQL performs flexible and unexpected matching when a query is performed on these types and the provided value is an integer, which can cause queries to include unexpected objects in their results. This problem cannot occur if you always return a string type from [`get_prep_value()`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#django.db.models.Field.get_prep_value).

#### Converting query values to database values - Mahmuda's version

- Some data types (for example, dates)
  - need to be in a specific format before they can be used by a database backend.
  - [`get_db_prep_value()`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#django.db.models.Field.get_db_prep_value)
    - is the method where those conversions should be made.
    - The specific connection that will be used for the query
      - is passed as the `connection` parameter. 
        - This allows you to use backend-specific conversion logic if it is required.

Mine, syntax:

```python
def get_db_prep_value(self, value, connection, prepared=False):
    ...
    return value
```

---

For example, Django uses the following method for its `BinaryField`:

```python
def get_db_prep_value(self, value, connection, prepared=False):
    value = super().get_db_prep_value(value, connection, prepared)
    if value is not None:
        return connection.Database.Binary(value)
    return value
```

---

- In case your custom field needs
  - a special conversion when being saved
    - that is not the same as
      - the conversion used for normal query parameters,
        - you can override [`get_db_prep_save()`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#django.db.models.Field.get_db_prep_save).

#### Preprocessing values before saving - Mahmuda's version

- If you want to preprocess the value just before saving,
  - you can use [`pre_save()`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#django.db.models.Field.pre_save). 
    - For example, Django’s [`DateTimeField`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#django.db.models.DateTimeField) uses this method to set the attribute correctly in the case of 
      - [`auto_now`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#django.db.models.DateField.auto_now) or
      - [`auto_now_add`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#django.db.models.DateField.auto_now_add).

- If you do override this method,
  1. you must return the value of the attribute at the end.
  2. You should also update the model’s attribute
     - if you make any changes to the value so that code holding references to the model will always see the correct value.

Mine, taken from Django:
>
> ```python
> class DateField(DateTimeCheckMixin, Field):
>     ...
> 
>     def pre_save(self, model_instance, add):
>         if self.auto_now or (self.auto_now_add and add):
>             value = datetime.date.today()
>             setattr(model_instance, self.attname, value)
>             return value
>         else:
>             return super().pre_save(model_instance, add)
> 
>     ...
> ```

#### Specifying the form field for a model field - Unmodded

To customize the form field used by [`ModelForm`](https://docs.djangoproject.com/en/5.0/topics/forms/modelforms/#django.forms.ModelForm), you can override [`formfield()`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#django.db.models.Field.formfield).

The form field class can be specified via the `form_class` and `choices_form_class` arguments; the latter is used if the field has choices specified, the former otherwise. If these arguments are not provided, [`CharField`](https://docs.djangoproject.com/en/5.0/ref/forms/fields/#django.forms.CharField) or [`TypedChoiceField`](https://docs.djangoproject.com/en/5.0/ref/forms/fields/#django.forms.TypedChoiceField) will be used.

All of the `kwargs` dictionary is passed directly to the form field’s `__init__()` method. Normally, all you need to do is set up a good default for the `form_class` (and maybe `choices_form_class`) argument and then delegate further handling to the parent class. This might require you to write a custom form field (and even a form widget). See the [forms documentation](https://docs.djangoproject.com/en/5.0/topics/forms/) for information about this.

Continuing our ongoing example, we can write the [`formfield()`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#django.db.models.Field.formfield) method as:

```python

class HandField(models.Field):
    # ...

    def formfield(self, **kwargs):
        # This is a fairly standard way to set up some defaults
        # while letting the caller override them.
        defaults = {"form_class": MyFormField}
        defaults.update(kwargs)
        return super().formfield(**defaults)
```

This assumes we’ve imported a `MyFormField` field class (which has its own default widget). This document doesn’t cover the details of writing custom form fields.

#### Emulating built-in field types - Mahmuda's version

- If you have created a [`db_type()`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#django.db.models.Field.db_type) method,
  - you don’t need to worry about [`get_internal_type()`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#django.db.models.Field.get_internal_type) – it won’t be used much.
  - *Sometimes*, *though*, your database storage is **similar** in type to **some other field**,
    - so you can *use* *that* other field’s logic to create the right column.

For example:

```python
class HandField(models.Field):
    # ...

    def get_internal_type(self):
        return "CharField"
```

No matter which database backend we are using, this will mean that [`migrate`](../ref/django-admin.md#django-admin-migrate) and other SQL commands create the right column type for storing a string.

If [`get_internal_type()`](../ref/models/fields.md#django.db.models.Field.get_internal_type) returns a string that is not known to Django for the database backend you are using – that is, it doesn’t appear in `django.db.backends.<db_name>.base.DatabaseWrapper.data_types` – the string will still be used by the serializer, but the default [`db_type()`](../ref/models/fields.md#django.db.models.Field.db_type) method will return `None`. See the documentation of [`db_type()`](../ref/models/fields.md#django.db.models.Field.db_type) for reasons why this might be useful. Putting a descriptive string in as the type of the field for the serializer is a useful idea if you’re ever going to be using the serializer output in some other place, outside of Django.

#### ...

...

#### Jadi begini, Mahmuda's note

- Database -> `from_db_value()` -> Python object
- Serialized data -> ↓
  - Cleaned data -> `to_python()` -> Python object
- Python object -> `get_prep_value()` -> Database

### Some general advice

...

## ...

...

## Notes

Mine, maintenance note:
> Jangan lupa rangkum semua link yang masih menuju ke <https://docs.djangoproject.com/en/5.0/>.

Mine, this doc mau ~~ditinggalin~~ dikerjain besok:
> Aku mau cobain pake `mystmd` + `myst-parser` + Sphinx biar gak capek copas copas dari docs. tapi copas-copas dari plain text mereka..

Mine, 2024-03-22, 2:13:40 PM:
> - Aku harus berhenti nich ngerangkum tapi harus satu-satu formattingnya dibenerin soalnya gak kebawa `:(`
>   - padahal udah convert dari `Sphinx` juga, cuman relative link nya gak nyampe ke actual file terus emang- udahlah.
