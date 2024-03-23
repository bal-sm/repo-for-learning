# Check if a `OneToOneField` relation exists in Django

Mine:
> Taken from -> <https://stackoverflow.com/questions/25944968/check-if-a-onetoone-relation-exists-in-django>.

The models:

```python
class A(models.Model):
    pass

class B(models.Model):
    ref_a = models.OneToOneField(related_name='ref_b', null=True)
```

The problem:

```python
a1 = A.objects.create()
a2 = A.objects.create()
b1 = B.objects.create()
b2 = B.objects.create(ref_a=a2)

# then I call:
print(a1.ref_b)  # DoesNotExist Exception raised
print(a2.ref_b)  # returns b2
print(b1.ref_a)  # returns None
print(b2.ref_a)  # returns a2
```

The best solution, <https://stackoverflow.com/a/75812123>:
> Much cleaner to use custom django Field based on `OneToOneField`, this approach which will allow you to use direct access - just `a.ref_b` and result would be `instance or None`
> 
> ```python
> from django.db.models.fields.related import ReverseOneToOneDescriptor
> from django.core.exceptions import ObjectDoesNotExist
> from django.db import models
> 
> class SingleRelatedObjectDescriptorReturnsNone(ReverseOneToOneDescriptor):
>     def __get__(self, *args, **kwargs):
>         try:
>             return super().__get__(*args, **kwargs)
>         except ObjectDoesNotExist:
>             return None
> 
> class OneToOneOrNoneField(models.OneToOneField):
>     """A OneToOneField that returns None if the related object doesn't exist"""
>     related_accessor_class = SingleRelatedObjectDescriptorReturnsNone
> ```
> 
> so the example will look like
> 
> ```python
> class A(models.Model):
>     pass
> 
> class B(models.Model):
>     ref_a = OneToOneOrNoneField(related_name='ref_b', null=True)
> ```

Mine:
> Thanks to all of them.
