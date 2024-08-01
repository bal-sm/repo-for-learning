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
>     - > - [ ] `rfl`-keun ih ieu.
>     - > terus saya mah pake nama view-nya lagi aja.

### The Explanation

Mine:
> rangkum gak yah?

Them:
> First, it’s vital to know what a view **is**. As the [Django docs state](https://docs.djangoproject.com/en/5.0/topics/http/views/):
> > A view…is a Python function that takes a Web request and returns a Web response

---

Mine:
> Maka, salah contoh "a view" adalah seperti ini:

```python
from django.http import HttpResponse

def hello_world(request):
    return HttpResponse('Hello world!')
```

Mine:
> Jadi gini,
>
> User's browser -> "some Django's thing" -> [`HttpRequest`](https://docs.djangoproject.com/en/5.0/ref/request-response/#django.http.HttpRequest) -> `request` -> `urls.py` -> `hello_world` function -> [`HttpResponse`](https://docs.djangoproject.com/en/5.0/ref/request-response/#django.http.HttpResponse) -> "some Django's thing again" -> User's browser.

Them:
> .... It then returns an [`HttpResponse`](https://docs.djangoproject.com/en/5.0/ref/request-response/#django.http.HttpResponse) object as its return value. This contains all the data to be sent back to the user’s browser — HTTP headers and body, which is typically a web page. In our case, we sent just the text `Hello world!`.
>
> This request-response cycle is the heart of the Django web framework.

Mine, learning note:
> - [ ] Baca lebih lanjut [ieu](https://docs.djangoproject.com/en/5.0/ref/request-response/),
>   - [ ] dan `rfl`-keun.

---

Them:
> `urls.py` to hook the view up to a URL:

```python
from django.urls import path

from . import views

urlpatterns = [
    path('hello/', views.hello_world, name='hello_world'),
]
```

---

Mine:
> ykiyk, cuman masukkin aja deh.

Them:
> In many cases, we want a single view function to actually match a family of URLs which have some kind of parameter in them, and access that parameter in our view function. Django has built-in support for this. Suppose we want to match URLs like `/hello/XXX/` where `XXX` could be any string. Then our URLconf becomes:

```python
urlpatterns = [
    path('hello/<str:my_arg>/', views.hello_world, name='hello_world'),
]
```

Them:
> and our view signature:

```python
def hello_world(request, my_arg):
    # etc
```

---

_Skipped explanation_

Mine, udah we gini aja:
> pokoknya kita pastinya gak mau pake hanya sekedar teks biasa doang sebagai respon ke browser pengguna, nah makanya memberi suatu HTML yang sangat terstruktur, which is bagusnya pake Django's template engine, which is ykiyk.

```python
from django.http import HttpResponse
from django.template import loader


def hello_world(request, my_arg):
    template = loader.get_template('hello_world.html')
    context = {}
    return HttpResponse(template.render(context, request))
```

---

_Skipped the explanation_

Mine:
> cuman _part of that code_ terus ditulis berulang-ulang, makanya ada shortcut-nya, yaitu pake `render()`, kayak gini:

```python
from django.shortcuts import render


def hello_world(request, my_arg):
    return render(request, 'hello_world.html', {})
```

---

Them, penting gak penting ini:
> This is a great pattern for writing views. Django has one more trick up its sleeve, however — [`TemplateResponse`](https://docs.djangoproject.com/en/5.0/ref/template-response/#templateresponse-objects).
>
> The issue with just using `render` is that you get a plain `HttpResponse` object back that has no memory that it ever came from a template. Sometimes, however, it is useful to have functions return a value that does remember what it’s “made of” — something that stores the template it is from, and the context. This can be really useful in testing, but also if we want to something outside of our view function (such as decorators or middleware) to check or even change what’s in the response before it finally gets ‘rendered’ and sent to the user.
>
> For now, you can just accept that `TemplateResponse` is a more useful return value than a plain `HttpResponse`. (If you are already using `render` everywhere, there is absolutely no need to go and change it though, and almost everything in this guide will work exactly the same with `render` instead of `TemplateResponse`).
>
> With that substitution, we’ve arrived at the pattern you’ll want to start with for views:

Mine:
> udah we pokoknya kalo aku mau pake good ol' `render()` aja, terus kalo misalnya aneh-aneh gitu, pake testing sama 'middleware' shit-nya segala, ubah aja langsung ke `TemplateResponse`. sudah terbiasa `render()` ey.

```python
from django.template.response import TemplateResponse

def example_view(request, arg):
    return TemplateResponse(request, 'example.html', {})
```

---

Them:
> You need to know what each bit is, as described above. **But that is the end of the lesson**. You can skip to the next part. Or you can even just stop reading — you now know all the essentials of writing HTML views in Django.

Mine:
> Memang sih.. cuman aku pengen lebih tau.

Them:
> You don’t need to learn any of the CBV APIs - `TemplateView`, `ListView`, `DetailView`, `FormView`, `MultipleObjectMixin` etc. etc. and all their inheritance trees or method flowcharts. They will only make your life harder. Print out their documentation, put in a shed — or rather, a warehouse [given how much there is](https://ccbv.co.uk/) — fill the warehouse with dynamite and [don’t look back](https://www.youtube.com/watch?v=Sqz5dbs5zmo).

Mine:
> I believe you:
> - Pokoknya memang gitu, udah we ya buat sekarang mending comot-comot aja dari rangkuman of complex things to a `context` terus tampilannya gimana ke user, terus kalo ngelakuin suatu interaction, berarti mengacu ke suatu end point, yang akhirnya nyuruh Django to do something complicated, on whatever it is (ORMs, cleaning forms, etc..). That's basically what a view is.
>   - > Soalnya gening yah, aku teh kepikiran biar, the new canon-uncanon programming teh a thing, how those codes are corrent in every way possible, but how do you want people to see it,
>     - > Who am I? I'm not even one of developers lollz.
>   - > terus sebenernya CBV tersebut doesn't actually include how to organize your CSS, and JS, etc. CMIIW. use `django-components` guys.

### Discussion: keep the view viewable! - TL;DR version of mine

Mine:
> Pokoknya karena pake FBV, jadinya kita punya suatu pola:
> - a function ✓
> - that takes an argument called request ✓
> - and returns some kind of response — a TemplateResponse ✓
>
> Dan akhirnya membuat suatu `view` itu sangatlah mudah dan simpel.

Mine:
> Coba kalo gini:

```python
from django.views.generic import TemplateView

class ExampleView(TemplateView):
    template_name = "example.html"
```

Mine:
> Jadinya the simplicity of the patterns of making a view-nya tuh ilang:
> - ~~a function~~, it's a class, obfuscated code.
> - ~~that takes an argument called request~~, ilang.
> - ~~and returns some kind of response — a TemplateResponse~~, gak ada.

Them:
> You might think “this is shorter than the FBV” is one of the advantages. It is, slightly, but as soon as you add the need for [context data](https://spookylukey.github.io/django-views-the-right-way/context-data.html) this advantage disappears, and we’ll find we have [more boilerplate](https://spookylukey.github.io/django-views-the-right-way/context-data.html#boilerplate), not less, with CBVs.

Mine, meta to the author:
> Biarin we ya materi aslinya diginiin aja wkwkw, namanya juga buat sendiri.

## How to do anything in a view - Original

So, you have a template for writing a view function. There is something different you want to do. How should you go about it?

The answer is:
> Just do it.

That probably isn’t very clear yet, so I’ll cover some common examples. What I want you to remember is:
- You are in charge. It’s your view function. You make it do whatever you want it to do, without trying to fit into someone else’s pattern. Just do it.
- It’s probably not hard and you can probably do it already.
- Sometimes you might have to write a little bit of code to make it do what you want, rather than being able to find something already written. But you are a software developer, you write code. Take responsibility and just do it.
- It doesn’t have to be perfect yet. In time you’ll find ways to make your code more concise if you find yourself writing the same things over and over. Don’t be afraid to make some mistakes along the way.

Mine:
> Bener banget.

### Discussion: Starting points - Original

One of the reasons for the pattern I'm recommending is that it makes a great starting point for doing anything. The body of the view — the function that takes a request and returns a response — is right there in front of you, just ready for you to write some logic. If a developer understands **what a view is**, and they have some idea of what they want this view to do, then they will likely have a good idea of what code they need to write. The code structure in front of them will not be an obstacle.

The same is not true of using CBVs as a starting point. As soon as you need any logic, you have to start adding configuration or defining methods, which brings you pain:

- You've got to know which methods or attributes to define, which involves knowing a massive API.
- You could easily get it wrong in a way which introduces serious bugs (such as [perhaps the worst security bug I've witnessed in Django itself](https://groups.google.com/d/msg/django-developers/HUZySAw43uE/RD4ifBLPBgAJ))
- You've got to add the method, which is extra boilerplate.
- You may need to switch the base class, and understand what that will do.

We'll see more examples of this as we go through.

Some people will say we should use a CBV for the really simple cases, and then switch to an FBV later as needed. But in reality that doesn't happen. Most developers are much more likely to stick with the existing structure of the code, because that is a safe option, and usually involves less work. Plus, once you have started down the CBV route, you quickly gain various mixins etc. and the principle of One Way To Do It and consistency means that plain functions will appear less attractive.

Mine:
> Camkan.

## Adding data to a template

To me:
> Nice ih, rangkum.

...

## Common context data

To me:
> **HADE PISAN IH IEU**, **rang** **kum**.

..., dipenggal dulu.

Them:
> But suppose none of these apply — we just have some common data that is used for a group of a pages. Perhaps we have an e-commerce site, and all the checkout pages have a common set of data that they need, without necessarily displaying it in the same way.

Mine, maksudnya:
> - template-nya berbeda.
> - `context` values-nya sama.

..., TBA.

### Discussion: Helpers vs mixins

..., dipenggal dulu.

The simple solution is the best!

Mine:
> YES IT IS.

This example is part of a larger principle for the best way to write views, and any similar functions:
> Building up behaviour by explicitly **composing** smaller, testable units of functionality (whether functions or classes) is far better than building up behaviour via **inheritance**.

For more on this, see Brandon Rhodes’ treatment of [The Composition Over Inheritance Principle](https://python-patterns.guide/gang-of-four/composition-over-inheritance/), which also mentions mixins.

Mine:
> oh itu makanya `pytest` kan ya.

## URL parameters in views

Them:
> As described in the [Django tutorial for views](https://docs.djangoproject.com/en/5.0/intro/tutorial03/) and the [request handling docs](https://docs.djangoproject.com/en/5.0/topics/http/urls/#how-django-processes-a-request), if you want to capture part of a URL to be used in a view function, you can do it by configuring your URLs.

Mine:
> - [x] `rfl`-keun, [request handling docs](https://docs.djangoproject.com/en/5.0/topics/http/urls/#how-django-processes-a-request), eta.
>   - > oh udah ketang: <https://github.com/bal-sm/repo-for-learning/blob/261716df4a3cf328704160de62026f024ead5742/systems/programming/python_django/Django-Documentation/URL-dispatcher.md>.

..., TBA.

## ...

...

## Custom logic at the start — delegation

...

Them:
> I’ve assumed the `SpecialOffer.get_products()` method exists and returns a `QuerySet`. If you have an appropriate `ManyToMany` relationships the implementation might be as simple as `return self.products.all()`, but it might be different.

Mine, note for my own personal project:
> tuh ih bikin dulu aja views-nya, terus baru bikin `Model`'s methods-nya

...

### Discussion: Copy-Paste Bad, Re-use Good?

...

Them:
> Before you can abstract commonality, you actually need at least two examples, preferably three, and abstracting before then is premature. The commonalities may be very different from what you thought, and when you have enough information to make that decision you might decide that it’s not worth it. So avoiding all duplication at any cost is not the aim we should have.

Mine:
> Jadi reuse all the way! Camkan.

...

## ...

...

## Thin views

...

### Example: push filtering to the model layer

...

```python
user = request.user
context = {
    'basket_bookings': user.bookings.in_basket()
}
# etc.
```

Mine, learning note, for my own personal project:
> Wow this is actually enlightening (sic) how to put any objects that associated with `user`!

Tuh makanya, cenah Luke:
> If there is a user involved, I usually prefer code that looks like this. By getting into the habit of starting all user-related queries with `user`, whether I’m displaying a list or a retrieving a single item, it’s harder to forget to add access controls, so I will be less prone to [insecure direct object reference](https://portswigger.net/web-security/access-control/idor) security issues.

...

#### Chainable custom `QuerySet` methods

...

```python
on_shelf_or_in_basket = Booking.objects.in_basket() | Booking.objects.on_shelf()
```

Mine, learning note:
> Tuh ih, baru nyadar, memang kalo pake `filter` dalamnya pake `|`, cuman kan ini udah gak ada `filter`-nya.!

Them:
> The new `QuerySet` is constructed without executing a query. When you evaluate `on_shelf_or_in_basket`, you’ll execute a single DB query that will return both types of bookings. So we get efficient code that is also readable and doesn’t leak our schema inappropriately.

Mine:
> Camkan ieu ih! Apalagi masalah custom `Manager` vs custom `QuerySet`-nya.

...

## My notes

Mine:
> Jadi pokoknya don't overcomplicate coding. I really stopped coding with Django when the views become too "fat". FUCK. This. is. the. way.

Mine:
> Ayo dong cepet ngerangkumnya. Gimana ya?

## Source(s)

- [1]: [Django Views — The Right Way](https://spookylukey.github.io/django-views-the-right-way/).
  - > Thanks to Spookylukey!
