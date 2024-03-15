# `hasattr()`

## Definition and Usage

The hasattr() function returns True if the specified object has the specified attribute, otherwise False.

## Syntax

```python
hasattr(object, attribute)
```

Parameter values:
- object: Required. An object.
- attribute: The name of the attribute you want to check if exists

## Example

```python
class Person:
    name = "John"
    age = 36
    country = "Norway"

x = hasattr(Person, "age") # Output: True

y = hasattr(Person, "sexual_orientation") # Output: False
```

## Source(s)

- [Python hasattr() Function](https://www.w3schools.com/python/ref_func_hasattr.asp)
