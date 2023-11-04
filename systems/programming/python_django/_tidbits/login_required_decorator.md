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
  - redirect to `settings.LOGIN_URL`, passing **the current absolute path** [_in the query string_](https://en.wikipedia.org/wiki/Query_string).
    - > TODO: eta maksudna query string tea. jieun rfl na.
  - Example: `/accounts/login/?next=/polls/3/`.
    - > tuh maksudnya _query string_ teh setelah `?` character, `next=/polls/3/`.
    - > baca learning note 1 geura.
- If the user **is logged in**,
  - execute the view _normally_.
  - The view code _is free to assume the user is logged in_.

### Penjelasan lanjutan (opsional untuk dibaca): `next` -> a query string parameter

- By default, the path that the user should be redirected to upon successful authentication
  - is stored in a query string parameter called `next`.
  - If you would prefer to use a different name for this parameter, `@login_required()` takes an optional `redirect_field_name` parameter:

  ```python
  from django.contrib.auth.decorators import login_required


  @login_required(redirect_field_name="my_redirect_field")
  def my_view(request):
      ...
  ```

My note:
> Oh, tuh jadi contohnya url yang di passed in nya gini: `/accounts/login/?my_redirect_field=/polls/3/`.

- Note that if you provide a value to `redirect_field_name`,
  - you will most likely **need to customize your login template as well**,
    - _since the template context variable which stores the redirect path will use the value of `redirect_field_name` as its key **rather than** `next` (**the default**)._
      - > **SO DON'T.**
      - > Kejawab sudah gripe learning note 1 tea.

## Source(s)

[The `"@"login_required` decorator](https://docs.djangoproject.com/en/4.2/topics/auth/default/#the-login-required-decorator).

## Notes

Learning in Progress Note 1:
> Itu teh `next` argument -nya, bakal dipake sama Django buat redirect atau gimana lier ih

Penjelasan:
> `next` nya itu parameter, after `=` character, _argument (meureun)_

Learning in Progress Note 1, **solved**, TODO: bikin dedicated file buat ini:

```{note}
The `?next=/something/` is a query parameter in the request. So you can access it using `request.GET` that is a dict-like. So in this case, you can:

```python
# Either redirect the user to the `next` url if any, or the home page
next_url = request.GET.get("next", "store:home")
return redirect(next_url)
```

This is possible because redirect allows you to pass either a url, or a “reversable” url name
```

~~My gripe of learning note 1~~, just kidding:
> ~~Kesel ih tapi, kenapa gak dijelasin sama sekali (not appearing in my search session) di <https://docs.djangoproject.com/>.~~ Tuh baca lanjutannya. Jadi ignore this whole note section, baca aja [itu](#penjelasan-lanjutan-opsional-untuk-dibaca-next---a-query-string-parameter).
