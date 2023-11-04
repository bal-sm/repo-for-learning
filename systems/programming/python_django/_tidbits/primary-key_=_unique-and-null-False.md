# primary_key meaning unique=True and null=False

title.

## Full answer

Q:

> By [`black-hole-sun`](https://stackoverflow.com/q/58139212)

Django: Does "primary_key=True" also mean "unique"?

A:

> By [William Van Onsem](https://stackoverflow.com/a/58139240)

Yes. Since a primary key means a value that can uniquely identify an object. In [the documentation on the `primary_key` parameter](https://docs.djangoproject.com/en/dev/ref/models/fields/#primary-key), we see:

```{note}
`Field.primary_key`

If `True`, this field is the primary key for the model.

If you don’t specify `primary_key=True` for any field in your model, Django will automatically add an `AutoField` to hold the primary key, so you don’t need to set `primary_key=True` on any of your fields unless you want to override the default primary-key behavior. For more, see Automatic primary key fields.

`primary_key=True` implies `null=False` and `unique=True`. Only one primary key is allowed on an object.
```
