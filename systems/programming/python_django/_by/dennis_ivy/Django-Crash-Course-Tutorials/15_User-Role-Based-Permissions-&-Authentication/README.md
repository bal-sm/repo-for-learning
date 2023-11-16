
```python
#  _  _    __   ___   ___     ___    __    _     ___     __    __     __   ___   __      ___   ___   ___   __ __   _    __    __   _    __    __  _    __      __,       __    _  _   _____   _  _   ___   __  _   _____   _    ___   __    _____   _    __    __  _
# | || | /' _/ | __| | _ \   | _ \  /__\  | |   | __|   |  \  /  \  /' _/ | __| | _\    | _,\ | __| | _ \ |  V  | | | /' _/ /' _/ | |  /__\  |  \| | /' _/    (_ /_     /  \  | || | |_   _| | || | | __| |  \| | |_   _| | |  / _/  /  \  |_   _| | |  /__\  |  \| |
# | \/ | `._`. | _|  | v /   | v / | \/ | | |_  | _|    | -< | /\ | `._`. | _|  | v |   | v_/ | _|  | v / | \_/ | | | `._`. `._`. | | | \/ | | | ' | `._`.    /`X\/ |  | /\ | | \/ |   | |   | >< | | _|  | | ' |   | |   | | | \__ | /\ |   | |   | | | \/ | | | ' |
#  \__/  |___/ |___| |_|_\   |_|_\  \__/  |___| |___|   |__/ |_||_| |___/ |___| |__/    |_|   |___| |_|_\ |_| |_| |_| |___/ |___/ |_|  \__/  |_|\__| |___/   `\_/\| |  |_||_|  \__/    |_|   |_||_| |___| |_|\__|   |_|   |_|  \__/ |_||_|   |_|   |_|  \__/  |_|\__|
```

Mine:
> Made with https://ascii-generator.site/. `stforek` font.

# User Role Based Permissions & Authentication

[Source](https://www.youtube.com/watch?v=eBsc65jTKvw).

Mine:
> Author used `3.0` version of Django.

Tidbit(s) made:
- [`@login_required` decorator](../../../../_tidbits/login_required_decorator.md).

## Content

Mine:
> yang awal-awal di skip, penjelasan aja mau buat `@unautheticated_user()` buat "login" and "registration" view.

### `@unautheticated_user()`

```python
from django.http import HttpResponse
from django.shortcuts import redirect

def unauthenticated_user(view_func):
    def wrapper_func(request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect('home')
        else:
            return view_func(request, *args, **kwargs)

    return wrapper_func
```

Ilustrasi masalah `view_func` -> its argument(s) -> available on `unauthenticated_user()` scope (?):
> Mari kita bawa lagi.. soalnya dibawa oleh decorator.. melalui arguments -> `unauthenticated_user`(**`view_func`**), bener toh? Nanti kita lihat saja lewat magic method -> `__dict__`.

#### Benefits

Before:

```python
@unauthenticated_user()
def registerPage(request):
    if request.user.is_authenticated:
        return redirect('home')
    else:
        form = RegisterForm()
        if request.method == 'POST':
            form = RegisterForm(request.POST)
            if form.is_valid():
                form.save()
                # user = form.cleaned_data.get("username")
                # message.success(request, 'Account was created for ' + user)

                return redirect('login')
        context = {'form': form}
        return render(request, 'accounts/register.html', context)
```

After:

```python
def registerPage(request):
    form = RegisterForm()
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            form.save()
            # user = form.cleaned_data.get("username")
            # message.success(request, 'Account was created for ' + user)

            return redirect('login')
    context = {'form': form}
    return render(request, 'accounts/register.html', context)
```

Mine:
> And for **every** **view** that **need** this.

### `@allowed_users(allowed_roles=[])`

```python
def allowed_users(allowed_roles=[]):
    def decorator(view_func):
        def wrapper_func(request, *args, **kwargs):

            group = None
            if request.user.groups.exists():
                group = request.user.groups.all()[0].name # TODO make it multi dong

            if group in allowed_roles:
                return view_func(request, *args, **kwargs)
            else:
                return HttpResponse("You are not authorized to view this page.")

        return wrapper_func
    return decorator
```

### `@admin_only()`

Dennis Ivy:
> This is duct tape fix, cenah. Jangan pake buat big and formal project.

```python
def admin_only(view_func):
    def wrapper_function(request, **args, **kwargs):
        group = None
        if request.user.groups.exists():
            group = request.user.groups.all()[0].name

        if group == "customer":
            return redirect("user-page")

        if group == "admin":
            return view_func(request, *args, **kwargs)

    return wrapper_function
```

Mine:
> Soalnya khusus buat home page cenah, yang admin sama yang per customer teh beda.
>
> Kalo admin, semua customer. Kalo per customer, ya buat customer yang login aja.

Mine:
> Kalo saya, namain nya begini `@admin_or_customer_redirect()`

### Associate new user with a group automatically

Dennis Ivy:
> You can achieve this with Django's signals.

Mine:
> It's on another video, cenah, penjelasan complete-nya.

...

## Note(s)

Mine:
> Last position, 17:37.

Learning note 1:
> Kenapa ya di return nya gak pake `gini()`, **`()`**. Baca we ya yang dari stackoverflow, ultimate penjelasan tea.

Learning note 2:
> Cenah biar user automatically assigned to a group, biasanya pake Django's signals.

Learning note 3:
> Django's Middleware cenah towards end of the series buat beresin masalah authentication yang lebih lanjut.
