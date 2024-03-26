# What is `*` operator exactly?

## Kok bisa ditaro di depan function gitu?

### The case

`*super().check(**kwargs),`

Dari [sini](https://github.com/django/django/blob/761946f8e1b6d725f83fa4f3b04ca9750f486009/django/db/models/fields/__init__.py#L2770):

```python
# ...

class AutoFieldMixin:
    db_returning = True

    def __init__(self, *args, **kwargs):
        kwargs["blank"] = True
        super().__init__(*args, **kwargs)

    def check(self, **kwargs):
        return [
            *super().check(**kwargs),
            *self._check_primary_key(),
        ]

    def _check_primary_key(self):
        if not self.primary_key:
            return [
                checks.Error(
                    "AutoFields must set primary_key=True.",
                    obj=self,
                    id="fields.E100",
                ),
            ]
        else:
            return []
    
    # ...

# ...
```

### Penjelasan GitJob Colipot

The line of code you're asking about is written in Python and it's using a few different concepts that I'll break down for you.

```python
*super().check(**kwargs),
```

1. `super()`: This is a built-in Python function that is often used in the context of inheritance in object-oriented programming. It's used to call a method from a parent class. In this case, it's calling the [`check`](command:_github.copilot.openSymbolInFile?%5B%22django%2Fdb%2Fmodels%2Ffields%2F__init__.py%22%2C%22check%22%5D "django/db/models/fields/__init__.py") method from the parent class.

2. [`.check()`](command:_github.copilot.openSymbolInFile?%5B%22django%2Fdb%2Fmodels%2Ffields%2F__init__.py%22%2C%22.check()%22%5D "django/db/models/fields/__init__.py"): This is a method that is presumably defined in the parent class. Without more context, it's hard to say exactly what this method does, but given its name and common naming conventions, it's likely that this method performs some sort of validation or check.

3. [`**kwargs`](command:_github.copilot.openSymbolInFile?%5B%22django%2Fdb%2Fmodels%2Ffields%2F__init__.py%22%2C%22**kwargs%22%5D "django/db/models/fields/__init__.py"): This is a way in Python to pass a variable number of keyword arguments to a function. The `**` operator is used to unpack the dictionary and pass the items in the dictionary as keyword arguments to the function.

4. `*`: This is the unpacking operator in Python. It's used to unpack an iterable (like a list or a tuple) into individual elements. In this context, it's used to unpack the list (or other iterable) that is returned by the `super().check(**kwargs)` call.

So, to put it all together, this line of code is calling the [`check`](command:_github.copilot.openSymbolInFile?%5B%22django%2Fdb%2Fmodels%2Ffields%2F__init__.py%22%2C%22check%22%5D "django/db/models/fields/__init__.py") method from the parent class, passing in any keyword arguments that were passed to the current method. It then unpacks the iterable that is returned by the [`check`](command:_github.copilot.openSymbolInFile?%5B%22django%2Fdb%2Fmodels%2Ffields%2F__init__.py%22%2C%22check%22%5D "django/db/models/fields/__init__.py") method. This is typically done when you want to combine the elements of the returned iterable with other elements in a list.

## Sebagai variabel (dari Stackoverflow)

[Python unpacking operator (*)](https://stackoverflow.com/questions/50950690/python-unpacking-operator)

Mine:
> Thanks to them all.

### The Question

Maksudnya apa nih?

```python
*s,='abcde'
```

(Dia) tahu sebenernya sama seperti ini:

```python
s=[*'abcde']
```

Cuman yang atas kok bisa?

### The Answer

This is [Iterable Unpacking](https://www.python.org/dev/peps/pep-3132/). You may have seen it in other places to assign values to multiple variables from a single expression

```python
a, b, c = [1, 2, 3]
```

This syntax includes a `*` to indicate that this variable should be a list containing the elements from the iterable that weren't explicitly assigned to another variable.

```python
a, *b, c = [1, 2, 3, 4, 5]
print(b)
# [2, 3, 4]
```

So, what's going on in your example? There's only a single variable name being assigned to, so it's going to take all the items not assigned to another variable, which in this case is all of them. If you try just

```python
*s='abcde'
```

you'll get

```
SyntaxError: starred assignment target must be in a list or tuple
```

Which is why that comma is there, as a trailing comma is how you indicate a single-value tuple.

### Penjelasan lebih lanjut dari PEP 3132

..., TBA, baca aja [di sini](https://peps.python.org/pep-3132/).

## Passing argument as dictionary

Tags:
> django.

```python
field_name = 'someones_name'
Foo.objects.get(**{field_name: 'Cpt. Hook'})
```

Mine:
> Taken from -> <https://stackoverflow.com/a/13017912>.
