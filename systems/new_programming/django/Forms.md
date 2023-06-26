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
