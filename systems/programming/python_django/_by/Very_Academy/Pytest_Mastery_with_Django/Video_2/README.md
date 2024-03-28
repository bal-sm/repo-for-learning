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

### ...

...

## ...

...
