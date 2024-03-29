# Fixture Replacement: Factory Boy and Faker

## What is Factory Boy

- Fixture replacement tool
- Factories are defined in a nice, clean and readable manner
- Easy-to-use factories for complex objects
- Class-based approach
  - SubFactories
  - ForeignKey, reverse ForeignKey, ManyToMany

## Install Factory Boy and Faker

```sh
pip install pytest-factoryboy
pip install Faker
```

## Create a `UserFactory` with Faker and Factory Boy

1. Create the `UserFactory`

   `factories.py`:

   ```python
   import factory
   from faker import Faker
   fake = Faker()
   
   from django.contrib.auth.models import User
   
   
   class UserFactory(factory.django.DjangoModelFactory):
       class Meta:
           model = User
   
       username = fake.name()
       is_staff = 'True'
   ```

2. Register it on `conftest.py`

   `conftest.py`:

   ```python
   import pytest

   from pytest_factoryboy import register
   from tests.factories import UserFactory
   
   register(UserFactory)
   ```

3. Then, create a fixture / call the factory with `user_factory`
   - It automatically registered as `user_factory` on all `pytest` files.

   ```python
   @pytest.fixture
   def new_admin_user(db, user_factory):
       user = user_factory.create()
       return user
   ```

4. Use it on your test

   `test_user.py`:

   ```python
   import pytest

   def test_user(new_admin_user):
       assert new_admin_user.is_staff is True
   ```

## `create()` vs. `build()`

- `create()` actually saves it to the database.
- `build()` just build the necessary model instance.

```python
def test_new_user(user_factory):
    user = user_factory.build()
    count = User.objects.all().count()
    print(user.username)
    print(count)
    assert True
    # Output: 'John Doe' and '0'
    # OKAY ✔️
```

vs.

```python
def test_new_user(user_factory):
    user = user_factory.create()
    print(user.username)
    assert True
    # Output: ERROOORRR, missing `django_db` mark or `db`
    # FAILED ❌
```

vs.

```python
def test_new_user(user_factory):
    user = user_factory.create()
    count = User.objects.all().count()
    print(user.username)
    print(count)
    assert True
    # Output: 'John Doe' and '1'
    # OKAY ✔️
```

## Create 2 factories of some models

0. The models

   `models.py`:

   ```python
   from django.db import models
   from django.utils.translation import gettext_lazy as _
   
   class Category(models.Model):
       name = models.CharField(
           max_length=255,
       )
   
       def __str__(self):
           return self.name
   
   class Product(models.Model):
       """
       The Product table contining all product items.
       """
       title = models.CharField(
           verbose_name=_("title"),
           help_text=_("Required"),
           max_length=255,
       )
       category = models.ForeignKey(Category, on_delete=models.RESTRICT)
       description = models.TextField(verbose_name=_("description"), help_text=_("Not Required"), blank=True)
       slug = models.SlugField(max_length=255)
       regular_price = models.DecimalField(
           verbose_name=_("Regular price"),
           help_text=_("Maximum 999.99"),
           error_messages={
               "name": {
                   "max_length": _("The price must be between 0 and 999.99."),
               },
           },
           max_digits=5,
           decimal_places=2,
       )
       discount_price = models.DecimalField(
           verbose_name=_("Discount price"),
           help_text=_("Maximum 999.99"),
           error_messages={
               "name": {
                   "max_length": _("The price must be between 0 and 999.99."),
               },
           },
           max_digits=5,
           decimal_places=2,
       )
       is_active = models.BooleanField(
           verbose_name=_("Product visibility"),
           help_text=_("Change product visibility"),
           default=True,
       )
       created_at = models.DateTimeField(_("Created at"), auto_now_add=True, editable=False)
       updated_at = models.DateTimeField(_("Updated at"), auto_now=True)
   
       def __str__(self):
           return self.title
   ```

1. Create the factories

   `factories.py`:

   ```python
   import factory
   from faker import Faker
   fake = Faker()
   
   from shop.inventory import models
   
   
   class CategoryFactory(factory.django.DjangoModelFactory):
       class Meta:
           model = models.Category
   
       name = 'django'
   
   
   class ProductFactory(factory.django.DjangoModelFactory):
       class Meta:
           model = models.Product
   
       title = 'product_title'
       category = factory.SubFactory(CategoryFactory)
       description = fake.text()
       slug = 'product_slug'
       regular_price = '9.99'
       discount_price = '4.99'
   ```

2. Register them

   `conftest.py`:

   ```python
   import pytest
   
   from pytest_factoryboy import register
   from tests.factories import ProductFactory, CategoryFactory
   
   register(ProductFactory)  
   register(CategoryFactory)  
   ```

3. Then, create tests for them

   ```python
   import pytest
   
   def test_product(db, product_factory):
       product = product_factory.create()
       print(product.description)
       assert True
   ```
