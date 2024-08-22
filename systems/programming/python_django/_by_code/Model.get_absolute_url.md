# `Model.get_absolute_url` - Lite

```python
class ObjectNih(models.Model):
    ...

    def get_absolute_url(self):
        from django.urls import reverse

        return reverse("people-detail", kwargs={"pk": self.pk})
```

---

So, you can:

```html
<a href="{{ object.get_absolute_url }}">{{ object.name }}</a>
```

Instead:

```html
<a href="{% url 'people-detail' pk=my_object.pk %}">{{ my_object }}</a>
<!-- * dua kali nulis jadinya -->
```

---

And you can also:

```python
def some_redirect_view(request):
    my_object = ObjekNih.objects.get(something="something")
    return redirect(my_object)
```

Mine:
> inget beda yah, `redirect` sama `reverse` tuh, makanya: [`redirect`](./redirect.md) and [`reverse`](./reverse.md).

## Source(s)

- [1]: [`get_absolute_url` ref from Django's Docs](https://docs.djangoproject.com/en/5.1/ref/models/instances/#get-absolute-url)
- [2]: [This answer from this question](https://stackoverflow.com/questions/56332747/how-do-i-get-the-url-for-a-model)
