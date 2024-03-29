# Django + HTMX guys

Important note
> Plz [read](#notes-of-this-djangohtmx-topic).

## Table of Contents

- [Django + HTMX guys](#django--htmx-guys)
  - [Table of Contents](#table-of-contents)
  - [htmx in a Nutshell](#htmx-in-a-nutshell)
  - [Notebook of Video 1 by Bugbytes](#notebook-of-video-1-by-bugbytes)
    - [Swapping example](#swapping-example)
  - [Django \& HTMX - Dynamic Form Creation and Submission](#django--htmx---dynamic-form-creation-and-submission)
    - [Learning in Progress](#learning-in-progress)
  - [Source(s)](#sources)
  - [Learning in Progress](#learning-in-progress-1)
  - [Notes of this "django+htmx" topic](#notes-of-this-djangohtmx-topic)

## [htmx in a Nutshell](https://htmx.org/docs/#introduction)

- `htmx` is a library that 
  - allows you to access modern browser features directly from HTML, rather than using JavaScript.

```html
<a href="/blog">Blog</a>
```

This anchor tag tells a browser:
> - When a user clicks on this link:
>   - issue an `HTTP` `GET` request to `/blog` and 
>   - load the response content into the browser window.

With that in mind, consider the following bit of HTML:

```html
<button hx-post="/clicked"
    hx-trigger="click"
    hx-target="#parent-div"
    hx-swap="outerHTML"
>
    Click Me!
</button>
```

This tells htmx:
> - When a user clicks on this button:
>   - issue an `HTTP` `POST` request to `/clicked` and 
>   - use _the **content** from the response_ to 
>     - **replace** _the element with the id `parent-div`_ in the [`DOM`](https://www.w3schools.com/js/js_htmldom.asp).

---

- `htmx` extends and generalizes the core idea of `HTML` as a _**hypertext**_, 
  > opening up many more possibilities directly within the language:
  - **Now** any element, not just anchors and forms, can issue an HTTP request
    > Misalnya kayak button di atas tadi, terus HTTP request a response text yang bakal ditaro di id yang namanya `parent-div`
  - **Now** any event, not just clicks or form submissions, can trigger requests
    > Okay, learning-in-progress , fill this plz maksudnya gimana.
  - **Now** any _[HTTP verb](https://en.wikipedia.org/wiki/HTTP_Verbs)_, not just `GET` and `POST`, can be used
    > learning-in-progress , is it really necessary to use these HTTP verbs?
  - Now any element, not just the entire window, can be the target for update by the request
    > kayak tadi `parent-div` tea

Note that: (very important) 
> when you are using `htmx`, on the server side you _typically respond with `HTML`_, **not `JSON`**. 
> 
> This keeps you firmly within the [original web programming model](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm), 

Mine:
> Ew, wtf reads that.

The rest of the note:
> using [Hypertext As The Engine Of Application State](https://en.wikipedia.org/wiki/HATEOAS) without even needing to really understand that concept.

Mine:
> Okay, y'know, kayak biasa aja bacot aneh-aneh gening, padahal simple conceptnya, kayak wtf is out of band coba.

---

It’s worth mentioning that, if you prefer, you can use the `data-` prefix when using htmx:

```html
<a data-hx-post="/click">Click Me!</a>
```

Mine:
> Buat apa coba, kita liat aja vid nya bugbytes.

## Notebook of Video 1 by Bugbytes

```html
...
{{ form.username.errors }}
{% render_field form.username class="form-control" _hx-things_ %}
...
```

_hx-things_:

```html
hx-posts="/check_username/" hx-trigger="keyup" hx-target="#username-error"
```

> Jadinya, user name di cek setiap saat apakah udah ada, takutnya nanti duplicate, terus di cek stiap tekan tombol keyboard.

Updated html:

```html
{{ form.username.errors }}
{% render_field form.username class="form-control" hx-post="/check_username/" hx-trigger="keyup" hx-target="#username-error" %}
<div id="username-error"></div> <!-- ini nanti diganti sama hx-target -->
```

```python
class RegisterForm(UserCreationForm):
    class Meta:
        model = User
        fields = ["username", "password1", "password2"]
```

```python
def check_username(request):
    username = request.POST.get(
        "username"
    )  # get from the `hx-post`, and `RegisterForm` filled form `username` tea
    if get_user_model().objects.filter(username=username).exists():
        return HttpResponse("This username is already exists")
    else:
        return HttpResponse("This username is available, guys.")
```

### [Swapping](https://htmx.org/docs/#swapping) example

What if:

```html
{{ form.username.errors }}
{% render_field form.username class="form-control" hx-post="/check_username/" hx-swap="outerHTML" hx-trigger="keyup" hx-target="#username-error" %}
<div id="username-error"></div> <!-- ini nanti diganti sama hx-target -->
```

emphasize on **`hx-swap="outerHTML"`**

then,

```python
def check_username(request):
    username = request.POST.get(
        "username"
    )  # get from the `hx-post`, and `RegisterForm` filled form `username` tea
    if get_user_model().objects.filter(username=username).exists():
        return HttpResponse("<div style='color: red;'>This username is already exists</div>")
    else:
        return HttpResponse("<div style='color: green;'>This username is available, guys.</div>")
```

So, the output will be 🌈colored🌈.

## Django & HTMX - Dynamic Form Creation and Submission

...

### Learning in Progress

Note 1:
> Apparently, you can add `attrs` to change form class jadi ngikut theme dari bootstrap, kayak gini
>
> ```python
> class ContactForm(forms.ModelForm):
>     class Meta:
>         model = Contact
>         fields = ("name", "phone_number")
>         widgets = {
>             "name": forms.TextInput(attrs={"class": "form-control"}),
>             "phone_number": forms.TextInput(attrs={"class": "form-control"}),
>         }
> ```
>
> Tapi masalahnya kan ada `django-crispy-forms`/`django-widget-tweaks`. Mari kita belajar lagi.

Note 2:
> hm
>
> `form.name.id_for_label`??? Buat di `html` nya dari field dari `ContactForm` tea.
> `          ^----------^`

Note 3:
> Let's learn about flexbox, 'cause IDK wtfrick Mark syg is talking about in 7:20 of this video.

Note 4:
> Hm 8:37 bukannya bisa ya nambahin sendiri, jadi gak ask a request to server lewat htmx dulu, buat nambahin formnya??
>
> Tapi hm aja, aku lakuin aja dulu gitu

little note 5 of 13:32 of the video:
> The <li> tag defines a list item
>
> derivative (daleman li tag) diantaranya adalah <ul>.

Note 6:
> A portion of html could be called as `partials`. Nice.

Note 7:
> Bisa kayak gini euy
>
> ```html
> {% for contact in contacts %}
>     {% include 'partials/contact.html' %}
> {% endfor %}
> ```
>
> terus
> `partials/contact.html` nya gini
> 
> ```html
> <li>{{ contact.name }} - {{ contact.phone_number }}</li>
> ```
>
> Overkill tau ini teh cenah. Tapi da y'know biar set sat set aja. Soalnya pake render function lagi.

Note 8 of 15:56 of the video:
> Hm
>
> ```html
> ...
> <body>
>     <div class="container mt-5">
>         {% block content %}
>         {% endblock %}
>     </div>
> </body>
> ...
> ```
> 
> `container` class di luar `block content`, is it a good idea?
> 
> Let's baca `container` dari Bootstrap docs nya.


> Wow
Note 9 of 16:00:
> on **`base.html`**:
> 
> ```html
> <body hx-headers='{"X-CSRFToken": "{{ csrf_token }}"}'>
> ```
>
> Read [more](https://django-htmx.readthedocs.io/en/latest/tips.html#make-htmx-pass-the-csrf-token).

Adam Johnson (sayang ku, muah):
> Makanya pake `django-htmx` papi sayang.

Note 10 of 18:29:
> `hx-on` is a thing to remove ~~something from the list cenah~~ the value on the form, so it won't be submitted twice. Read [more](https://htmx.org/attributes/hx-on/).
>
> The piece of code (in `form` tag of `partials` `form.html`):
>
> ```html
> ... hx-on="htmx:afterRequest: this.remove()" ...
> ```

Note 11 of circa 19:53:
Him (Mark):
> `id="submit-all"`, very important

Karena:
> `hx-trigger="click from:#submit-all"`

Me, okay note 12:
> Just watch the rest of the video, to remember it(sic, IH AING INGGRISNYA BE-).
>
> And also stop numbering the notes, 'cause gak cantik, but whatever aku mau rapihin lagi semuanya nanti.

Last position -> 22:05

Note 13:
> `hx-on="click: this.closest('form').remove"`
>
> nanti teh jadi naik naik terus sampe dapet form tag nya.
>
> ```html
> <form> <--! tah di delete ieu -->
> <div>
> ...
> <button ... hx-on="click: this.closest('form').remove"></button>
> </div>
> </form>
> ```

## Source(s)

- [Django & HTMX by Bugbytes](https://www.youtube.com/playlist?list=PL-2EBeDYMIbRByZ8GXhcnQSuv2dog4JxY)
- [Django & HTMX - Dynamic Form Creation and Submission](https://www.youtube.com/watch?v=XdZoYmLkQ4w&list=PL-2EBeDYMIbRByZ8GXhcnQSuv2dog4JxY)

## Learning in Progress

From [this video](https://www.youtube.com/watch?v=Ula0c_rZ6gk&list=PL-2EBeDYMIbRByZ8GXhcnQSuv2dog4JxY&index=1&t=65s):

Note 1:
> What is AJAX requests?

Note 2:
Him:
> It can simplify your architecture instead using library such as React or Vue.js.

---

Note 3 from [reddit, HTMX and Alpine.js](https://www.reddit.com/r/django/comments/s00xij/htmx_and_alpinejs/) (VERY IMPORTANT, LIKE VERY VERY IMPORTANT):

> Question:
>
> Hey everyone,
> 
> I recently started experimenting with HTMX on my Django project and I absolutely love it. Other people in this sub have been saying that htmx pairs really well with alpine.js so I started looking up tutorials on it.
> 
> My question is how do you pair these 2 together? What is a common practice?
>
> Answer:
>
> - I’m simplifying but:
>   - _**alpine** replaces js that doesn’t interact with the server_ and 
>   - **htmx** covers js that **does**.
> 
> **A drop down menu toggle**[999, wow] would be something you would use alpine for and not htmx. If you use a component framework like bootstrap you’ll probably be fine without alpine for most cases.
> 
> As a far as pairing goes, just include the scripts in your template and go wild.

Mine:
> Wow guys baca [999, wow], a drop down menu/menu bar, undo, redo, edit, etc, guys. This is very important.

Note 4, still by Author of Note 3 (Very-very Important):

Question:
> Okay got it. I'm already using bootstrap so I was a little confused about the utility of alpine.js. Bootstrap already offers a lot of dynamic content with tabs, dropdowns, etc
>
> Same with Django, I was looking at the x-for attribute in alpine.js for example and it's something that could be achievable directly with HTMX and Django template tags.
>
> ~~However, there is one functionality that I was hoping I could maybe get from HTMX or alpine.js, and that would be to be able to update the content of a chart.js script without getting too involved with JavaScript. But since HTMX returns html, I don't think that I will have any other options~~ (not important part of the question)

Answer by [u/_htmx](https://www.reddit.com/user/_htmx/) themself:
> Alpine will overlap to an extent with what bootstrap gives you as far as front end functionality goes, but it is much more general and powerful.
>
> Also, using Alpine, you can hook into the htmx event model, [which is extensive](https://htmx.org/reference/#events), in a nice, inline manner that is consistent with the [Locality of Behavior](https://htmx.org/essays/locality-of-behaviour/) of htmx. This would be an advanced use case, but might come up as you get deeper into things.
>
> Alpine is a great investment of time IMO. It has a very high power to weight ratio when compared w/ other SPA libraries.
>
> I also have to mention, on general principle, [hyperscript](https://hyperscript.org/), a front end scripting language that we are working on alongside htmx. It is for crazy people only, but it has some interesting functionality and fills a similar niche to Alpine: light, event-driven front end scripting. Don't use it. :)

## Notes of this "django+htmx" topic

Reorganized this with the rest to `django+htmx_ultimate` folder.
