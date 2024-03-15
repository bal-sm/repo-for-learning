# `getattr()` function

The `getattr()` function returns the value of the specified attribute from the specified object.

Syntax:

```python
getattr(object, attribute, default)
```

Parameter Values:
- object: Required. An object.
- attribute: The name of the attribute you want to get the value from
- default: Optional. The value to return if the attribute does not exist

Mine, addition:
> Equivalent to:
>
> ```python
> my_object = object
> my_object.the_attribute
> ```
>
> Cuman ini mah langsung ke object(class) nya gening.

## Examples

### Example 1

Get the value of the "age" property of the "Person" object:

```python
class Person:
    name = "John"
    age = 36
    country = "Norway"

x = getattr(Person, 'age') 
# Output: 36
```

Mine, addition:
> Equivalent to:
> 
> ```python
> Person = my_person
> x = my_person.age
> # Output: 36
> ```
>

### Example 2

```python
class Book:
    title = "The Exorcist"
    release_year = 1973

x = getattr(Book, 'page', 'my message')
# Output: 'my message'
```

## Source(s)

- [Python getattr() Function](https://www.w3schools.com/python/ref_func_getattr.asp)
