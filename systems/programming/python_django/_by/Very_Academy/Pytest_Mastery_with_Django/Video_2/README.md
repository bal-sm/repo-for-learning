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

#### ...

...

### ...

...

## ...

...
