# Django Views — The Right Way

Mine:
> udah we kodenya aja yang ditulis di sini, biar serasa "udah dibaca da ini teh".

## Intro

Them, dirangkum:
> I’ve also added extra bits (in this guide) for common tasks and patterns in FBVs for which CBVs are often suggested as the solution.

Them:
> I have a few aims:
> - I want to show how simple and easy views can be.
> - I want you to be freed from learning _a whole stack of additional APIs_ that were only making your life harder (and teaching you bad patterns).
>   - > this is very important.
> - Instead of learning a bunch of Django specific APIs, I want to cover much more transferable knowledge:
>   - HTTP principles
>   - General OOP/multi-paradigm programming principles
>   - General Python techniques
>
> And there are some other goodies along the way, like how to type-check all the URL parameters to your view functions.

Them, dirangkum:
> Each page is composed of two parts, which have two different audiences.
> - First, the business — the what and how: a short, definitive guide to The Right Way.
>   - > For beginners.
> - Second, discussion — the why: a longer, in-depth explanation of why everyone else who tells you differently is wrong :-)
>   - > Mengajari orang yang keras kepala, cenah.

Mine:
> Dari dulu kek aku ngerangkum ini.

## The Right Way

### The Pattern

`views.py`:

```python
from django.template.response import TemplateResponse

def example_view(request, arg):
    return TemplateResponse(request, 'example.html', {})
```

`urls.py`:

```python
from django.urls import path

from . import views

urlpatterns = [
    path('example/<str:arg>/', views.example_view, name='example_name'),
]
```

Yang penting diingat:
> - ...
> - `arg` is a placeholder for any number of optional URL parameters —
>   - parts of the URL path that you are matching with a [path converter](https://docs.djangoproject.com/en/5.0/topics/http/urls/#path-converters)
>     - (here we used `str`)
>   - and supplying to the view function as a parameter.
>   - You can remove it, or add more, but have to change the URLconf to match.
> - In `urls.py`, you change the arguments to `path` to be, respectively:
>   - the matched URL (with any captured parts),
>   - your view function defined above,
>   - and an optional name that needs to be unique across your project, e.g. `home` or `myapp_articles_list`, to enable [URL reversing](https://docs.djangoproject.com/en/stable/topics/http/urls/#reverse-resolution-of-urls).
>     - > `rfl`-keun ih ieu.
>     - > terus saya mah pake nama view-nya lagi aja.

### The Explanation

Mine:
> rangkum gak yah?

...

## Source(s)

- [1]: [Django Views — The Right Way](https://spookylukey.github.io/django-views-the-right-way/).
  - > Thanks to Spookylukey!
