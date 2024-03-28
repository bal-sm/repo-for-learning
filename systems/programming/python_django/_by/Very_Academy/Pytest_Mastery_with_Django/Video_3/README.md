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
   def new_user1(db, user_factory):
       user = user_factory.create()
       return user
   ```

...
