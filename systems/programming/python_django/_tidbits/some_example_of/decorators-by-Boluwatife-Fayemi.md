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

### Utilization

Mine:
> Tuh jadi dipakenya gini.

```python
...

@authentication_not_required
def register(request):
    """
    Registration view for users
    """
    ...

@authentication_not_required
def login(request):
    """
    To login
    """
    ...

```

#### Full code-nya

`accounts/views.py`

```python
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib import auth
from .forms import RegisterForm,LoginForm
from django.contrib import messages
from .decorators import authentication_not_required, verification_required
from django.contrib.auth.decorators import login_required

@authentication_not_required
def register(request):
    """
        registration view for users
    """
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            # don't save to the database yet
            instance = form.save(commit=False)
            instance.set_password(form.cleaned_data['password1'])
            instance.is_active = False
            instance.save()
            messages.success(request, "Account created successfully!")
            return redirect('accounts:login')
        else:
            messages.error(request, 'Error creating your account!!!')
    else:
        form = RegisterForm()
    return render(request, 'accounts/register.html', context={'form': form})

@authentication_not_required
def login(request):
    login_form = LoginForm()
    if request.method == 'POST':
        login_form = LoginForm(request.POST)
        if login_form.is_valid():
            cleaned_data = login_form.cleaned_data
            user = auth.authenticate(request, username=cleaned_data.get('username'),
            password=cleaned_data.get('password'))
            if user is not None:
                auth.login(request, user)
                messages.success(request, "Logged in Successfully!")
                print("Logged in Successfully!")
                return redirect("accounts:profile")
            else:
                messages.error(request, "Invalid credentials, wrong username or password")
                print("Invalid credentials, wrong username or password")
        else:
            messages.error(request, "form invalid")
            print("form invalid")
    return render(request, 'accounts/login.html', {'form': login_form})

def profile(request):
    return render(request, 'accounts/profile.html')
```

Mine:
> Baca we cuman. Bawah.

Learning note ke-?:
> Gimana sih built-in `login` sama `registration` dari Django nya. Bagusnya pake itu aja gak seh. Maksud saya teh salah satu class based `views.py` gening.

My opinion:
> Namanya lebih bagus `@logout_required()`, gak sih.

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

## Utilization both of `verification_required` and `xhr_request_only`

```python
@verification_required
@login_required(login_url="accounts:login")
@xhr_request_only
@require_POST
def post_vote_view(request):
    ...
```

Mine:
> Skipped.

## Wow, Decorating class based views -> `views.py`

- A Django application always uses class based views
  - because of their simplicity.
  - > Sometimes euy
  - **But** using decorators with class based views is **not as straightforward as function based views**.
    - **Luckily**, Django provides a utility decorator called `@method_decorator` to achieve that.

- To add a decorator function to **every** instance of a **class based views**,
  - you need to **decorate** **the class definition** itself.
    - > Kayak biasa.

To do this, you pass **the name of the method** to be **decorated** as the keyword argument name:

```python
from .decorators import authentication_not_required
from django.utils.decorators import method_decorator

@method_decorator(authentication_not_required, name='dispatch')
class LoginView(TemplateView):
    ...
```

Mine:
> [Read more.](https://docs.djangoproject.com/en/4.2/topics/class-based-views/intro/#decorating-the-class)

Maintenance learning note:
> Harus dibikin dedicated md nya.
