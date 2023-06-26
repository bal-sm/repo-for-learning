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
