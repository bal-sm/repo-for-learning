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

### Field deconstruction - Mahmuda's version - WIP

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
        if self.separator != ",":
            kwargs["separator"] = self.separator
        return name, path, args, kwargs
```

Them, *remember*:
> More complex examples are beyond the scope of this document, but remember - for any configuration of your `Field` instance, `deconstruct()` must return arguments that you can pass to `__init__` to reconstruct that state.

Them, ...:
> - Pay extra attention if you set new default values for arguments in the `Field` superclass; 
>   - you want to make sure they’re always included, rather than disappearing if they take on the old default value.

...

### ...

...

### Useful methods

...

#### ...

...

#### Converting values to Python objects

...

Mine, explanation:
> ~~Jadi gini:~~
> ~~- Database -> `from_db_value()` -> Python object~~
> ~~- Serialized data -> ↓~~
> ~~  - Cleaned data -> `to_python()` -> Python object~~
>
> Baca selanjutnya di [sini](#jadi-begini-mahmudas-note)

...

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

#### Converting Python objects to query values

Mine, learning note:
> Query is when you interact with database, therefore query values are values that are made to interact with database.

...

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
