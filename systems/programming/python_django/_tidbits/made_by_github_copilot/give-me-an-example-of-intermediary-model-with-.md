# My query: give me an example of intermediary model with related_name argument made for each relationship

GitHub Copilot response:

Sure, here's an example of an intermediary model in Django with `related_name` arguments for each relationship:

```python
from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=100)

class Book(models.Model):
    title = models.CharField(max_length=100)
    authors = models.ManyToManyField(Author, through='Authorship', related_name='books')

class Authorship(models.Model):
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='authorships')
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='authorships')
    date_joined = models.DateField()
```

In this example, `Authorship` is an intermediary model for the many-to-many relationship between `Author` and `Book`. The `related_name` argument is used to create a reverse relation from `Author` and `Book` to `Authorship`. So, if you have an instance of `Author`, you can access its related `Authorship` instances with `author_instance.authorships.all()`, and if you have an instance of `Book`, you can access its related `Authorship` instances with `book_instance.authorships.all()`.
