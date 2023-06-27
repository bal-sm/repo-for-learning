# Forms

## [Working with forms](https://docs.djangoproject.com/en/4.2/topics/forms/)

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

### Django's role in forms

> See the vault, aing skip.

### Forms in Django, The Django Form Class

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

### Forms in Django, Instantiating, processing, and rendering forms

- Skip, pokoknya:
  - dari `model` tertulis _`fields`_nya seperti apa, lalu menggambarkan bagaimana tabel-tabel dari databasenya.
  - kalau `forms`, akan menggambarkan isian formulir di html.

### Building a form

#### The work that needs to be done

```html
<form action="/your-name/" method="post">
    <label for="your_name">Your name: </label>
    <input id="your_name" type="text" name="your_name" value="{{ current_name }}">
    <input type="submit" value="OK">
</form>
```

> This tells the browser to return the form data to the URL /your-name/, using the POST method. It will display a text field, labeled “Your name:”, and a button marked “OK”. If the template context contains a current_name variable, that will be used to pre-fill the your_name field.
>
> ... [Read more](https://docs.djangoproject.com/en/4.2/topics/forms/#the-work-that-needs-to-be-done)
>
> Now you’ll also need a view corresponding to that /your-name/ URL which will find the appropriate key/value pairs in the request, and then process them.
>
> This is a very simple form. In practice, a form might contain dozens or hundreds of fields, many of which might need to be prepopulated, and _we might expect the user to work through the edit-submit cycle several times_ **(hm)** before concluding the operation.
>
> We might require some **validation** to occur in the browser, even **before** the form is _submitted_; we might want to use much more **complex** fields, that allow the user to do things like pick dates from a calendar and so on.
>
> **At this point it’s much easier to get Django to do most of this work for us.**[1]

Mine:
> [1]: Apalagi buat d_jurnal tea
