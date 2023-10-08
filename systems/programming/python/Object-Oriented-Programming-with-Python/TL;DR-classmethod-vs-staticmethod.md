# TL;DR `classmethod` vs `staticmethod`

```python
class Item:
    @staticmethod
    def is_integer(num):
        """
        This should do something that has a relationship with the class,
        but not something that must be unique per instance.
        """
```
