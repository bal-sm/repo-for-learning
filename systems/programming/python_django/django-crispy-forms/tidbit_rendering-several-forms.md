# Tidbit - Rendering several forms with helpers

Them:
> Often we get asked:
> > How do you render two or more forms, with their respective helpers, using {% crispy %} tag, without having <form> tags rendered twice?
>
> Easy, you need to set form_tag helper property to False in every helper:

```python
self.helper.form_tag = False
```

Them:
> Then you will have to write a little of html code surrounding the forms:

```python
<form action="{% url 'submit_survey' %}" class="my-class" method="post">
    {% crispy first_form %}
    {% crispy second_form %}
</form>
```

Them:
> You can read a list of [Helper attributes you can set](https://django-crispy-forms.readthedocs.io/en/2.0/form_helper.html#helper-attributes) and what they are for.

## Source(s)

- [1]: [`{% crispy %}` tag with forms](https://django-crispy-forms.readthedocs.io/en/2.0/crispy_tag_forms.html)
