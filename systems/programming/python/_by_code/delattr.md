# `delattr()`

## Definition and Usage

The `delattr()` function will delete the specified attribute from the specified object.

## Syntax

```python
delattr(object, attribute)
```

Parameter values:
- object: Required. An object.
- attribute: Required. The name of the attribute you want to remove

## Example

```python
class Person:
    name = "John"
    age = 36
    country = "Norway"


delattr(Person, "age")

# The Person object will no longer contain an "age" property
```

## Source(s)

- [Python delattr() Function](https://www.w3schools.com/python/ref_func_delattr.asp)
