# `**kwargs` vs assign to `self`

```python
class SomeField:
    def __init__(self, something, *args, **kwargs):
        self.something = something

    def __repr__(self):
        return f"{self.__dict__}"
```

vs.

```python
class SomeField:
    def __init__(self, *args, **kwargs):
        self.something = kwargs['something']

    def __repr__(self):
        return f"{self.__dict__}"
```

> Dua-dua nya valid! Dan sama aja, tapi explicit lebih baik daripada implicit.
