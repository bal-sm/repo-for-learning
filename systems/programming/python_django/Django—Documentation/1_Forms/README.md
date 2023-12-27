# Forms

Important note:
> Plz read -> Notes of this "Forms" topic section

## [Working with forms](https://docs.djangoproject.com/en/5.0/topics/forms/)

Django provides a range of tools and libraries to help you build forms to accept input from site visitors, and then process and respond to the input.

### HTML forms

> who the fuck use normal HTML form while django handles it perfectly (I hope)
>
> Ini ringkasan sedikit.

Isi dari HTML forms berawal dari `<form>` ke `</form>`.

Ini contohnya:

```html
<form action="{% url 'polls:vote' question.id %}" method="post">
{% csrf_token %}
<fieldset>
    <legend><h1>{{ question.question_text }}</h1></legend>
    {% if error_message %}<p><strong>{{ error_message }}</strong></p>{% endif %}
    {% for choice in question.choice_set.all %}
        <input type="radio" name="choice" id="choice{{ forloop.counter }}" value="{{ choice.id }}">
        <label for="choice{{ forloop.counter }}">{{ choice.choice_text }}</label><br>
    {% endfor %}
</fieldset>
<input type="submit" value="Vote">
</form>
```

> taken from [here](https://docs.djangoproject.com/en/3.2/intro/tutorial04/#write-a-minimal-form).

> Please ganti ke login and password form. [Dari ini](https://www.w3schools.com/howto/howto_css_login_form.asp).

#### [GET vs POST](https://docs.djangoproject.com/en/5.0/topics/forms/#get-and-post)

```{note}
**TL;DR**:

GET:
Pake buat queri yang pantas dilihat oleh user dan dishare ke orang lain url-nya, seperti search kueri. (sic)

POST:
Pake buat data data yang bener bener isian dan private, jadi gak muncul di URL cuman dikirim melalui request.
```

### Django's role in forms

- Handling forms is a complex business. Consider Django’s admin:
  - where numerous items of data of several different types may need to be prepared for display in a form,
  - rendered as HTML,
  - edited using a convenient interface,
  - returned to the server,
  - validated and cleaned up,
  - and then saved or passed on for further processing.

Django’s form functionality _can simplify and **automate** vast portions of this work_, and can also do it more **securely** than most programmers **would be able to do in code they wrote themselves**.

> Let's see `django-crispyforms` sama `django-widget-tweaks`. Biar bisa edit style dari forms nya.

<!-- break. -->

Django handles _three distinct parts of the work_ involved in **forms**:

- _preparing and restructuring_ `data` to make it ready for rendering
- _creating_ `HTML forms` for the data
- _receiving and processing_ `submitted forms and data` from the client

It is _possible_ to write code that does all of this manually, but Django can take care of it all for you.

### Forms in Django

#### The Django Form Class — Mahmuda's version

Illustration of Django's forms with comparison of Django's model (sic pisan):

```model
class ArticleForm(forms.Form):
    title = forms.CharField(max_length=100)
    pub_date = forms.DateField()
```

jadi gini kan:

| id     | title | pub_date |
|:------:|:-----:|---------:|
| 1      | Kosa  | 22/4/12  |
| 2      | Jalan | 22/4/12  |

kalo dibikin `ModelFoms` yang bakal nyocokin sama modelnya gini:

```html
<form action="/article atau apa we da ada urlconf tea kan/" method="post">
    <input id="title" type="text" name="title" value="..." maxlength="100" required>
    <input id="pub_date" type="text" name="pub_date" value="..." ...>
    <input type="submit" value="OK">
</form>
```

##### Sedikit Tambahan 

Jadi bisa disimpulkan seperti ini:

`Model` "class" -> *the logical structure of an object, its behavior, and the way its parts are represented to us*

`Form` class -> *a form and determines how it works and appears.*

---

`Model`'s fieldss -map-to-> Database's fields

`Form`'s fields -map-to-> HTML form `<input>` elements

`ModelForm` -utilizes-> `Model`'s fields -map-to-> Appropriate `Form`'s fields -map-to-> HTML form `<input>` elements

Trivia:
> this is what the Django admin is based upon.

---

- A `Form`’s fields are themselves `class`es; 
  - they manage _form data_ and 
  - _perform **validation**_ when a form is **submitted**.
  - Ex:
    - `DateField` -> Is it a date?, is it on the range?
    - `FileField` -> Is it a file?, is it too big?

---

A `Form`'s field type -> Default (HTML) `Widget` class -> (Can Be Overridden) -> Rendered on HTML

#### Instantiating, processing, and rendering forms — Mahmuda's version

Them:
> When rendering an object in Django, we generally:
> 1. **get hold** of it _in the view_ (fetch it from the database, for example)
> 2. **pass it** to _the template context_
> 3. **expand it** to HTML markup using _template variables_

Rendering a **form** in a template **≈** Rendering any other kind of object, but:
1. Kalau _instance_ (~~perwakilan~~ instansi, (u)) dari model, yang merupakan suatu object juga, biasanya harus ada **_value_** (from databse)nya
2. Kalau object form, kalau unpopulated/no **_value_** sebelumnya juga gak apa-apa.
   - Terus biarkan user sendiri yang memasukkan _values_nya

Berdasarkan atas, berarti:
1. Diambil dari database dan taruh di view.
2. Formnya langsung di _instatiate_ dalam view. Cuman ada beberapa jenis **instance of form**:
   - Empty, unpopulated form
   - Prepopulated with data dari:
     - Dari _a saved model instance_ (instansi model yang tersimpan)
       - seperti `admin` forms untuk diedit
     - Terambil dari sumber-sumber lain, seperti kurs uang misalnya
     - Data yang diterima dari _submission (penyerahan, (u)) formulir HTML sebelumnya

Jadinya:
- User baca view ✔️
- User ngirim data ✔️✔️ (juga)

### Building a form

#### The work that needs to be done

HTML simple form of user's name (sic, by TS):

```html
<form action="/your-name/" method="post">
    <label for="your_name">Your name: </label>
    <input id="your_name" type="text" name="your_name" value="{{ current_name }}">
    <input type="submit" value="OK">
</form>
```

Them (skip aja, 'cause codenya juga jelas):
> This tells the browser to return the form data to the URL `/your-name/`, using the `POST` method. It will display a text field, labeled “Your name:”, and a button marked “OK”. If the template context contains a `current_name` variable, that will be used to pre-fill the `your_name` field.
>
> You’ll need a view that renders the template containing the HTML form, and that can supply the `current_name` field as appropriate.
>
> When the form is submitted, the `POST` request which is sent to the server will contain the form data.

Them, **penting**:
> _Now you’ll also need a view corresponding to that `/your-name/` URL which will find the appropriate key/value pairs in the request, and then process them._

Them, rada penting:
> This is a very simple form. In practice, a form might contain dozens or hundreds of fields, many of which might need to be prepopulated, and _we might expect the user to work through the edit-submit cycle several times_ **(hm)** before concluding the operation.
>
> We might require some **validation** to occur in the browser, even **before** the form is _submitted_; we might want to use much more **complex** fields, that allow the user to do things like pick dates from a calendar and so on.

Them, conclusion penting:
> **At this point it’s much easier to get Django to do most of this work for us.**

#### Building a form in Django

_The `Form` class_

Penjabaran dari [The work that needs to be done](#the-work-that-needs-to-be-done), jika dijadikan Django's code:

`forms.py`:

```python
from django import forms


class NameForm(forms.Form):
    your_name = forms.CharField(label="Your name", max_length=100)
```

Mine:
> Mending `ModelForm` gak sih.

Mine, now:
> Mari belajar runtut, basic `Form` -> `ModelForm`.

Them:
> This defines a `Form` class with a single field (`your_name`).

Them, rada penting tapi panjang, skip aja ke bawah:
> _We’ve applied a human-friendly **label** to the field, which will appear in the <label> when it’s rendered (although in this case, the label we specified is actually the same one that would be generated automatically if we had omitted it)._

Mine, TL;DR:
> Jadi, karena nama fieldnya `your_name`, label nya juga harusnya "Your name" automatically.

Mine, oge:
> Mending udah itu pake translation `gettext` utility tea untuk labelnya, `_("Your name")`.

Them:
> The field’s maximum allowable length is defined by `max_length`. This does two things. It puts a `max_length="100"` on the HTML `<input>` (so the browser should prevent the user from entering more than that number of characters in the first place). It also means that when Django receives the form back from the browser, it will validate the length of the data.

Mine, TL;DR atas:
> - Jadi gini:
>   - Limit 100 character -> Browser's front end
>   - Validate, is it 100 character? -> Saved to the database

Them, **penting pisan**:
> - A `Form` instance **has an `is_valid()` method**, 
>   - which runs validation routines for all its fields.
>   - When **this method is called**, if _all fields contain_ **valid data**, it will:
>     - **return `True`**
>     - **place the form’s data** in its _**`cleaned_data`** attribute_.

The whole form, when rendered for the first time, will look like:

```html
<label for="your_name">Your name: </label>
<input id="your_name" type="text" name="your_name" maxlength="100" required>
```

Them, note:
> Note that it **does not include** the `<form>` tags, or a submit button. We’ll have to provide those ourselves in the template.

---

_The view_

View from `views.py` -Publishes-> Form on DOM -to-be-filled-by-> User -sends-back-> Filled Form -to-be-processed-by-> View again (A portion of `if` "filled" block)

Example of instantiating form in a view:

`views.py`:

```python
from django.http import HttpResponseRedirect
from django.shortcuts import render

from .forms import NameForm


def get_name(request):
    # if this is a POST request we need to process the form data
    if request.method == "POST":
        # create a form instance and populate it with data from the request:
        form = NameForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            # process the data in form.cleaned_data as required
            # ...
            # redirect to a new URL:
            return HttpResponseRedirect("/thanks/")

    # if a GET (or any other method) we'll create a blank form
    else:
        form = NameForm()

    return render(request, "name.html", {"form": form})
```

Mine, penting, learning note:
> Tuh liat `NameForm` form, dikira cuman ngasih `form` doang, padahal ada validation-nya (setelah submit), terus bikin error messages yang bisa ditangkep dan ditunjukkin dengan instantiate the `messages` to `context` of view.

Mine, again:
> Penjelasan di official docs nya, saya lupa di mana.

Them, skip:
> If we arrive at this view with a `GET` request, it will _create an empty form instance_ and _place it in the template context to be rendered_. This is what we can expect to happen _the first time we visit the URL_.
>
> If the form is submitted using a `POST` request, the view will once again create a form instance and populate it with data from the request: `form = NameForm(request.POST)` This is called “binding data to the form” (it is now a bound form).
>
> We call the form’s `is_valid()` method; if it’s not `True`, we go back to the template with the form. This time the form is no longer empty (_unbound_) so the HTML form will be populated with the data previously submitted, where it can be edited and corrected as required.
>
> If `is_valid()` is `True`, we’ll now be able to find all the validated form data in its `cleaned_data` attribute. We can use this data to update the database or do other processing before sending an HTTP redirect to the browser telling it where to go next.

Mine, TL;DR:
> - `GET` request -> Empty form -> User -> Submitted filled form -> `POST` request with the data -validated-by-> `is_valid()` method -the-result-> `True` or `False`.
>   - `True` --> `cleaned_data` which contains all the validated form data --> update the database with the data / do ther processing / etc --> redirection to any other page.
>   - `False` --> Redirected back to the template + Data previously submitted -> User reediting -> `POST` request with the data, again.

Mine, penting, learning note:
> "process the data in form.cleaned_data as required" nya `Form` tuh pastinya beda sama `ModelForm`, makanya udah ini langsung ke `ModelForm`.

---

_The template_

`name.html`:

```html
<form action="/your-name/" method="post">
    {% csrf_token %}
    {{ form }}
    <input type="submit" value="Submit">
</form>
```

`form` instance -> `form` as `context`

Note from them, modded:
> Forms and Cross Site Request Forgery protection
>
> `csrf_token` is a security thing of Django.

Note from them 2, unmodded:
> HTML5 input types and browser validation
>
> If your form includes a `URLField`, an `EmailField` or any integer field type, Django will use the `url`, `email` and `number` HTML5 input types. By default, browsers may apply their own validation on these fields, which may be stricter than Django’s validation. If you would like to disable this behavior, set the `novalidate` attribute on the `form` tag, or specify a different widget on the field, like `TextInput`.

---

∴:
> `Form` class => Processed by a view => Rendered as an HTML `<form>`

Wow, them, modded:
> - That’s all you need to get started, ✔️
>   - but the forms framework puts a lot more at your fingertips ❗
>     - ... you should be prepared to understand other features of the forms system and ready to learn a bit more about the underlying machinery ‼️

---

### [More about Django [`Form`](https://docs.djangoproject.com/en/5.0/ref/forms/api/#django.forms.Form) classes](https://docs.djangoproject.com/en/5.0/topics/forms/#more-about-django-form-classes)

`BaseForm` -> `Form` / `ModelForm`

My note:
> Please use `ModelForm` if your form is a direct of one of your models copy.

#### Bound vs unbound form instances

- Unbound form instance == No data -> Empty form on the view
- Bound form instance == Datas by User ✔️ -> Submitted datas -> `POST` request with the data -> ...

Mine, learning note:
> Tuh baru ngeuh ada dua macam formulir. Bound vs Unbound.

##### Bound and unbound forms API — Mahmuda's version

Mine:
> [Taken from](https://docs.djangoproject.com/en/5.0/ref/forms/api/#bound-and-unbound-forms)

If a form:
- Bound to a set of data -> Data validation ✔️, Rendering the form + data on HTML ✔️
- Unbound -> No data (+ validation ❌), Rendering blank form on HTML

Unbound `Form` instance:

```python
f = ContactForm()
```

Bound form with data as a dictionary:

```python
data = {
    "subject": "hello",
    "message": "Hi there",
    "sender": "foo@example.com",
    "cc_myself": True,
}

f = ContactForm(data)
```

The `ContactForm`:

```python
class ContactForm(forms.Form):
    subject = forms.CharField()
    message = forms.CharField()
    sender = forms.EmailField()
    cc_myself = forms.BooleanField()
```

My note:
> Tuh keys dari `data` dictionary nya nyocok sama nama field nya di `ContactForm`.

... (Skipped)

Maintenance note:
> Pindahin as a collection of API docs, maybe?

#### More on fields — Mahmuda's version

`forms.py`:

```python
from django import forms


class ContactForm(forms.Form):
    subject = forms.CharField(max_length=100)
    message = forms.CharField(widget=forms.Textarea)
    sender = forms.EmailField()
    cc_myself = forms.BooleanField(required=False)
```

##### Widgets

- Widgets
  - Each form field has a corresponding [Widget class](https://docs.djangoproject.com/en/5.0/ref/forms/widgets/),
    - which in turn corresponds to an HTML form widget
      - such as `<input type="text">`.
  - The field will have a _sensible_ default widget.
    - Ex: [`CharField`](https://docs.djangoproject.com/en/5.0/ref/forms/fields/#django.forms.CharField) -default-widget-> [`TextInput`](https://docs.djangoproject.com/en/5.0/ref/forms/widgets/#django.forms.TextInput) -produces-> `<input type="text">`
    - Ex: `message` field -> `CharField` -widget-overridden-to-> `Textarea` -produces-> `<textarea>`

##### Field data

- Field data
  - Submitted data with a form -> validated by calling `is_valid()` -> True -> data -goes-to-> `form.cleaned_data`
  - > This data will have been nicely converted into Python types for you, them.
  - > You can still access the unvalidated data directly from `request.POST` at this point, but the validated data is better, them again.

Example(s):

- In the contact form example above, `cc_myself` will be a boolean value.
- Likewise, fields such as `IntegerField` and `FloatField` convert values to a Python `int` and `float` respectively.
  - > terus emang data nya juga disimpen secara `str` aja gening, cari geura, learning note.

Here’s how the form data could be processed in the view that handles this form:

```python
from django.core.mail import send_mail

if form.is_valid():
    subject = form.cleaned_data["subject"]
    message = form.cleaned_data["message"]
    sender = form.cleaned_data["sender"]
    cc_myself = form.cleaned_data["cc_myself"]

    recipients = ["info@example.com"]
    if cc_myself:
        recipients.append(sender)

    send_mail(subject, message, sender, recipients)
    return HttpResponseRedirect("/thanks/")
```

Them:
> For more on sending email from Django, see [Sending email](https://docs.djangoproject.com/en/5.0/topics/email/).

_**"Files" fields**_

Can be retrieved `request.FILES`, rather than `request.POST`.

Read more, [Binding uploaded files to a form](https://docs.djangoproject.com/en/5.0/ref/forms/api/#binding-uploaded-files).

#### Working with form templates — Mahmuda's version

How to get your form into a template:

`Form()` -> `form` in context -> {{ form }} ❌ Does not include `<form>` tags and `submit` control itself.

```html
<form>
    {{ form }}
    <!-- and its `submit control`-->
</form
```

Mine, reminder note:
> Jangan lupa ngasih processed HTML nya + proper `submit` nya

##### Reusable form templates — Mahmuda's version

Mine:
> Asal-usul dari `form` sendiri itu, adalah template-template juga. Bisa diubah katanya dengan override `form_template_name` dalam:

[`FORM_RENDERER`](https://docs.djangoproject.com/en/5.0/ref/settings/#form-renderer) -which-defaults-to-> `'django.forms.renderers.DjangoTemplates'` -which-subclasses-> `django.forms.renderers.BaseRenderer` --> [`form_template_name`](https://docs.djangoproject.com/en/5.0/ref/forms/renderers/#django.forms.renderers.BaseRenderer.form_template_name):

```python
class BaseRenderer:
    form_template_name = "django/forms/div.html"
    formset_template_name = "django/forms/formsets/div.html"
    field_template_name = "django/forms/field.html"

    def get_template(self, template_name):
        raise NotImplementedError("subclasses must implement get_template()")

    def render(self, template_name, context, request=None):
        template = self.get_template(template_name)
        return template.render(context, request=request).strip()
```

You can also customize per-form: `Form()` -instantiate-to-> `some_form` -then-override-its-> `template_name` attribute

Or by: passing the template name -directly-to-> `Form.render()`

###### Example of reusable form templates — Mahmuda's version

Them, skip:
> The example below will result in `{{ form }}` being rendered as the output of the `form_snippet.html` template.

In templates:

```html
# In your template:
{{ form }}

# In form_snippet.html:
{% for field in form %}
    <div class="fieldWrapper">
        {{ field.errors }}
        {{ field.label_tag }} {{ field }}
    </div>
{% endfor %}
```

Then you can configure the `FORM_RENDERER` setting:

`settings.py`:

```python
from django.forms.renderers import TemplatesSetting


class CustomFormRenderer(TemplatesSetting):
    form_template_name = "form_snippet.html"


FORM_RENDERER = "project.settings.CustomFormRenderer"
```

**`/`** (for a single form):

```python
class MyForm(forms.Form):
    template_name = "form_snippet.html"
    ...
```

**`/`** (for a single render of a form instance):

```python
def index(request):
    form = MyForm()
    rendered_form = form.render("form_snippet.html")
    context = {"form": rendered_form}
    return render(request, "index.html", context)
```

###### Tidbit — Outputting forms as HTML — Mahmuda's version

_Printed blank form_

```sh
>>> f = ContactForm()
>>> print(f)
```

```html
<div>
  <label for="id_subject">Subject:</label
  ><input type="text" name="subject" maxlength="100" required id="id_subject" />
</div>
<div>
  <label for="id_message">Message:</label
  ><input type="text" name="message" required id="id_message" />
</div>
<div>
  <label for="id_sender">Sender:</label
  ><input type="email" name="sender" required id="id_sender" />
</div>
<div>
  <label for="id_cc_myself">Cc myself:</label
  ><input type="checkbox" name="cc_myself" id="id_cc_myself" />
</div>
```

_If bound to data_

```html
<div>
  <label for="id_subject">Subject:</label
  ><input type="text" name="subject" maxlength="100" required id="id_subject" value="Welcome to Hipo!" />
</div>
```

**`value="Hipo"`**

```html
<div>
  <label for="id_cc_myself">Cc myself:</label
  ><input type="checkbox" name="cc_myself" id="id_cc_myself" checked />
</div>
```

**`checked`**

Them, skip aja, kalo males, karena **technical**:

This default output wraps each field with a `<div>`. Notice the following:

- For flexibility, the output does not include the `<form>` and `</form>` tags or an `<input type="submit">` tag. It’s your job to do that.
- Each field type has a default HTML representation. `CharField` is represented by an `<input type="text">` and `EmailField` by an `<input type="email">`. `BooleanField(null=False)` is represented by an `<input type="checkbox">`. Note these are merely sensible defaults; you can specify which HTML to use for a given field by using widgets, which we’ll explain shortly.
- The HTML `name` for each tag is taken directly from its attribute name in the `ContactForm` class.
- The text label for each field – e.g. `'Subject:'`, `'Message:'` and `'Cc myself:'` is generated from the field name by converting all underscores to spaces and upper-casing the first letter. Again, note these are merely sensible defaults; you can also specify labels manually.
- Each text label is surrounded in an HTML `<label>` tag, which points to the appropriate form field via its `id`. Its `id`, in turn, is generated by prepending `'id_'` to the field name. The `id` attributes and `<label>` tags are included in the output by default, to follow best practices, but you can change that behavior.
- The output uses HTML5 syntax, targeting `<!DOCTYPE html>`. For example, it uses boolean attributes such as `checked` ~~rather than the XHTML style of `checked='checked'`~~.

Them, skip aja, redundant soalnya, cuman ngingetin juga:
> Although `<div>` output is the default output style when you `print` a form you can customize the output by using your own form template which can be set site-wide, per-form, or per-instance. 
> 
> See [Reusable form templates](https://docs.djangoproject.com/en/5.0/topics/forms/#reusable-form-templates) / [Reusable form templates — Mahmuda's version](#reusable-form-templates--mahmudas-version).

##### Reusable field group templates — Mahmuda's version

Them, note:
> **New in Django 5.0.**

- **Each field** is available as an attribute of the form,
  - using `{{ form.name_of_field }}`

~~...~~ 

Mine:
> Skipped, baca aja [example](#example-from-50-release-notes) apabila tertarik, dan buka official docs-nya.

###### Example from [`5.0` release notes](https://docs.djangoproject.com/en/5.0/releases/5.0/#simplified-templates-for-form-field-rendering)

Them:
> - Django 5.0 introduces the concept of:
>   - a _field_ **group**;
>   - and _field group_ **templates**. 
>   - This **simplifies** _rendering of the related elements of a Django form field_ such as:
>     - its **label**;
>     - **widget**;
>     - **help text**;
>     - and **errors**.

Dari ini, (before 5.0):

```html
<form>
...
<div>
  {{ form.name.label_tag }}
  {% if form.name.help_text %}
    <div class="helptext" id="{{ form.name.auto_id }}_helptext">
      {{ form.name.help_text|safe }}
    </div>
  {% endif %}
  {{ form.name.errors }}
  {{ form.name }}
  <div class="row">
    <div class="col">
      {{ form.email.label_tag }}
      {% if form.email.help_text %}
        <div class="helptext" id="{{ form.email.auto_id }}_helptext">
          {{ form.email.help_text|safe }}
        </div>
      {% endif %}
      {{ form.email.errors }}
      {{ form.email }}
    </div>
    <div class="col">
      {{ form.password.label_tag }}
      {% if form.password.help_text %}
        <div class="helptext" id="{{ form.password.auto_id }}_helptext">
          {{ form.password.help_text|safe }}
        </div>
      {% endif %}
      {{ form.password.errors }}
      {{ form.password }}
    </div>
  </div>
</div>
...
</form>
```

Now, can be simplified to:

```html
<form>
...
<div>
  {{ form.name.as_field_group }}
  <div class="row">
    <div class="col">{{ form.email.as_field_group }}</div>
    <div class="col">{{ form.password.as_field_group }}</div>
  </div>
</div>
...
</form>
```

Them:
> `as_field_group()` renders fields with the `"django/forms/field.html"` template by default and can be customized on a per-project, per-field, or per-request basis. See [Reusable field group templates](#reusable-field-group-templates--mahmudas-version).

### Skipped section

- Working with form templates
  - ~~...~~
  - Rendering fields manually
    - Rendering form error messages
  - Looping over the form’s fields
    - Looping over hidden and visible fields

Mine, the reason why these part is skipped:
> Soalnya you will relearn this with `django-crispy-forms` anyways.

Mine:
> Kayaknya nanti suatu saat bakal butuh deh di project akuntansi besar, cuman karena masih pake `django-crispy-forms` jadi nyem-nyem-nyem `JavaScript` things-nya bisa kepake.
>
> Kalau make "reusable" things kayaknya nanti `js` things-nya ribet.

## Notes of this "Forms" topic

```
satuin sama `Forms-vault.md` and make them a dedicated folder.

dan bikin a section/a dedicated file for below -vvvv

### My Bookmarks

- [modelforms](https://docs.djangoproject.com/en/4.2/topics/forms/modelforms/).

  'cause who write form manually field by field.
  - [form field type of model field on modelforms](https://docs.djangoproject.com/en/4.2/topics/forms/modelforms/#field-types)

    which model field maps to which form field.
```

## Formsets

...

Mine, learning note, di skip karena:
> - Tapi liat lagi dulu geura
>   - [Django & HTMX - Dynamic Form Creation and Submission](https://youtu.be/XdZoYmLkQ4w?si=uyapTxZulF5MVImz), and 
>   - [Django and HTMX #3 - Listing and Creating Items (with no refresh!)](https://youtu.be/H_m1g8XOtHY?si=g0QEMP5M9XMcll-A).
> - Terus `django-crispy-forms` juga support formsets lagi, [baca di sini](https://django-crispy-forms.readthedocs.io/en/latest/crispy_tag_formsets.html#formsets).
>
> UPDATE: Rangkum aja we penting jg. Sesudah "Creating forms from models".

## Creating forms from models

### **`ModelForm`**

#### _`class`_ **`ModelForm`**

Full name:
> `django.forms.ModelForm`

If you’re building a database-driven app -chances-are-you’ll-have-> Forms -that-map-> Models

Therefore,

❌ Dupe those fields by creating another `Forms` instance.

✔️ Use `ModelForms` (a helper class) to mimic those `Model` as `Forms`.

```python
>>> from django.forms import ModelForm
>>> from myapp.models import Article

# Create the form class.
>>> class ArticleForm(ModelForm):
...     class Meta:
...         model = Article
...         fields = ["pub_date", "headline", "content", "reporter"]
...

# Creating a form to add an article.
>>> form = ArticleForm()

# Creating a form to change an existing article.
>>> article = Article.objects.get(pk=1)
>>> form = ArticleForm(instance=article)
```

#### Field types

Generated `Form` class of `ModelForm` -will-have-> a form field -for-> every model field specified -(in-the-order-specified-in-the-`fields`-attribute.)

Each model field -has-a-corresponding-> default form field.

| Model field                 | Form field                                            |
| :-------------------------- | :---------------------------------------------------- |
| `AutoField`                 | -                                                     |
| `BigAutoField`              | -                                                     |
| `BigIntegerField`           | `IntegerField` with ...                               |
| `BinaryField`               | `CharField`, if ...                                   |
| `BooleanField`              | `BooleanField`, or `NullBooleanField` if `null=True`. |
| `CharField`                 | `CharField` with ...                                  |
| `DateField`                 | `DateField`                                           |
| `DateTimeField`             | `DateTimeField`                                       |
| `DecimalField`              | `DecimalField`                                        |
| `DurationField`             | `DurationField`                                       |
| `EmailField`                | `EmailField`                                          |
| `FileField`                 | `FileField`                                           |
| `FilePathField`             | `FilePathField`                                       |
| `FloatField`                | `FloatField`                                          |
| `ForeignKey`                | `ModelChoiceField`                                    |
| `ImageField`                | `ImageField`                                          |
| `IntegerField`              | `IntegerField`                                        |
| `IPAddressField`            | `IPAddressField`                                      |
| `GenericIPAddressField`     | `GenericIPAddressField`                               |
| `JSONField`                 | `JSONField`                                           |
| `ManyToManyField`           | `ModelMultipleChoiceField`                            |
| `PositiveBigIntegerField`   | `IntegerField`                                        |
| `PositiveIntegerField`      | `IntegerField`                                        |
| `PositiveSmallIntegerField` | `IntegerField`                                        |
| `SlugField`                 | `SlugField`                                           |
| `SmallAutoField`            | -                                                     |
| `SmallIntegerField`         | `IntegerField`                                        |
| `TextField`                 | `CharField` with `widget=forms.Textarea`              |
| `TimeField`                 | `TimeField`                                           |
| `URLField`                  | `URLField`                                            |
| `UUIDField`                 | `UUIDField`                                           |

Keterangann:

- `-` for Not represented in the form
- `...` for read the official docs
- `ModelChoiceField` <- `ForeignKey`
  - |-> `ChoiceField` <-choices- model's `QuerySet`
- `ModelMultipleChoiceField` <-- `ManyToManyField`
  - |-> `MultipleChoiceField` <-choices- model's `QuerySet`

Maintenance note:
> 1. Kayak terlalu rancu keterangannya gitu loh.
> 2. Terus `...`-nya mending masukin aja nanti.

...

#### ...

...

## Learning in Progress

Question:
> What is the difference between `widgets` and `field`?

Context:
> Kebanyakan baca modelform

Answer:
> `comment = forms.CharField(widget=forms.Textarea)`
>
> nah `CharField` ya `CharField` cuman kalo `widget` ada [`TextInput`](https://docs.djangoproject.com/en/4.2/ref/forms/widgets/#django.forms.TextInput) yaitu widget defaultnya, dan [`Textarea`](https://docs.djangoproject.com/en/4.2/ref/forms/widgets/#django.forms.Textarea) yaitu widget yang lebih gede.

Taken [from](https://docs.djangoproject.com/en/4.2/ref/forms/widgets/#specifying-widgets).
