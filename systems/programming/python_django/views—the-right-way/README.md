# Django Views — The Right Way — Lite & Mahmuda's version

Mine:
> udah we kodenya aja yang ditulis di sini, biar serasa "udah dibaca da ini teh".

## Intro - Lite

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

## The Right Way - Lite

### The Pattern - Lite

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

### The Explanation - Lite

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

### Discussion: Starting points - Lite

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

## Adding data to a template - Lite

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

### Discussion: Embarrassingly simple? - Lite

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

### Discussion: Boilerplate - Lite

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

## Common context data - Lite

To me:
> ~~**HADE PISAN IH IEU**, **rang** **kum**.~~ Udah.

### First Half - Original - Penting

Suppose we have a bunch of views that end up all needing the same bits of context data. How should we handle that?

There are a few different answers:

1. Is the data going to be needed by pretty much every page in your site? The answer is [context processors](https://docs.djangoproject.com/en/5.0/ref/templates/api/#django.template.RequestContext).
2. Is the data going to be needed in a large fraction of your site, but not everywhere and is expensive to evaluate? I’d recommend using [lazy evaluation in your context processor](https://stackoverflow.com/a/28146359/182604).
3. Is the data needed for a “component” that exists really at the template level, perhaps in a base template or is included in several templates? For example, it might be data needed for common elements that appear in a header or footer on lots of pages.

   In general this can be done most easily by using a [custom inclusion template tag](https://docs.djangoproject.com/en/5.0/howto/custom-template-tags/#inclusion-tags) which can load its own data — that way you don’t have to worry about changing view functions every time you include this component.

### Second Half - Make it as `context` helper - Lite

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

### Discussion: Static vs dynamic - Lite

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

### Discussion: Generic code and variable names - Lite

_Skipped CBV things_

Them, pokoknya gini:
> The issue here is again the problem of generic code. For the view code, it’s an unusually tricky problem — you are inheriting from generic code that doesn’t know a better name than object. However, **your** code is not generic, and could have chosen a much better name, but your code isn’t “in charge”.

Them, terus gini:
> This is a problem that is specific to **class based** generic code. If you write [function based generic code](https://spookylukey.github.io/django-views-the-right-way/delegation.html#function-based-generic-views), the problem doesn’t exist, because you don’t inherit local variable names.

Mine:
> barina ge gak penting, eta "function based generic code" teh. baca aja nanti di [sini](#custom-logic-at-the-start--delegation).

Them, penting lagi:
> We can think of this in terms of the “framework vs library” debate. Frameworks impose a structure on your code, a mould that you have to fit into, where your function gets called by the framework. In contrast, libraries leave you in control, you choose to call the library functions in the structure you see fit. Both have their place, but if we accept the constraints of a framework we should be sure that it is worth it.

Mine:
> makanya gening dari kode jadi real object yang kepegang, wow.

## Displaying a list of objects - Lite

_Skipped explanation_

Mine:
> gini aja:

```python
def product_list(request):
    return TemplateResponse(request, 'shop/product_list.html', {
        'products': Product.objects.all(),
    })
```

---

_Skipped lagi_

Mine:
> Kalau dipisah-pisah memakai paging, [`Paginator`](https://docs.djangoproject.com/en/5.0/topics/pagination/#using-paginator-in-a-view-function), jadinya gini:

```python
from django.core.paginator import Paginator

def product_list(request):
    products = Product.objects.all()
    paginator = Paginator(products, 5)  # Show 5 products per page.
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return TemplateResponse(request, 'shop/product_list.html', {
        'page_obj': page_obj,
    })
```

Mine:
> Baca, [`Paginator.get_page`](https://docs.djangoproject.com/en/stable/ref/paginator/#django.core.paginator.Paginator.get_page) yang akhirnya me-`return` [`Page`](https://docs.djangoproject.com/en/5.0/ref/paginator/#page-class).

Them:
> Your real view might have additional needs, like filtering and ordering. These can be handled by responding to query string parameters and modifying your `products` `QuerySet` above.

---

_Skipped explanation_

Mine:
> bisa dijadiin utility / helper kayak gini:

```python
def paged_object_list_context(request, products, paginate_by=10):
    paginator = Paginator(products, paginate_by)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return { 'page_obj': page_obj }
```

Mine, just a note and a TODO:
> gini aja kan ya? udah. disuruh sama bestie. coba cobain.

---

Them, penting:
> There is a bit of boilerplate here for doing pagination. If you have a standardised convention of using page as your query string parameter for paging, you could pull some of this boilerplate out into a utility like `paged_object_list_context` (left as an exercise for you) to produce something a bit shorter:

```python
def product_list(request):
    products = Product.objects.all()
    context = {
       # ...
    } | paged_object_list_context(request, products, paginate_by=5)
    return TemplateResponse(request, 'shop/product_list.html', context)
```

### Discussion: Discovering re-usable units of code - Lite and personalized

Why FBV better (sic) lagi:
- Membuat kita mahir dalam menulis kode sendiri
  - daripada memakai CBV, yang (sic, indo tapi) memaksa kita untuk menyesuaikan pengetikan kode sesuai struktur CBV tersebut
- `paged_object_list_context` ✔️✔️✔️
  - lebih panjang sedikit dari `ListView`
  - cuman bikin kita punya kontrol penuh terhadap `view` function kita
  - lebih readable
  - extremely easy to debug
  - extremely easy for further customization
  - > You also have a utility that is separately testable
    - > with a well-defined interface
      - > that means its very unlikely to interact badly with the different contexts you might use it in.
- [`ListView`](https://docs.djangoproject.com/en/stable/topics/pagination/#paginating-a-listview) is bad!
  - > di-skip aja, baca aja di-[sini](https://spookylukey.github.io/django-views-the-right-way/list-view.html#discussion-discovering-re-usable-units-of-code).
- `Paginator` ✔️✔️✔️
  - > which is a great example of the kind of re-usable functionality that you should be looking for in your own projects.
  - > It has a single responsibility — it handles pagination.
  - > It has a clearly defined interface that can be documented and understood, and separately tested, and used outside of a web context.
- Contoh lanjut-nya buat inspirasi:
  - `ExcelFormatter`
  - `OdsFormatter`
    - > simple abstractions over creating spreadsheets
    - > that share an interface so that the user can choose between `XLS` or `ODS` files
  - > small HTTP-level utilities that do redirections or closing of popups
    - > wow siah eta, popups cenah.
  - > small glue utilities that
    - > encapsulate some small convention or decision
      - > that needs to be applied in several places.
- Again, `Mixins` wlek
  - > di-skip
  - > cuman baca [ini](https://youtu.be/S0No2zSJmks?t=3116), sama ini, [The Composition Over Inheritance Principle](https://python-patterns.guide/gang-of-four/composition-over-inheritance/#dodge-mixins). soon. TODO. sayanggg.

## Custom logic at the start — delegation - Mahmuda's version

The next few pages address the problem of needing to re-use some logic from one view in another view.

- We’ve thought about
  - how we can use utility functions and classes,
  - but sometimes these don’t cut it
    - sometimes the majority of the body of the view needs to be re-used.
  - How can we do that with FBVs?

- Continuing our [example](#displaying-a-list-of-objects---lite) of a list of products,
  - let’s add a variation:
  - As well as the main product list page,
    - we’ve also got a “special offers” page —
    - or rather, a set of them, because we have a `SpecialOffer` model that allows us to have many different ones.
      - > maksudnya, "a set of them" teh "sekumpulan penawaran".
  - Each of these pages:
    - needs to display some details about the special offer,
    - and then the list of products associated with that offer.
  - Our feature requirements say this product list should have
    - **all** the features of the normal product list:
      - filtering,
      - sorting,
      - etc.
    - so we want to re-use the logic as much as possible.
  - > ini (gaya ngerangkum gini) teh bagus gak ya, huft, meta `rfl`.

- So our view will need to do two things:
  - it will show a single object,
  - and also shows a list.
  - The answer of how to do two things with FBVs is: ***do two things***.
    - No special tricks needed for that. Let’s start with a simple version of our view:

```python
# urls.py

from . import views

urlpatterns = [
    path('special-offers/<slug:slug>/', views.special_offer_detail, name='special_offer_detail'),
]
```

```python
# views.py

def special_offer_detail(request, slug):
    special_offer = get_object_or_404(SpecialOffer.objects.all(), slug=slug)
    return TemplateResponse(request, 'shop/special_offer_detail.html', {
        'special_offer': special_offer,
        'products': special_offer.get_products(),
    })
```

Mine:
> - it will show a single object -> `special_offer` tea.
> - and also shows a list -> `products` tea.

Mine:
> Oh iya ngerti aing, kan kalo `product_list`, langsung aja semua `Product`, kalo `special_offer_`**`detail`**, itu asalnya klik dulu suatu `SpecialOffer` object, di suatu view mana gitu loh bebas, baru ke `special_offer_detail` itu.

Them:
> I’ve assumed the `SpecialOffer.get_products()` method exists and returns a `QuerySet`. If you have an appropriate `ManyToMany` relationships the implementation might be as simple as `return self.products.all()`, but it might be different.

Mine, note for my own personal project:
> tuh ih bikin dulu aja views-nya, terus baru bikin `Model`'s methods-nya

- But now we want to change this view
  - to re-use the logic in our normal `product_list` view, whether it is:
    - filtering/
    - sorting/
    - paging or
    - anything else;
    - it has built up by now
      - (which I’ll represent using the function `apply_product_filtering()` below).
  - How should we do that?

- One way would be to do what we did in [Common context data](#common-context-data---lite):
  - move part of the existing `product_list` view
    - into a function that:
      - takes some parameters and
      - returns the data to be added to the `context`.
  - However, sometimes that interface **won’t** work.
    - For instance, if the view decides that
      - in some cases it will return _a completely different kind of response_:
        - (perhaps a redirection, for example)
        - then the common logic won’t fit into that mould.

---

- Instead we’ll use what I’m going to call **delegation**:
  - our entry-point view will delegate
    - the rest of the work -to-> another function.

- To create this function,
  - look at our old `product_list` view and
  - apply [parameterisation](https://www.toptal.com/python/python-parameterized-design-patterns).

- The extra parameters we need to pass are:
  - the product list `QuerySet`;
  - the name of the template to use; and
  - any extra context data.
  - With those in place we can easily pull out a `display_product_list` function, and
    - call it from our two entry-point view functions:

```python
def product_list(request):
    return display_product_list(
        request,
        queryset=Product.objects.all(),
        template_name='shop/product_list.html',
    )


def special_offer_detail(request, slug):
    special_offer = get_object_or_404(SpecialOffer.objects.all(), slug=slug)
    return display_product_list(
        request,
        context={
            'special_offer': special_offer,
        },
        queryset=special_offer.get_products(),
        template_name='shop/special_offer_detail.html',
    )


def display_product_list(request, *, context=None, queryset, template_name):
    if context is None:
        context = {}
    queryset = apply_product_filtering(request, queryset)
    context |= paged_object_list_context(request, queryset, paginate_by=5)
    return TemplateResponse(request, template_name, context)
```

Them, a note:
> For those unfamiliar with the signature on `display_product_list`:
> - the arguments after * are [keyword only arguments](https://lukeplant.me.uk/blog/posts/keyword-only-arguments-in-python/).
>   - > - [ ] `rfl`-keun ieu.
> - `queryset` and `template_name` lack defaults (because we don’t have any good defaults) which forces calling code to supply the arguments.
> - for `context` we do have a sensible default, but also need to avoid the [mutable default arguments gotcha](https://docs.python-guide.org/writing/gotchas/#mutable-default-arguments), so we use `None` in the signature and change to `{}` later.
>   - > - [ ] alah siah ieu, ada kan yah?

Them:
> At the template level, we’ll probably do a similar refactoring, using [`include`](https://docs.djangoproject.com/en/5.0/ref/templates/builtins/#include) to factor out duplication.

---

Mine:
> Addition yang bawah ini, soalnya ngegantung eta, `apply_product_filtering`, gak dijelasin.

```python
def apply_product_filtering(request, queryset):
    query = request.GET.get('q', '').strip()
    if query:
        queryset = queryset.filter(name__icontains=query)
    return queryset
```

Mine, deui, learning note:
> ih gimana sih itu teh?

Mine, TODO, ih:
> template-nya masukin dong ih, atau referensi ke sana.

---

Them, cenah:
> That’s it! See below for some more discussion about how this delegation pattern might evolve. Otherwise, onto [Custom logic in the middle — dependency injection](https://spookylukey.github.io/django-views-the-right-way/dependency-injection.html).

### Discussion: Function based generic views - Mahmuda's version

- What happens if you keep going with this parameterisation pattern?
  - Let’s say you have not one model,
    - but lots of models
  - where you want to display a list,
    - with the same kind of filtering/sorting/paging logic applied?

- You might end up with
  - an `object_list` function and
  - a bunch of parameters, instead of `product_list`.
  - _In other words_, you’ll end up with your own function based generic views, [just like the ones that used to exist in Django](https://django.readthedocs.io/en/1.4.X/topics/generic-views.html#generic-views-of-objects).

Grabbed from the docs:

```python
from django.conf.urls import patterns, url, include
from django.views.generic import list_detail
from books.models import Publisher

publisher_info = {
    "queryset" : Publisher.objects.all(),
}

urlpatterns = patterns('',
    (r'^publishers/$', list_detail.object_list, publisher_info)
)
```

Them, opinion onion:
> Isn’t that a step backwards? I’d argue no. With the benefit of hindsight, I’d argue that the move from these function based generic views to class based generic views was actually the backwards step.

But that is in the past. Looking forward, the generic views you might develop will be better than both Django’s old generic FBVs and the newer generic CBVs in several ways:

- They will have all the functionality you need built-in. ✔️
- Importantly, they will have none of the functionality you don’t need. ✔️
- You will be able to change them _whenever you want_, _however you want_. ✔️

Them, opinion:
> In other words, they will be both specific (to your project) and generic (across your project) in all the right ways. They won’t suffer from Django’s limitations in trying to be all things to all men.

- As FBVs they will probably be better for you than your own custom CBVs:
  - They will have a well defined interface,
    - which is *visible* right there in the function signature,
      - which is great for *usability*.
  - The generic code will be properly separated from the specific.
    - For example, inside your `object_list` function,
      - local variable names will be very generic,
      - but these won’t bleed out into functions that might call `object_list`,
        - > `list_detail.object_list`
      - because you don’t inherit local variable names (in contrast to classes where you do inherit instance variable names).
  - At some point you might find you have _too many parameters_ to a function.
    - But this is a good thing.
    - ~~For your class-based equivalent, the number of extension points would be the same, but hidden from you in the form of lots of mixins each with their own attributes and methods~~.
      - > who cares?
    - With the function, your problem is more visible, and can prompt you to factor things out.
      - For example, if you have several parameters related to filtering a list, perhaps you actually need to invent a `Filterer` class?

### Discussion: Going further with generics - Mahmuda's version

If you have a large number of views that are very repetitive, you may continue this pattern even further. Examples of projects that have done this are:

- [The Django admin](https://docs.djangoproject.com/en/5.0/ref/contrib/admin/)
- [Django Rest Framework](https://www.django-rest-framework.org/)

Both of these have their own forms of “Class Based Views”, but actually provide higher level functionality in terms of **sets of views** rather than just individual views.

I’ve had good experiences with both, and here are my ideas about why they have succeeded:

- They both provide a fairly narrow set of views.
  - Both are essentially CRUD based, and
  - this means that the views are quite constrained in what they do.
- This is in contrast to a classic web app
  - where a single view can do a very wide range of things, and
  - could easily combine multiple different things.
- Due to this constraint,
  - they can provide *abstractions* that are **higher level** than a single view
    - (for example, the `ModelAdmin` and the `ViewSet` classes).
      - > wow.
  - You can get a very large amount of functionality out of these classes “for free”
    — with just a small amount of declarative customisation.
      - So when you need to go further and write some code, you are still way ahead of where you would have been without them.
- They provide a lot of their functionality
  - in terms of **composing** behaviour defined in other objects and classes,
    - rather than by **inheriting** from mixins.
    - For example,
      - the Django admin has behaviour defined in other things like `Form` and `ListFilter` that are referenced from your `ModelAdmin`;
      - DRF has separate classes for serializers, permissions and filtering that are referenced from your `ViewSet`.

### Discussion: Copy-Paste Bad, Re-use Good? - dahlah

_Skipped, baca aja [langsung](https://spookylukey.github.io/django-views-the-right-way/delegation.html#discussion-copy-paste-bad-re-use-good), penting.

Them, cuman ini:
> Before you can abstract commonality, you actually need at least two examples, preferably three, and abstracting before then is premature. The commonalities may be very different from what you thought, and when you have enough information to make that decision you might decide that it’s not worth it. So avoiding all duplication at any cost is not the aim we should have.

Mine:
> Jadi reuse aja terus kode teh! Sebelum, harus, di, refactor, biar, samaan yang dipakenya. Camkan.

### Discussion: Multiple mixins? - Lite

```python
from django.views.generic import ListView
from django.views.generic.detail import SingleObjectMixin

from shop.models import SpecialOffer


class SpecialOfferDetail(SingleObjectMixin, ListView):
    paginate_by = 2
    template_name = "shop/special_offer_detail.html"

    def get(self, request, *args, **kwargs):
        self.object = self.get_object(queryset=SpecialOffer.objects.all())
        return super().get(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['special_offer'] = self.object
        return context

    def get_queryset(self):
        return self.object.products.all()
```

vs.

```python
from django.core.paginator import Paginator
from django.shortcuts import get_object_or_404
from django.template.response import TemplateResponse

from shop.models import SpecialOffer


def special_offer_detail(request, slug):
    special_offer = get_object_or_404(SpecialOffer.objects.all(), slug=slug)
    paginator = Paginator(special_offer.products.all(), 2)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return TemplateResponse(request, 'shop/special_offer_detail.html', {
        'special_offer': special_offer,
        'page_obj': page_obj,
    })
```

_Skipped many things, baca [langsung](https://spookylukey.github.io/django-views-the-right-way/delegation.html#discussion-multiple-mixins)_

## Custom logic in the middle — dependency injection - Mahmuda's version but cuman

Them:
> What happens if we have code that is largely common, but want to do something different “in the middle”?

Them, skip:
> We are getting into more advanced territory now, so this page is heavier than the ones that have come before, but the techniques here are also very powerful and widely applicable.

Them:
> Continuing [our example of two different views both featuring lists of products](https://spookylukey.github.io/django-views-the-right-way/delegation.html), let’s add a new requirement, imitating the kind of complexity you will likely encounter in real projects.

- Instead of using Django’s `QuerySet`s as the basis for our list of products,
  - we have to use a different API.
  - Maybe it is:
    - a third party HTTP-based service, or
    - our own service,
    - but our entry point is a function that doesn’t take a `QuerySet` as an input.
  - Perhaps like this:

```python
def product_search(filters, *, page=1):
    return _search(filters, Product.objects.all(), page=page)
```

with:

```python
def _search(filters, products, *, page=1):
    if Filter.NAME in filters:
        products = products.filter(name__icontains=filters[Filter.NAME])
    if Filter.COLOR in filters:
        products = products.filter(colors__name__icontains=filters[Filter.COLOR])

    # paging
    start = (page - 1) * PAGE_SIZE
    products = list(products.order_by('name')[start:start + PAGE_SIZE])
    return products
```

Mine, cuman:
> cuman ini tetep `QuerySet`, tapi digimanain gitu loh. udah we ya, kode-kode-nya aja.

and

```python
class Filter:
    NAME = 'name'
    COLOR = 'color'


PAGE_SIZE = 5
```

---

Mine:
> nah terus ada buat special offers:

```python
def special_product_search(filters, special_offer, *, page=1):
    return _search(filters, special_offer.get_products(), page=page)
```

---

- In addition, we have a further requirement:
  - for our special offer page,
    - after retrieving the list of products that will be displayed,
    - we need to do
      - some database logging to
        - record the user,
        - the special offer and
        - the products that were displayed.

---

Mine, learning note:
> ini pusing banget ih ngerangkum soalnya panjang terus spesifik, terus custom code juga ternyata dalem -> <https://github.com/spookylukey/django-views-the-right-way/blob/master/code/the_right_way/dependency_injection>
>
> a bunch of slideshows ya di sana mah.

---

Them, common programming situations:
> _How can we execute some custom logic in the middle of some common logic?_

- [202408041752.3], Them, diringkas:
> - Pake [parameterisation](https://www.toptal.com/python/python-parameterized-design-patterns)
>   - > cenah, we need a parameter that will capture “what we need to do in the middle”.
> - Jadi gini:
>   1. factoring `product_list` view
>   2. the `display_product_list` function it delegates to.
>      - cuman gini:
>        1. It no longer takes a `queryset` parameter, but a `searcher` parameter.
>        2. It has to be adapted to use this `searcher` parameter instead of manipulating a passed in `QuerySet`.

```python
from somewhere import product_search # * [202408041752.1]

def product_list(request):
    return display_product_list(
        request,
        searcher=product_search, # * [202408041752.1]
        template_name='shop/product_list.html',
    )

def display_product_list(request, *, context=None, searcher, template_name): # * tuh `searcher`, [202408041752.1]
    if context is None:
        context = {}
    filters = collect_filtering_parameters(request)
    try:
        page = int(request.GET['page'])
    except (KeyError, ValueError):
        page = 1
    context['products'] = searcher(filters, page=page) # * [202408041752.1], [202408041752.2]
    return TemplateResponse(request, template_name, context)
```

- [202408041752.1]: “first class functions”
  - > To explain a little: here we passed the `product_search` function into `display_product_list` as the parameter `searcher`. This feature is called “first class functions” — just like you can pass around any other data as a parameter, you can pass around functions too. That is the heart of the technique here, allowing us to insert our custom logic into the middle of the common logic.
  - > meta `rfl`, gimana ya ini teh, bagus gak? the notes. learning note.
  - [202408041752.2]: tah ini di mana “dependency injection”-nya teh.

Lanjut [202408041752.3] tea:
> - Jadi gini:
>   ...
>   3. But what about the `special_offer_detail` view?
>      - > If we pass `searcher=special_product_search`, inside `display_product_list` we’ll have a problem. Our passed in function gets called like this:

```python
searcher(filters, page=page)
```

Lanjut [202408041752.3]:
>
> 4. But that doesn’t match the signature of `special_product_search`, which has an extra parameter.
>    - > How can we get that parameter passed?
>    - Jawaban: `special_product_search_adaptor`

- You might be tempted to make `display_product_list` accept the additional parameters needed,
  - but this is clunky — we’ll have to pass these parameters that it doesn’t care about,
    - just so that it can pass them on to somewhere else.
    - Plus it is unnecessary.

Mine, maintenance:
> masukin geura code butut nya kayak gimana

Lanjut [202408041752.3]:
>
> 5. Instead, what we do is make `special_offer_detail` provide an adaptor function, `special_product_search_adaptor`
>    - that matches the signature that `display_product_list` expects for `searcher`.
>    - Inside the adaptor function, we’ll call the `special_product_search` function the way it needs to be called.
>    - While we’re at it, we can do our additional requirements too.

```python
from somewhere import special_product_search

from somewhere import log_special_offer_product_view # * misalan.

def special_offer_detail(request, slug):
    special_offer = get_object_or_404(SpecialOffer.objects.all(), slug=slug)

    def special_product_search_adaptor(filters, page=1): # * [.1]
        products = special_product_search(filters, special_offer, page=page) # * tuh `special_offer`-nya, [.3]
        log_special_offer_product_view(request.user, special_offer, products)
        return products

    return display_product_list(
        request,
        context={
            'special_offer': special_offer,
        },
        searcher=special_product_search_adaptor,
        template_name='products/special_offer_detail.html',
    )
```

There are some important things to note about this:
- [.1]: We defined our adaptor function `special_product_search_adaptor` inside the body of the main view.
  - > This is important for the functionality that follows. (There are other ways to do it but this is the simplest.)
- [.2]: We made its signature match the one expected by `display_product_list`.
  - > TODO, refer di sana (newer rangkuming engine), ke correct code, pusing ih.
- [.3]: Our adaptor function has access to
  - the `special_offer` object from the enclosing scope, and also
  - `request`.
  - > These objects “stay with it” when the adaptor function gets passed to `display_product_list`, so they are able to use them despite not having been passed them as a normal arguments.
  - > Functions that behave in this way are called “closures” — they capture variables from their enclosing scope.

Them, skip aja kalo udah ngeuh:
> - This powerful technique has lots of great advantages.
>   1. For one, `display_product_list` never needs to be concerned with all of this.
>      - We don’t have to modify its signature,
>      - nor the signature of the `searcher` parameter it expects.
>   2. Also, this works really well with static analysis,
>      - like the linters that are built-in to many IDEs
>        - which can point out undefined names and so on.

Them, cenah, baca lanjut:
> Closures are a concept that some find intimidating, but they are extremely useful in a wide variety of programming situations. If you found the above confusing, have a look at this [Python closures primer](https://www.programiz.com/python-programming/closure) and then come back to the more complex example here.

Them, next part:
> In our theme of re-using logic, I want to cover [Preconditions](https://spookylukey.github.io/django-views-the-right-way/preconditions.html), but before that we’re going to go back to some basics, the first of which is [Redirects](https://spookylukey.github.io/django-views-the-right-way/redirects.html) and then [Forms](https://spookylukey.github.io/django-views-the-right-way/forms.html).

### Note: terminology - Mahmuda's version

- The How
  - > In OO languages, the standard solution to this problem is the “strategy pattern”. That involves creating an object which can encapsulate the action you need to take.
- “first class objects“
  - > In Python, functions are “first class objects“ i.e. objects that you can pass around just like every other type of value. So we can just use “functions” where we need “the strategy pattern”, particularly if our strategy has only one part to it.
    - > me: I need to push this thing to my "alam bawah sadar ngoding".
  - > If you have more than one entry point that you need to bundle together, a class can be helpful.
    - > me: Tuh da deui, `class`-ing is a second thought.
- “dependency injection”
  - > A slightly more general concept is “dependency injection”. If you have some code that needs to do something,
    - i.e.
      - it has a dependency on some other code,
      - instead of depending directly,
      - the dependency gets injected from the outside.
    - If our dependency is a just a single function call,
      - we can simply accept a function as a parameter.
        - > `searcher=special_product_search_adaptor` tea.
    - If our dependency is a set of related function calls,
      - we might want an object with methods as the parameter.
        - > `searcher=search.for_special_product`, gitu we lah.
- “dependency injection frameworks/containers”
  - > (Often you will hear the term “dependency injection” being used for things that go one step further, and inject dependencies **automatically** in some way. I call these “dependency injection frameworks/containers”. Outside of [pytest’s fixtures](https://docs.pytest.org/en/latest/fixture.html) I have not yet found a need or desire for these in Python.)
    - > `def test_something(fixture_something)`, tau-tau `fixture_something` udah dimasukin aja.

Them, cenah:
> So, we can call this pattern “first class functions”, or “callbacks”, “strategy pattern” or “dependency injection”. But dependency injection is clearly the coolest sounding, so I used that in the title.

### Discussion: Dependency Injection vs inheritance - TBA

```python
class ProductSearchBase(TemplateView):
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        filters = collect_filtering_parameters(self.request)
        try:
            page = int(self.request.GET['page'])
        except (KeyError, ValueError):
            page = 1
        context['products'] = self.product_search(filters, page=page)
        return context

    def product_search(self, filters, page=1):
        raise NotImplementedError()
```

then,

```python
class SpecialOfferDetail(ProductSearchBase):
    template_name = 'shop/special_offer_detail.html'

    def get(self, request, *args, **kwargs):
        special_offer = get_object_or_404(SpecialOffer.objects.all(), slug=kwargs['slug'])
        self.special_offer = special_offer
        return super().get(request, **kwargs)

    def product_search(self, filters, page=1):
        products = special_product_search(filters, self.special_offer, page=page)
        log_special_offer_product_view(self.request.user, self.special_offer, products)
        return products

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['special_offer'] = self.special_offer
        return context
```

Me:
> What. The. Fuck.

..., TBA.

Mine, my thoughts after baca ini, cool:
> - Makanya gening 3D real touchable structure made from the biggest upgrade of programming tea.
>   - Same code (declaration, definition) over and over won't be excruciating ever again.

## Redirects - Mahmuda's version

- To implement redirects in Django, you need to know how they work in HTTP.
- In HTTP, a redirect is an HTTP response
  - with a status code in the 300-399 range, and
  - a `Location` header that tells a browser which URL to go to.
  - If your view returns a response like this,
    - the browser will immediately make another request, to the specified URL.
- The [different 3XX codes have different meanings](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#3xx_Redirection) — make sure you use the right one.
  - > `rfl`-in.
- That is 95% of what you need to know at the HTTP level.
  - In Django, the most common functionality has been wrapped up for you in [`HttpResponseRedirect`](https://docs.djangoproject.com/en/5.0/ref/request-response/#django.http.HttpResponseRedirect).
  - So this view, for example, does an unconditional, temporary redirect:

    ```python
    def my_view(request):
        return HttpResponseRedirect('/other/url/', status=307)
    ```

- In addition, Django provides some shortcuts:
  - [`redirect`](https://docs.djangoproject.com/en/5.0/topics/http/shortcuts/#redirect)
    - a utility that
      - returns an HTTP response object and
      - has built-in logic for redirecting to named views,
      - and other things.
  - [`RedirectView`](https://docs.djangoproject.com/en/stable/ref/class-based-views/base/#redirectview)
    - — a class that provides an entire view that does redirection, and
    - has a few neat features like:
      - being able to look up view by name,
      - including arguments from a path, and also
      - copy the query string.
    - > I (They) **recommend** using this if the only thing that your view does is a redirect.
      - > Otherwise just use `HttpResponse` objects directly.
    - > me: pake ini sajalah.
    - For example, if you have an old URL at `/old-path/<number>/` and want to permanently redirect it to `/new-path/<number>/`, you can use do it from `urls.py` like this:

      ```python
      urls = [
          path(
              "old-path/<int:pk>/",
              RedirectView.as_view(
                  pattern_name="my_view",
                  permanent=True,
                  query_string=True,
              ),
          ),
          path("new-path/<int:pk>/", views.my_view, name="my_view"),
      ]
      ```

Them, next part:
> That’s it! On to [Forms](https://spookylukey.github.io/django-views-the-right-way/forms.html).

### Not added yet child sections

- Discussion: CBV configuration in `urls.py`
- Discussion: FBV configuration in `urls.py`
  - > why ini teh?
  - Additional keyword parameters
  - Mass-produced views — “view factories”

TBA, meureun.

Mine:
> not really a concern, kata aku mah.

## Forms - Mahmuda's version

- The fundamental pattern for a view that handles a form
  - is covered fully in the [Django form docs](https://docs.djangoproject.com/en/stable/topics/forms/#the-view),
  - > so I don’t have much to add, except a few notes:
- You don’t need to use `FormView`, and I recommend you don’t.
  - > me: tulis-tulis aja cara kerja `Form` class ke `view` function-nya.
- You can use `Form`
  - It’s an API that provides a very helpful set of behaviours (validation etc.),
- But you don’t actually need it (`Form`).
  - > me: tapi ngapain gak dipake, kan ya.
  - It’s entirely possible to build forms in Django without it:
    - You need to know how forms work at the [HTML level](https://developer.mozilla.org/en-US/docs/Learn/Forms), and
    - you need to process:
      - [request.GET](https://docs.djangoproject.com/en/5.0/ref/request-response/#django.http.HttpRequest.GET) or
      - [request.POST](https://docs.djangoproject.com/en/5.0/ref/request-response/#django.http.HttpRequest.POST)
      - yourself to get the submitted data and do something with it.
    - Normally, this would be very tedious compared to using `Form`,
      - but in some cases it will be better.
      - For example, if you have a page with dynamically generated controls (e.g. lots of buttons or input boxes) it can be easiest to build them up and process them without using `Form`.
- If you need:
  - multiple buttons on the same form,
    - that do different things,
  - THEN, you need to understand how this works at the HTML level.:
    1. The button that is pressed becomes a “successful” control,
    2. which means the `request.POST` (or `request.GET`) dictionary
       - will get an entry with that control’s `name` attribute.
  - So it looks like this:
    - Template:

      ```html
      <form action="" method="POST">
          {% csrf_token %}
          {{ form }}
          <input type="submit" name="save" value="Save">
          <input type="submit" name="preview" value="Preview">
      </form>
      ```

    - View:

      ```python
      def my_view(request):
          if request.method == 'POST':
              if 'preview' in request.POST:
                  # Do preview thing...
      ```

    - > You may have to do something similar for multiple forms on one page.

Them:
> That’s it! Next up: [Preconditions](https://spookylukey.github.io/django-views-the-right-way/preconditions.html).

### Discussion: Complex form cases - Mahmuda's version

- Why not `FormView`?
  - > skip: Of all the CBVs, it is perhaps the most tempting, due to the control flow boilerplate that it eliminates. But overall, I still feel it is not worth it.
    - > alias: butut.
  - > skip part bawah ini:
  1. First, it requires you to know and use a second API (`get_form_class`, `form_valid`, `get_initial` etc.). All of these are more awkward to use than just using `Form` directly.
  2. It also makes some relatively common things much harder to do, and provides a very bad starting point for most customisations.
     - For example,
       1. if you find you have a page that has two forms on it (perhaps alternative flows that the user can choose between), `FormView` will cause you lots of pain.
       2. Or if you have form handling as well as something else (such as a list of items), you will be in confusion if you are trying to use `FormView`, even more so if you’ve forgotten how to use the `Form` API directly.
       3. Another example that comes up quite frequently, and described above, is when you need multiple different submit buttons which take different actions. This is an easy thing in HTML/HTTP, and easy if you are using `Form` directly and in charge of the control flow yourself, but horrible if you are trying to fit it into `FormView`.
  3. Finally, the way that `FormView` obscures the flow control can be disastrous:

     > In 2016 some Django core developers took on the task of refactoring a function based form view (the password reset views) to use `FormView` view. In the process, the checking of the “magic link” token was accidentally moved to a branch such that all security was effectively disabled — a trivial curl command enabled you to reset anyone’s password to anything you liked.

     Them, if you care:
     > Such a mistake would have been painfully obvious in the FBV, but in the CBV version, despite being authored by one core developer and reviewed by another, it went unnoticed and was committed to the master branch. It was [thankfully noticed](https://groups.google.com/d/msg/django-developers/HUZySAw43uE/RD4ifBLPBgAJ) before the next release, but it highlights just how badly the use of mixins for flow control obscures your code and makes reasoning about it a nightmare.

## Preconditions - Mahmuda's version

Mine:
> ih siah penting banget ini.

- When writing views,
  - a common situation is that you have some checks
    - that need to be done:
      - at the *beginning* of a view
      - *before* the main logic, and
      - several views _might share_ the same checks.
    - If the check fails
      - you might want to redirect the user
        - to a different page,
        - but other options are possible, such as displaying a message
          - (perhaps using the [messages framework](https://docs.djangoproject.com/en/5.0/ref/contrib/messages/)).

Python “decorators” are a perfect match for these kind of things.

Them, recommending, cenah:
> - If you haven’t used decorators at all before, I’d recommend this [Primer on Python Decorators](https://realpython.com/primer-on-python-decorators/).
>   - If you just want to apply an existing decorator to a view, that’s very easy, but a good understanding of what is going on is necessary if you want to be able to implement them.
>   - Plus, you’ll get a huge amount of benefit in other ways from this very general Python technique.

1. First let’s look at our starting point.
   - We have a page that should only be accessible to ‘premium’ users.
   - If, somehow, a non-premium user:
     1. gets the link to the page,
     2. they should be redirected to their account page,
     3. and also shown a message.
   - It might look like this:

     ```python
     def my_premium_page(request):
         if not request.user.is_premium:
             messages.info(request, "You need a premium account to access that page.")
             return HttpResponseRedirect(reverse('account'))
         return TemplateResponse(request, 'premium_page.html', {})
     ```

2. Now, we want to re-use those first 3 lines of logic.
   - The neatest way is to put them in a decorator,
   - which we will use like this:

     ```python
     @premium_required
     def my_premium_page(request):
         return TemplateResponse(request, 'premium_page.html', {})
     ```

3. To understand how to implement a decorator,
   - it’s often useful to remember what decorator syntax is doing.
   - The long-hand way of defining `my_premium_page`, equivalent to the above, is like this:

     ```python
     def my_premium_page(request):
         return TemplateResponse(request, 'premium_page.html', {})

     my_premium_page = premium_required(my_premium_page)
     ```

   - In other words, `premium_required` is
     - a function that takes a view function as input,
     - and returns a new, replacement view function as output.
       - The view function
         - it returns will wrap {the original view function}.
         - In our case, it will also add some additional checks and logic, and
         - in some cases
           - (where the user is not a premium user),
           - it will decide to bypass the original view function and return its own response.

4. So the implementation of `premium_required` will look like this:

   ```python
   import functools

   def premium_required(view_func):

       @functools.wraps(view_func)
       def wrapper(request, *args, **kwargs):
           if not request.user.is_premium:
               messages.info(request, "You need a premium account to access that page.")
               return HttpResponseRedirect(reverse('account'))
           return view_func(request, *args, **kwargs)

       return wrapper
   ```

   - The `@functools.wraps(view_func)` line
     - may not be strictly necessary.
     - But it makes our wrapper function view behave more nicely
       - — for example,
         - it copies:
           - the name and
           - docstring
           - of the original view over,
           - along with other attributes.
       - These make:
         - debugging nicer, and
         - sometimes it can be important for functionality too
           - (for instance, if you are wrapping something that has been wrapped in `csrf_exempt`)
             - — so you should always add it.

   - > pertanyaan: kenapa view_func-nya gak dibawa sama arguments-nya
     - > jawaban: soalnya dibawanya secara kesatuan dari `view_func`
     - > note: jadinya kalau

       1. Begini:

          ```python
          @premium_required
          def my_premium_page(request):
            ...
          ```

       2. Berarti interface-nya udah cocok sama:
          1. `wrapper` yang di-_defined_ _on_ `def wrapper(request, *args, **kwargs): ...`.
          2. terus _declared_ _on_ `return wrapper`.
             - > note: jadi bisa dikatakan `return wrapper` tuh masih `return view_func`.
               - > me: liat aja lagi kode-nya.
       3. Makanya `view`-nya saat dimasukin ke URLconf, maka otomatis dipenuhi, `request` dan 'arguments lainnya.

       - > just a note, terus teh di `@` / decorator land, sebenernya `@something` sama `@something()`, sama aja.
       - > tag: decorator (shit).

5. So far,
   - the views we’re using it on
     - only take a single `request`,
     - > `def my_premium_page(request): ...`
   - so making our wrapper:
     - take
       - `*args`
       - and `**kwargs`
     - might not seem necessary.
   - But we want this decorator:
     - to be
       - generic
       - and future proof,
   - so we put those in there from the start.

### Adding multiple decorators - Mahmuda's version

- Our decorator as above has an issue
  - — if an anonymous user accesses it,
  - `request.user` will be an `AnonymousUser` instance,
  - and won’t have an `is_premium` attribute,
    - > `request.user = {...: ..., `~~`is_premium`~~`: None}`
    - which will result in a 500 error.

- A nice way to tackle this
  - is to use the Django-provided
    - `login_required` decorator,
  - which will
    - redirect to the login page
      - for anonymous users.
  - We simply need to apply both decorators.
  - The correct order is as follows:

    ```python
    from django.contrib.auth.decorators import login_required

    @login_required
    @premium_required
    def my_premium_page(request):
        return TemplateResponse(request, 'premium_page.html', {})
    ```

    - The checks that `login_required`
      - does ensure that:
        - by the time
          - we get into the `premium_required` view wrapper,
        - we are guaranteed to have a logged in user.

#### Ordering multiple decorators - Mahmuda's version

- When dealing with multiple decorators, as above,
  - ordering can be very important,
  - and it’s easy to get confused about
    - what order everything is happening.

- The best analogy I know of
  - is to think of it as an *onion*:
    - In the centre,
      - you have the actual view function,
    - and each decorator adds a layer.
    - > `decorator(decorator(view_func))` tea.
  - Let’s write it out the long hand way as a visualisation:

```python
def my_premium_page(request):
    return TemplateResponse(request, 'premium_page.html', {})

my_premium_page = \
    login_required(
        premium_required(
            my_premium_page
        )
    )
```

- So,
  - `premium_required` is the **innermost** decorator.
    - > terdalam.
    - It is the **first* to be applied* to `my_premium_page`,
  - while `login_required` is the **outermost** decorator,
    - > terluar.
    - and it is the last to be applied.
- **BUT!**
  - The decorators themselves
    - (the functions `premium_required` and `login_required`)
    - are distinct from the wrappers they return!
- So,
  - the preconditions that the `login_required` wrapper
    - adds are run **first**
      - (because it is the outermost),
  - and the preconditions that the `premium_required` wrapper
    - adds are run **last**
      - (because it is the innermost).

Them, penting:
> - The result
>   - is actually very intuitive
>   - — the preconditions added by each decorator
>     - are run in the order
>       - that the decorators appear in your source code.

Them, note cenah:
> However, you might also want to do post-processing in your view wrappers. If you do that, remember the onion metaphor — post-processing from the innermost wrapper will run before post-processing from the outermost wrapper.

#### Exercise - Yang sudah kulakukan

Mine:
> [Do It Yourself](https://spookylukey.github.io/django-views-the-right-way/preconditions.html#exercise).

_Skipped their explanation_

Misal:

```python
def decorator_1(view_func):
    print("In decorator_1")

    def wrapper(request, *args, **kwargs):
        print("In decorator_1 wrapper, pre-processing")
        response = view_func(request, *args, **kwargs)
        print("In decorator_1 wrapper, post-processing")
        return response

    return wrapper


def decorator_2(view_func):
    print("In decorator_2")

    def wrapper(request, *args, **kwargs):
        print("In decorator_2 wrapper, pre-processing")
        response = view_func(request, *args, **kwargs)
        print("In decorator_2 wrapper, post-processing")
        return response

    return wrapper
```

Kalau gini:

```python
>>> @decorator_1
... @decorator_2
... def my_view(request):
...     print("In my_view")
...     return "I am a response"
>>> response = my_view(None)
```

Gimana?

Them, gini cenah:
> Hints:
> - Replace the `@` syntax with the long-hand version
> - Simplify using no decorators, then one decorator, then two decorators

Jawabannya:

```python
def decorator_2(view_func):
    print("In decorator_2")
    print("In decorator_1")

    def wrapper_2(request, *args, **kwargs):
        print("In decorator_2 wrapper, pre-processing")

        def wrapper_1(request, *args, **kwargs):
            print("In decorator_1 wrapper, pre-processing")

            # * Ingat bahwa ada `view_func`, maka ditaro / bisa dianggap jalannya di-sini.

            # def my_view(request, *args, **kwargs):
            #     print("In my_view") # * jalan dan ditampilkan.
            #     return "I am a response" # * jalan cuman di belakang aja.

            response = view_func(request, *args, **kwargs)
            print("In decorator_1 wrapper, post-processing")
            return response

        print("In decorator_2 wrapper, post-processing")
        return wrapper_1

    return wrapper_2
```

Mine:
> Jadi ackshually si Python Interpreter-nya bacanya yang `decorator_2` dulu, makanya `print("In decorator_2")`.
>
> Terus gini ringkas proses-nya:
>
> 1. `decorator_2` applied, to `my_view`
> 2. `print("In decorator_2")`
>    - > soalnya program-nya terjalankan gening, ngerti gak pembaca?
> 3. `decorator_1` applied to `my_view`
> 4. `print("In decorator_1")`
> 5. ~~terus nunggu ditampilin `view`-nya~~
> 6. ~~berjam-jam kemudian baru ada visitor~~
> 7. ~~menurut URLconf, mengarah ke `my_view`~~
>    - > enggak ketang, salah, hehe.
> 8. `print(In decorator_1 wrapper, pre-processing)`
> 9. `print(In decorator_2 wrapper, pre-processing)`
> 10. `print(In my_view)`
> 11. `print(In decorator_2 wrapper, post-processing)`
> 12. `print(In decorator_1 wrapper, post-processing)`
> 13. terus bener-bener udah te-`return` hasil akhir dari `my_view`-nya.

#### Combining multiple decorators - Mahmuda's and Adam's version

- If you have multiple decorators
  - that need to be applied in a certain order,
  - or where you often have them together,
  - you should probably be thinking about building a single decorator that combines them
    - — for which I can do no better than point you to Adam Johnson’s post [How to Combine Two Python Decorators](https://adamj.eu/tech/2020/04/01/how-to-combine-two-python-decorators/)!

Mine:
> masukin aja ya kesini bestie.

---

Misal sering banget nulis gini:

```python
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_GET


@require_GET
@login_required
def home(request): ...
```

Tulis dulu at `decorators.py`:

```python
def require_GET_and_login(func):
    return require_GET(login_required(func))
```

Terus ganti deh:

```python
@require_GET_and_login
def home(request): ...
```

---

Mahmuda and Adam:
> Misal kalo pake `require_http_methods` which is a general version of `require_GET` that takes an argument for the methods.

```python
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required


@require_http_methods(["GET", "POST"])
@login_required
def contact(request): ...
```

Jadi gini aja:

```python
def require_GET_or_POST_and_login(func):
    return require_http_methods(["GET", "POST"])(login_required(func))
```

atau gitu:

```python
def require(methods=("GET", "POST"), login=True):
    def decorator(func):
        #wrapped = func
        if methods is not None:
            func = require_http_methods(methods)(func) # ~~wrapped~~
        if login:
            func = login_required(func)
        return func

    return decorator
```

kalo gitu, maka:

```python
@require(methods=["GET"], login=True)
def index(request): ...


@require(methods=["GET", "POST"], login=False)
def blog(request): ...
```

#### Combining multiple decorators - A bit more general

Them:
> You could also see this Stackoverflow post with [general code for composing any number of decorators](https://stackoverflow.com/questions/5409450/can-i-combine-two-decorators-into-a-single-one-in-python).

This is the blueprint:

```python
def composed(*decs):
    def deco(f):
        for dec in reversed(decs):
            f = dec(f)
        return f
    return deco
```

Then:

```python
@composed(dec1, dec2)
def some(f):
    pass
```

Itu teh sama dengan ini:

```python
@dec1
@dec2
def some(f):
    pass
```

Mine:
> Thanks to Jochen Ritzel.

### Built-in decorators - Mahmuda's version

- Also, don’t miss out on
  - the decorators
  - and “decorator factories”
  - that come with Django and cover many of the common cases, such as:
    - `login_required` (already used),
    - [`user_passes_test`](https://docs.djangoproject.com/en/5.0/topics/auth/default/#django.contrib.auth.decorators.user_passes_test)
    - and [`permission_required`](https://docs.djangoproject.com/en/5.0/topics/auth/default/#the-permission-required-decorator).

### Discussion: Mixins do not compose - Mahmuda's version - skip aja tapi

- Django also provides mixins for applying preconditions,
  - like `LoginRequired` etc.,
  - which work by
    - overriding the `dispatch()` method.

- Now,
  - suppose we were to go the CBV route,
  - and
    - have a `PremiumRequired` mixin
    - instead of `@premium_required`.
  - Let’s also add another similar check
    - — `GoodReputationRequired`
    - which does some kind of reputation check
      - (perhaps this is a social site with moderation in place).
    - To require a user to have both,
      - is it enough to just add both mixins?
      - Similarly, could I produce a new mixin like this?

        ```python
        class PremiumAndGoodReputationRequired(PremiumRequired, GoodReputationRequired):
            pass
        ```

      - The answer is: **it depends**.

..., TBA, atau skip dulu.

Mine:
> Pokoknya jalan kerja CBV mixins (terutama digabung gitu, which is tujuan dibikin mixin, weird) tuh pasti aja gak sesuai perkiraan kita.

## Applying policies - Mahmuda's version

Mine:
> penting juga ini. "Preconditions" part 2.

...

## Thin views

...

### Example: push filtering to the model layer

...

Them:
> our code is less readable — we are going to have to work out what those filtering conditions actually refer to. We could add a comment against each one, as in the code above. But I always try to interpret comments like that as “code smells”. They are hints telling me that my code isn’t clear by itself.

Mine:
> Aku jadi setuju bestie, that's one of the why (sic, kan gaul) comments are bad, "code smells". `rfl`. the notes. one of my personal project.

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
> ~~Ini gak "Mahmuda's version". Soalnya gak sopan, terus gak nambahin apa-apa.~~ Lite version, jeung Mahmuda's version.

## Source(s)

- [1]: [Django Views — The Right Way](https://spookylukey.github.io/django-views-the-right-way/).
  - > Thanks to Spookylukey!
  - > This version -> <https://github.com/spookylukey/django-views-the-right-way/tree/8fd970483ccf0c0edc7252c548c19c35b74c5a57>.
