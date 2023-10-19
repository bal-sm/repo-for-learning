# `null` vs `blank`

> [Source](https://stackoverflow.com/a/8609425), thanks to Chris Pratt and mrghofrani.

- `null` allows `NULL` value on `database`-level
- `blank` allows the `ModelForm`'s field to be ignored.
  - **BUT** the `null` value still matters, 'cause `form` is below `database`-things.
    - `form` validation ➡️ `database` validation

> Below abaikan aja.

## Examples - **Full answer**

```python
models.DateTimeField(blank=True) # raises IntegrityError if blank

models.DateTimeField(null=True) # NULL allowed, but must be filled out in a form
```

_(Obviously, Those two options don't make logical sense to use (though there might be a use case for null=True, blank=False if you want a field to always be required in forms, optional when dealing with an object through something like the shell.))_

```python
models.CharField(blank=True) # No problem, blank is stored as ''

models.CharField(null=True) # NULL allowed, but will never be set as NULL
```

### Pro-tip

- Don't use `null=True` on `CharField` and `TextField` (cenah dia mah `CHAR` and `TEXT` types) 'cause those will never saved as `NULL` by Django, but as "" (`blank`).
