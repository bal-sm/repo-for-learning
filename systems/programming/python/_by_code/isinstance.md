# `isinstance()`

## Definition and Usage

1. The `isinstance()` function returns:
   - `True` if the specified object is of the specified type,
   - otherwise `False`.
2. If the type parameter is a tuple,
   - this function will return `True` *if the object is **one of the types** in the tuple*.

## Syntax

```python
isinstance(object, type)
```

Parameter values:
- object: Required. An object.
- type: A type or a class, **or** a tuple of types and/or classes

## Examples

### Example 0

```python
x = isinstance(5, int)

print(x)
```

### Example 1

Check if "Hello" is one of the types described in the type parameter:

```python
x = isinstance("Hello", (str, float, int, str, list, dict, tuple))

print(x) # Output: True
```

### Example 2

Check if `y` is an instance of `myObj`:

```python
class myObj:
    name = "John"

y = myObj()

x = isinstance(y, myObj)

print(x) # Output: True
```

### Taken from [here](https://docs.djangoproject.com/en/5.0/howto/custom-model-fields/#useful-methods) - WIP

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
        if isinstance(value, Hand): # HERE!
            return value

        if value is None:
            return value

        return parse_hand(value)
```

Mine, explanation:
> Basically, penjelasan `isinstance` dalam `to_python`:
> 1. jadi kalo `value` merupakan instance/perwakilan dari `Hand` object, maka langsung aja `return` lagi `value`-nya.
> 2. Kalo `None`, sama juga, `return` lagi `value`-nya yaitu `None`.
> 3. Kalo selain itu semua, (berarti mostly `str` / a string gening), masukin ke `parse_hand()` biar jadi `Hand` object instance.
>    - > ~~Honestly masih gak ngerti `re` teh apa, bentar. Learning note.~~
>      - > ~~Oh a regex things, skip aja dah, mari balik lagi.~~

## Source(s)

- [Python isinstance() Function](https://www.w3schools.com/python/ref_func_isinstance.asp)
