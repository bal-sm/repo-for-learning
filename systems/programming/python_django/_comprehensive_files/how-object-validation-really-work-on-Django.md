# How object validation (+ constraints) really work on Django

## Why?

Soalnya pengen banget ada database validation (+ constraint jadi error prone pisan), bukan sekedar `clean()` method di `form` untuk object tertentu.

## How?

From the official docs:
- https://docs.djangoproject.com/en/5.0/ref/models/instances/#validating-objects
- https://docs.djangoproject.com/en/5.0/ref/models/constraints/
- https://docs.djangoproject.com/en/5.0/ref/forms/api/#django.forms.Form.clean

Penggalan [Validating objects](https://docs.djangoproject.com/en/5.0/ref/models/instances/#validating-objects):

```{note}
♯ Model instance reference

♯♯ Validating objects

- There are four steps involved in validating a model:
  - Validate the model fields - `Model.clean_fields()`
  - Validate the model as a whole - `Model.clean()`
  - Validate the field uniqueness - `Model.validate_unique()`
  - Validate the constraints - `Model.validate_constraints()`

All four steps are performed when you call a model’s `full_clean()` method.

...
```
