# Fixtures

## A pattern for writing tests

- Arrange
  - > Fixtures are here!
- Act
- Assert

## What are Pytest fixtures?

- Fixtures are functions
  - To get things from database/Python objects
  - etc.
- Run before/after each test function to which the fixture is applied.

## Why are fixtures important?

Fixtures are used to feed data to the tests such as:
- Database connections,
- URLs to test, and
- Input data.

## How to create and utilize fixtures?

### Normal fixture

```python
import pytest

@pytest.fixture
def fixture_1():
   print('run-fixture-1')
   return 1

def test_example1(fixture_1):
    print('run-example-1')
    num = fixture_1
    assert num == 1
```

### Scoped fixture

#### Syntax

```python
@pytest.fixture(scope="_scope_")
```

#### Jenis-jenis scope

- `function`: Run once per test
- `class`: Run once per class of tests
- `module`: Run once per module
- `session`: Run once per session

#### Example

```python
@pytest.fixture(scope="session")
def fixture_1():
   print('run-fixture-1')
   return 1

def test_example1(fixture_1):
    print('run-example-1')
    num = fixture_1
    assert num == 1

def test_example2(fixture_1):
    print('run-example-2')
    num = fixture_1
    assert num == 1
```

Output:

`run-fixture-1`
`run-example-1`
~~`run-fixture-1`~~
`run-example-2`

### Another example

To show when fixture starts and ends:

```python
import pytest

@pytest.fixture
def yield_fixture():
   print('Start Test Phase')
   yield 6
   print('End Test Phase')

def test_example(yield_fixture):
   print('run-example-1')
   assert yield_fixture == 6
```

Output:

```sh
Start Test Phase
run-example-1
End Test Phase
```

### Django's

#### Syntax

```python
@pytest.mark.django_db
```

vs.

```python
@pytest.fixture()
def ...(db):
    ...
```

#### Non-fixture example

```python
import pytest

from django.contrib.auth.models import User


@pytest.mark.django_db
def test_user_create():
   User.objects.create_user('test', 'test@test.com', 'test')
   count = User.objects.all().count()
   print(count)
   assert User.objects.count() == 1


@pytest.mark.django_db
def test_user_create1():
   count = User.objects.all().count()
   print(count)
   assert count == 0
```

#### With fixture example

```python
import pytest

from django.contrib.auth.models import User

@pytest.fixture()
def a_new_user(db):
    return User.objects.create_user("test-user")

@pytest.mark.django_db
def test_set_check_password(a_new_user):
    a_new_user.set_password("new-password")
    assert a_new_user.check_password("new-password") is True

@pytest.mark.django_db
def test_check_username(a_new_user):
    assert a_new_user.username == "test-user"
```

#### Don't use `scope="session"`, `db` and inheritance together

```python
@pytest.fixture(scope="session")
    ...
```

Output:

```
=========================== short test summary info ============================
ERROR tests/test_ex4.py::test_set_check_password - Failed: ScopeMismatch: You tried to access the function scoped fixture db w...
ERROR tests/test_ex4.py::test_check_username - Failed: ScopeMismatch: You tried to access the function scoped fixture db w.
```

Mine:
> Liat aja section selanjutnya dan `Video_3` untuk penyelesaiannya.

#### Use `conftest.py` and comprehensive tests

`conftest.py`:

```python
import pytest

from django.contrib.auth.models import User

@pytest.fixture
def new_user_factory(db):
    def create_app_user(
        username: str,
        password: str = None,
        first_name: str = "firstname",
        last_name: str = "lastname",
        email: str = "test@test.com",
        is_staff: str = False,
        is_superuser: str = False,
        is_active: str = True,
    ):
        user = User.objects.create_user(
            username=username,
            password=password,
            first_name=first_name,
            last_name=last_name,
            email=email,
            is_staff=is_staff,
            is_superuser=is_superuser,
            is_active=is_active,
        )
        return user
    return create_app_user

@pytest.fixture
def new_normal_user(db, new_user_factory):
    return new_user_factory("Test_user","password","MyName")

@pytest.fixture
def new_admin_user(db, new_user_factory):
    return new_user_factory("Test_user","password", "MyName", is_staff="True")
```

`test_....py`:

```python
import pytest

def test_first_name_normal_user(new_normal_user):
    print(new_normal_user.first_name)
    assert new_normal_user.first_name == "MyName"

def test_is_staff_admin_user(new_admin_user):
    print(new_admin_user.is_staff)
    assert new_admin_user.is_staff
```

#### ...

...

### ...

...

## ...

...
