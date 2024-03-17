# How to create custom model fields - Soon

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
