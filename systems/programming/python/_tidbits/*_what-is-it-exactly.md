# What is `*` operator exactly?

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