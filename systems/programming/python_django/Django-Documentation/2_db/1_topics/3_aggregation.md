# Aggregation

Them, skip:
> The topic guide on [Django’s database-abstraction API](./2_queries.md) described the way that you can use Django queries that create, retrieve, update and delete individual objects. 

Them:
> However, sometimes you will need to retrieve values that are derived by *summarizing* or *aggregating* a collection of objects. This topic guide describes the ways that *aggregate* *values* can be **generated** and **returned** _using Django queries_.

Throughout this guide, _we’ll refer to the following models_. These models are used to track the inventory for a series of online bookstores:

```python
from django.db import models


class Author(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()


class Publisher(models.Model):
    name = models.CharField(max_length=300)


class Book(models.Model):
    name = models.CharField(max_length=300)
    pages = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    rating = models.FloatField()
    authors = models.ManyToManyField(Author)
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)
    pubdate = models.DateField()


class Store(models.Model):
    name = models.CharField(max_length=300)
    books = models.ManyToManyField(Book)
```

## Cheat sheet

...

## Generating aggregates over a `QuerySet`

...

## Generating aggregates for each item in a `QuerySet`

...

### Combining multiple aggregations

...

## Joins and aggregates

...

### Following relationships backwards

...

## Aggregations and other `QuerySet` clauses

...

### `filter()` and `exclude()`

...

#### Filtering on annotations

...

#### Order of `annotate()` and `filter()` clauses

...

### `order_by()`

...

### `values()`

...

#### Order of `annotate()` and `values()` clauses

...

#### Interaction with `order_by()`

...

### Aggregating annotations

...

### Aggregating on empty querysets or groups

...
