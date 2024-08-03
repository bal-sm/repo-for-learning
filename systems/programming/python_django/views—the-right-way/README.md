# Django Views — The Right Way — Lite

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

## How to do anything in a view - Original - Penting

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

### Discussion: Starting points

Them, penting:
> One of the reasons for the pattern I'm recommending is that it makes a great starting point for doing anything. The body of the view — the function that takes a request and returns a response — is right there in front of you, just ready for you to write some logic. If a developer understands **what a view is**, and they have some idea of what they want this view to do, then they will likely have a good idea of what code they need to write. The code structure in front of them will not be an obstacle.

Them, gak penting, CBV thing:
> The same is not true of using CBVs as a starting point. As soon as you need any logic, you have to start adding configuration or defining methods, which brings you pain:
>
> - You've got to know which methods or attributes to define, which involves knowing a massive API.
> - You could easily get it wrong in a way which introduces serious bugs (such as [perhaps the worst security bug I've witnessed in Django itself](https://groups.google.com/d/msg/django-developers/HUZySAw43uE/RD4ifBLPBgAJ))
> - You've got to add the method, which is extra boilerplate.
> - You may need to switch the base class, and understand what that will do.
>
> We'll see more examples of this as we go through.
>
> Some people will say we should use a CBV for the really simple cases, and then switch to an FBV later as needed. But in reality that doesn't happen. Most developers are much more likely to stick with the existing structure of the code, because that is a safe option, and usually involves less work. Plus, once you have started down the CBV route, you quickly gain various mixins etc. and the principle of One Way To Do It and consistency means that plain functions will appear less attractive.

Mine:
> ~~Camkan~~. Tuh. Gitu aja.

## Adding data to a template

To me:
> Nice ih, rangkum.

_Skipped_

Them:
> As we said, the answer to how do anything in a view is “Just do it”:

```python
from datetime import date

def home(request):
    return TemplateResponse(request, "home.html", {
        'today': date.today(),   # This is the line you add
    })
```

Mine:
> Yes. Just do it.

---

_Another variation_

```python
def home(request):
    today = date.today()
    context = {
        'today': today,
    }
    if today.weekday() == 0:
        context['special_message'] = 'Happy Monday!'
    return TemplateResponse(request, "home.html", context)
```

### Discussion: Embarrassingly simple?

_Skipped explanation_

```python
context = {
    'today': date.today(),
}
```

vs.

```python
def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)
    context['today'] = date.today()
    return context
```

_Skipped lagi_

Mine:
> Pokoknya CBV ribet we, API nya goblok, pake `super()` segala, terus newbie pada bingung juga. Soalnya "bad starting point tea" cenah. Ya gitulah.

### Discussion: Boilerplate

_Skipped_

Mine, TL;DR:
> Pengurangan boilerplate untuk menambah nilai pemahaman kode, itu lebih berharga, daripada untuk mengurangi pengetikan kode.

_Skipped lagi_

Mine, TL;DR deui:
> Pengilangan (sic) `request` (jadinya secara implisit aja) adalah suatu ide buruk. Mau gimana juga, udah we technical nya juga aku gak usah peduli.

_Skipped some text dan kode-kode-nya_

Mine, pokoknya gini:
> In other words:
> - The boilerplate you need for a basic CBV is bigger than for an FBV.
> - It’s so big and tedious that people feel the need of snippets libraries.
>   - > such as [this for emacs](https://github.com/pashinin/emacsd/blob/c8e50e6bb573641f3ffd454236215ea59e4eca13/snippets/python-mode/class) and [this for vim](https://github.com/honza/vim-snippets/blob/087d3e7c72912baeb6b1d7ba626e61d50092c848/UltiSnips/django.snippets#L357), and [this for Sublime Text](https://github.com/mvdwaeter/dotfiles/blob/60673ae395bf493fd5fa6addeceac662218e1703/osx/Sublime%20Text/get_context_data.sublime-snippet).

_Dan skipped lagi_

## Common context data

To me:
> **HADE PISAN IH IEU**, **rang** **kum**.

### First Half - Original - Penting

Suppose we have a bunch of views that end up all needing the same bits of context data. How should we handle that?

There are a few different answers:

1. Is the data going to be needed by pretty much every page in your site? The answer is [context processors](https://docs.djangoproject.com/en/5.0/ref/templates/api/#django.template.RequestContext).
2. Is the data going to be needed in a large fraction of your site, but not everywhere and is expensive to evaluate? I’d recommend using [lazy evaluation in your context processor](https://stackoverflow.com/a/28146359/182604).
3. Is the data needed for a “component” that exists really at the template level, perhaps in a base template or is included in several templates? For example, it might be data needed for common elements that appear in a header or footer on lots of pages.

   In general this can be done most easily by using a [custom inclusion template tag](https://docs.djangoproject.com/en/5.0/howto/custom-template-tags/#inclusion-tags) which can load its own data — that way you don’t have to worry about changing view functions every time you include this component.

### Second Half - Make it as `context` helper

Them:
> But suppose none of these apply — we just have some common data that is used for a group of a pages. Perhaps we have an e-commerce site, and all the checkout pages have a common set of data that they need, without necessarily displaying it in the same way.

Mine, maksudnya:
> - template-nya berbeda.
> - `context` values-nya sama.

Them:
> For this, we can use the simple technique below of *pulling* out the code that returns the common data into a function:

```python
def checkout_start(request):
    context = {
        # etc
    } | checkout_pages_context_data(request.user)
    return TemplateResponse(request, "shop/checkout/start.html", context)


def checkout_pages_context_data(user):
    context = {}
    if not user.is_anonymous:
        context["user_addresses"] = list(user.addresses.order_by("primary", "first_line"))
    return context
```

Them:
> Just add `| checkout_pages_context_data(request.user)` into every view that needs it.

Them, jadinya gitu:
> This is a perfectly adequate technique that is very easy to use, easy to understand and flexible. You can add parameters to the function if necessary, such as the `user` object as above, and combine common sets of these helpers into bigger helpers, as per your requirements. And you can write tests for these helpers if they have any significant logic in them.

### Discussion: Helpers vs mixins - Lite

_Skipped_

```python
class CheckoutPageMixin:

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        user = self.request.user
        if not user.is_anonymous:
            context["user_addresses"] = list(user.addresses.order_by("primary", "first_line"))
        return context
```

_Skipped_

Mine, pokoknya gini:
> Wow bad code ieu.

Them, jadinya gitu:
> The simple solution is the best! (FBV for the winners.)

Mine:
> YES IT IS.

Them, interesting:
> This example is part of a larger principle for the best way to write views, and any similar functions:
> > Building up behaviour by explicitly **composing** smaller, testable units of functionality (whether functions or classes) is far better than building up behaviour via **inheritance**.
>
> For more on this, see Brandon Rhodes’ treatment of [The Composition Over Inheritance Principle](https://python-patterns.guide/gang-of-four/composition-over-inheritance/), which also mentions mixins.

Mine:
> oh itu makanya `pytest` kan ya.

## URL parameters in views - Lite

Them:
> As described in the [Django tutorial for views](https://docs.djangoproject.com/en/5.0/intro/tutorial03/) and the [request handling docs](https://docs.djangoproject.com/en/5.0/topics/http/urls/#how-django-processes-a-request), if you want to capture part of a URL to be used in a view function, you can do it by configuring your URLs.

Mine:
> - [x] `rfl`-keun, [request handling docs](https://docs.djangoproject.com/en/5.0/topics/http/urls/#how-django-processes-a-request), eta.
>   - > oh udah ketang: <https://github.com/bal-sm/repo-for-learning/blob/261716df4a3cf328704160de62026f024ead5742/systems/programming/python_django/Django-Documentation/URL-dispatcher.md>.

Them:
> - Let’s say we have an e-commerce site where we want to display products on individual pages.
>   - We want `/product/` to be the prefix for all these pages,
>   - and the next part to be the “slug” for the product
>     - — a URL-friendly version of the name (e.g `white-t-shirt` instead of “White T-Shirt”).
>
> We can do that as follows:

```python
# urls.py

from django.urls import path

from . import views

urlpatterns = [
    path('products/<slug:slug>/', views.product_detail, name='product_detail'),
]
```

```python
# views.py

def product_detail(request, slug):
    return TemplateResponse(request, 'shop/product_detail.html', {})
```

_Skipped, ykiyk, baca aja [di sini](https://docs.djangoproject.com/en/5.0/topics/http/urls/#path-converters)_

### Discussion: Generic code and function signatures - Lite - Modified

_Skipped_

Mine:
> Pokoknya based on code sebelumnya:

```python
# views.py

def product_detail(request, slug: str): # tuh `str`
    return TemplateResponse(request, 'shop/product_detail.html', {})
```

_Skipped lagi_

### Discussion: Type-checked parameters - Lite

Them:
> Of course, if we add type hints, wouldn’t it be even cooler if we could automatically ensure that the URL configuration matched the view function, both in terms of names and types of arguments?
>
> [`django-urlconfchecks`](https://github.com/AliSayyah/django-urlconfchecks/) will do exactly that! (Based on code I wrote, but nicely packaged by Ali Sayyah).

_Skipped CBV things_

Mine, pokoknya gini:
> Generic code is impossible. Apalagi di CBV di Django sekarang, soalnya teu puguh. Gitu we.

## Displaying a single database object - Lite

_Skipped, ykiyk_

```python
product = Product.objects.get(slug='some-product-slug')
```

---

cuman bisa jadi `Product.DoesNotExist`, makanya pake [`Http404` exception](https://docs.djangoproject.com/en/stable/topics/http/views/#django.http.Http404):

```python
try:
    product = Product.objects.get(slug=slug)
except Product.DoesNotExist:
    raise Http404("Product not found.")
```

---

tapi, bisa diringkas loh, pake [`get_object_or_404`](https://docs.djangoproject.com/en/5.0/topics/http/shortcuts/#get-object-or-404):

```python
# imports
from django.shortcuts import get_object_or_404

# in the view somewhere
product = get_object_or_404(Product.objects.all(), slug=slug)
```

---

Them:
> If the only thing we are going to do with the product object is render it in a template, then the final, concise version of our view will look like this:

```python
def product_detail(request, slug):
    return TemplateResponse(request, 'shop/product_detail.html', {
        'product': get_object_or_404(Product.objects.all(), slug=slug),
    })
```

### Discussion: Layering violations — shortcuts vs mixins - gini aja

`get_object_or_404` is an example of a “shortcut” function. [Django’s docs for shortcut functions](https://docs.djangoproject.com/en/5.0/topics/http/shortcuts/) defines them like this:
> The package `django.shortcuts` collects helper functions and classes that “span” multiple levels of MVC. In other words, these functions/classes introduce controlled coupling for convenience’s sake.

And the [tutorial](https://docs.djangoproject.com/en/stable/intro/tutorial03/#a-shortcut-get-object-or-404) has a helpful comment about them:
> **Philosophy**
>
> Why do we use a helper function `get_object_or_404()` instead of automatically catching the `ObjectDoesNotExist` exceptions at a higher level, or having the model API raise `Http404` instead of `ObjectDoesNotExist`?
>
> Because that would couple the model layer to the view layer. One of the foremost design goals of Django is to maintain loose coupling. Some controlled coupling is introduced in the `django.shortcuts` module.

_Skipped_

Mine:
> Pokoknya gini:
> only have local effects on your code
> In a Django project, tell-tale signs of inappropriately coupled code would include things like passing the request object around everywhere, especially into the model layer, or code outside the view layer that returns HTTP responses objects or generates HTML.

Them, biarin we, apa ya itu teh, aku newbie:
> (Some people think that the kind of coupling in `get_object_or_404` is always unacceptable, but I think that’s due to different expectations regarding service layers.)

_Skipped CBV things, wlek, panjang banget_

Them, pokoknya gini:
> So where did the design go wrong? (_design serba-serbi methods and class attributes secara implisit (kan yah?), gitu we dulu, maintenance and learning note_) Look back at the views provided by Django, and you’ll see it is simply carrying on the same pattern.
>
> This is a fundamental difference between a shortcut and a mixin. The shortcut is a convenient way to reduce some boilerplate with only local effects on your code, while mixins set up a pattern for your code which determines its structure — and not in a good way. The coupling becomes totally out of control.

Them, menarik, aku harus dengar:
> Brandon Rhodes has [an excellent discussion on mixins in his talk on Python anti-patterns](https://youtu.be/S0No2zSJmks?t=3095). He also specifically calls out Django CBV mixins (though he manages to avoid saying ‘Django’), and in my opinion his analysis is spot on.

### Discussion: Comparison to `DetailView` - Lite - gini aja

```python
class ProductDetailView(DetailView):
    template_name = 'shop/product_detail.html'
    queryset = Product.objects.all()
    context_object_name = 'product'

    def get_context_data(self):
        # ...
```

vs.

```python
'product': get_object_or_404(Product.objects.all(), slug=slug),
```

### Discussion: Convention vs configuration - Super Lite

Mine, TL;DR:
> Jadinya, gini, mending kita tulis aja segala hal kodenya, line-by-line (Function Based Views + configuration), daripada harus tau secara implisit of how things work, tau-tau aja `template_name`-nya di-setting kayak gitu, (CBV + convention like Ruby on Rails).

Baca lanjut aja [di sini](https://spookylukey.github.io/django-views-the-right-way/detail-view.html#discussion-convention-vs-configuration), banyak points yang aku langsung skip aja.

### Discussion: Static vs dynamic

_Skipped CBV thing_

Mine, jadi gini:
> `get_object_or_404(Product.objects.all(), …)`
>
> vs.
>
> `get_object_or_404(Product, …)`
>
> yang pertama dong.
>
> soalnya diubah (misal) jadi `Product.objects.visible()` itu gampang.

Mine, masalah CBV-nya, TL;DR:
> bikin ribet soalnya dari "a simple attribute", (static, `queryset = Product.objects.all()`), kalau harus get from `request`, jadi "an "implied" (wlek) method", (dynamic, `def get_queryset(): blablabla`), terus belum lagi kalau pake ditambahin methods yang pake waktu, jadinya ngaco soalnya "executed at module import time".

Mine, just a note:
> Yang "otoh"-nya aku skip, soalnya gak pake kode sebagai contoh.

### Discussion: Generic code and variable names

...

## Displaying a list of objects

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
> Ayo dong cepet ngerangkumnya. Gimana ya? Yuk bisa yuk.

Mine:
> ~~Ini gak "Mahmuda's version". Soalnya gak sopan, terus gak nambahin apa-apa.~~ Lite version.

## Source(s)

- [1]: [Django Views — The Right Way](https://spookylukey.github.io/django-views-the-right-way/).
  - > Thanks to Spookylukey!
