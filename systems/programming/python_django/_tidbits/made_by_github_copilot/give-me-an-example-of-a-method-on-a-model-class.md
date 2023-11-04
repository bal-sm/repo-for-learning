# "my query": give me an example of a method on a model class

Mine:
> "my query", 'cause it actually not worded like that, it's a series of queries. It really do be like that sometimes.

GitHub Copilot response:

Sure, you can create a method inside the `Jurnal` model to get the first `Jotting` associated with it. Here's how you can do it:

```python
from django.db import models

class Jurnal(models.Model):
    # your fields here

    def get_first_jotting(self):
        return self.jottings.all().first()
```

In this code, `get_first_jotting` is a method of the `Jurnal` model that returns the first `Jotting` associated with the `Jurnal` instance. You can call this method on any instance of `Jurnal` to get its first `Jotting`.

Mine:
> Tuh ih da kayak gitu bener, gak usah ribet-ribet.
