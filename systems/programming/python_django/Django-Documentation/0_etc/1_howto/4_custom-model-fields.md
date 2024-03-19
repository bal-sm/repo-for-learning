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

## Backgoound theory - WIP

### Database storage - WIP

Them:
> Let’s start with model fields. If you break it down, a model field provides a way to take a normal Python object – string, boolean, `datetime`, or something more complex like `Hand` – and convert it to and from a format that is useful when dealing with the database. (Such a format is also useful for serialization, but as we’ll see later, that is easier once you have the database side under control).
>
> Fields in a model must somehow be converted to fit into an existing database column type. Different databases provide different sets of valid column types, but the rule is still the same: those are the only types you have to work with. Anything you want to store in the database must fit into one of those types.
>
> Normally, you’re either writing a Django field to match a particular database column type, or you will need a way to convert your data to, say, a string.
>
> For our `Hand` example, we could convert the card data to a string of 104 characters by concatenating all the cards together in a predetermined order – say, all the *north* cards first, then the *east*, *south* and *west* cards. So `Hand` objects can be saved to text or character columns in the database.

Mine, TL;DR:
> ..., TBA.

### ...

...

## ...

...

## Useful methods

...

### ...

...

### Converting values to Python objects

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

### Converting Python objects to query values

Mine, learning note:
> Query is when you interact with database, therefore query values are values that are made to interact with database.

...

### ...

...

### Jadi begini, Mahmuda's note

- Database -> `from_db_value()` -> Python object
- Serialized data -> ↓
  - Cleaned data -> `to_python()` -> Python object
- Python object -> `get_prep_value()` -> Database

## ...

...
