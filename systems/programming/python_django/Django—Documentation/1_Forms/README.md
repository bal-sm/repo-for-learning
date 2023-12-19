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

_The Form class_

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

...

## Notes of this "Forms" topic

satuin sama `Forms-vault.md` and make them a dedicated folder.

dan bikin a section/a dedicated file for below -vvvv

### My Bookmarks

- [modelforms](https://docs.djangoproject.com/en/4.2/topics/forms/modelforms/).

  'cause who write form manually field by field.
  - [form field type of model field on modelforms](https://docs.djangoproject.com/en/4.2/topics/forms/modelforms/#field-types)

    which model field maps to which form field.

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
