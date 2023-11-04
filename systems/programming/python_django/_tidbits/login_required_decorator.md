# `@login_required` decorator

The reason why this is made:
> Dari tutorial Dennis Ivy. Nah dia video sebelum part 15 nya, ada `@login_required` di `home` view -nya., nah di part 15 nya, dia mau bikin nih jadi user role based cenah, jadi custom decorator. Tapi aku belum ngerti jadi rangkum dulu deh.

## Content - The `"@"login_required` decorator

```python
login_required(redirect_field_name='next', login_url=None)
```

As a shortcut, you can use the convenient `@login_required()` decorator:

```python
from django.contrib.auth.decorators import login_required


@login_required
def my_view(request):
    ...
```

`@login_required()` does the following:
- If the user **isn’t logged in**,
  - redirect to `settings.LOGIN_URL`, passing **the current absolute path** [_in the query string_](https://en.wikipedia.org/wiki/Query_string) (meureun).
    - > TODO: eta maksudna query string tea. jieun rfl na.
  - Example: `/accounts/login/?next=/polls/3/`.
    - > tuh maksudnya _query string_ teh setelah `?` character, `next=/polls/3/`.
    - > baca learning note 1 geura.
- If the user **is logged in**,
  - execute the view _normally_.
  - The view code _is free to assume the user is logged in_.

## Source(s)

[The `"@"login_required` decorator](https://docs.djangoproject.com/en/4.2/topics/auth/default/#the-login-required-decorator).

## Notes

Learning in Progress Note 1:
> Itu teh `next` argument -nya, bakal dipake sama Django buat redirect atau gimana lier ih
