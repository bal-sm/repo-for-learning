# Creating and Utilizing Decorators in Django

[By Boluwatife Fayemi](https://www.section.io/engineering-education/custom-decorators-in-django/)

## `authentication_not_required`

- The function: **Logged in** users will **be unable to access a view**
  - _(as a result of this decorator)_.
  - _This is useful for login and registration views_.
    - > Rather than, users must be **logged in** **_in order to_ access the view**.
    - > Sumpah ini kenapa belum a thing (gitu ya?) di Django?

```python
import functools
from django.shortcuts import redirect
from django.contrib import messages

def authentication_not_required(view_func, redirect_url="accounts:profile"):
    """
        this decorator ensures that a user is not logged in,
        if a user is logged in, the user will get redirected to
        the url whose view name was passed to the redirect_url parameter
    """
    @functools.wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return view_func(request,*args, **kwargs)
        messages.info(request, "You need to be logged out")
        print("You need to be logged out")
        return redirect(redirect_url)
    return wrapper
```

Mine:
> Tuh ada `@functools.wraps()` wajib itu teh ih.

## `verification_required`

- The function: Users who **haven’t verified** **their** **email** address _or phone number_
  - will be **unable** to **access a view**
  - _(as a result of this)_.

```python
def verification_required(view_func, verification_url="accounts:activate_email"):
    """
        this decorator restricts users who have not been verified
        from accessing the view function passed as it argument and
        redirect the user to page where their account can be activated
    """
    @functools.wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if request.user.is_active:
            return view_func(request, *args, **kwargs)
        messages.info(request, "Email verification required")
        print("You need to be logged out")
        return redirect(verification_url)
    return wrapper
```

Note dari dia:

```{note}
A conditional statement checks if the user is active or not. The view function in which the decorator is being used on is called if the user is active. This redirects the user to the `verification_url` if otherwise while showing a message using the message framework on the template and in the terminal or `cmd` using the `print` statement.
```

Mine:
> Tuh ih omG liat geura, masalah [`is_active` boolean of `User` model](https://docs.djangoproject.com/en/4.2/ref/contrib/auth/#django.contrib.auth.models.User.is_active). Cuman masih belum kebaca ih.

Maintenance karena note atas tea ih:
> Butuh dijadiin dedicated md ih eta masalah [`is_active`](...)

## `xhr_request_only`

The function: This ensures only request via `fetch`, `XHR`(`XMLHttpRequest`) or `AJAX`(Asynchronously Javascript and XML) is allowed.

Mine:
> Hah? Asa technical terus unnecessary complexity banget ini. **Skip aja**. IMO IMO ya original author.

**SKIPPED**.
