# TL;DR `classmethod` vs `staticmethod`

```python
class Item:
    @staticmethod
    def is_integer(num):
        """
        This should do something that has a relationship with the class,
        but not something that must be unique per instance.
        """

    @classmethod
    def instantiate_from_something(cls):
        """
        This should also do something that has a relationship with the class,
        but usually, those are used to manipulate different structures of data
        to instantiate objects, like from CSV files, JSON files, etc.
        """
```
