# How object validation (+ constraints) really work on Django

## Why?

Soalnya pengen banget ada database validation (+ constraint jadi error prone pisan), bukan sekedar `clean()` method di `form` untuk object tertentu.

## How? - `Needs maintenance`

Maintenance note:
> Kalau udah ketulis di atas, hapus.

From the official docs:
- https://docs.djangoproject.com/en/5.0/ref/models/instances/#validating-objects
- https://docs.djangoproject.com/en/5.0/ref/models/constraints/
- https://docs.djangoproject.com/en/5.0/ref/forms/api/#django.forms.Form.clean

Penggalan [Validating objects](https://docs.djangoproject.com/en/5.0/ref/models/instances/#validating-objects):

```{note}
♯ Model instance reference

...(skip)

♯♯ ... (skip)

... (skip)

♯♯ Validating objects

- There are four steps involved in validating a model:
  - Validate the model fields - `Model.clean_fields()`
  - Validate the model as a whole - `Model.clean()`
  - Validate the field uniqueness - `Model.validate_unique()`
  - Validate the constraints - `Model.validate_constraints()`

All four steps are performed when you call a model’s `full_clean()` method.

... (> Baca penuh plz)
```

Penggalan [Constraints reference](https://docs.djangoproject.com/en/5.0/ref/models/constraints/)

```{note}
♯ Constraints reference

The classes defined in this module create database constraints. They are added in the model [`Meta.constraints`](https://docs.djangoproject.com/en/5.0/ref/models/options/#django.db.models.Options.constraints) option.

... (> A bunch of parameters shit)
```

-> Penggalan [`Meta.constraints`](https://docs.djangoproject.com/en/5.0/ref/models/options/#django.db.models.Options.constraints)

```{note}
♯ Model `Meta` options

This document explains all the possible [metadata options](https://docs.djangoproject.com/en/5.0/topics/db/models/#meta-options) that you can give your model in its internal `class Meta`.

♯♯ Available `Meta` options

♯♯♯ `abstract`

... (skip)

♯♯♯ ... (skip)

... (skip)

♯♯♯ `constraints`

♯♯♯♯ `Options.constraints`

    A list of [constraints](https://docs.djangoproject.com/en/5.0/ref/models/constraints/) that you want to define on the model:

    ```python
    from django.db import models


    class Customer(models.Model):
        age = models.IntegerField()

        class Meta:
            constraints = [
                models.CheckConstraint(check=models.Q(age__gte=18), name="age_gte_18"),
            ]
    ```

    **•**

♯♯♯ ... (skip)

... (skip)

```
