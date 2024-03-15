# `setattr()`

## Definition and Usage

The `setattr()` function sets the value of the specified attribute of the specified object.

Mine, addition:
> Sama sih sebenernya sama ubah langsung lewat class-nya. Lihat contoh di bawah.

## Syntax

```python
setattr(object, attribute, value)
```

Parameter values:
- object: Required. An object.
- attribute: Required. The name of the attribute you want to set
- value: Required. The value you want to give the specified attribute

## Example

```python
class Person:
    name = "John"
    age = 36
    country = "Norway"


setattr(Person, "age", 40)

# The age property will now have the value: 40

x = getattr(Person, "age")

print(x)
```

Equivalent to:

```python
class Person:
    name = "John"
    age = 36
    country = "Norway"

x = Person.age = 40 # bisa digabungin gini ey

print(x)
```

## Source(s)

- [Python setattr() Function](https://www.w3schools.com/python/ref_func_setattr.asp)
