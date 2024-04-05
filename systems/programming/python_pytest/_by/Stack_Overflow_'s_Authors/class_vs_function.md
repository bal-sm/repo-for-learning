# Grouping tests in `pytest`: `Class`es vs plain `def`-ined functions

[Source](https://stackoverflow.com/questions/50016862/grouping-tests-in-pytest-classes-vs-plain-functions).

## Question

I'm using pytest to test my app. pytest supports 2 approaches (that I'm aware of) of how to write tests:

1. In classes:

   > `test_feature.py -> class TestFeature -> def test_feature_sanity`

   In functions:

   > `test_feature.py -> def test_feature_sanity`

Is the approach of grouping tests in a class needed? Is it allowed to backport unittest builtin module? Which approach would you say is better and why?

> Thanks to them all.

## Answer 1 by Ignacio Vergara Kausel

As it's mentioned in `pytest` documentation, you can use it to execute unittest tests. As for grouping tests in a class, it's mostly a matter of taste and organization.

## Answer 2 by [Jasha](https://stackoverflow.com/a/62176555)

This answer presents two compelling use-cases for a TestClass in pytest:
- Joint parametrization of multiple test methods belonging to a given class.
- Reuse of test data and test logic via subclass inheritance

### Joint parametrization of multiple test methods belonging to a given class.

The pytest parametrization decorator, [`@pytest.mark.parametrize`](https://docs.pytest.org/en/6.2.x/parametrize.html), can be used to make inputs available to multiple methods within a class. In the code below, the inputs `param1` and `param2` are available to each of the methods `TestGroup.test_one` and `TestGroup.test_two`.

```python
# in file `test_class_parametrization.py`
import pytest

@pytest.mark.parametrize(
    ("param1", "param2"),
    [
        ("a", "b"),
        ("c", "d"),
    ],
)
class TestGroup:
    """A class with common parameters, `param1` and `param2`."""

    @pytest.fixture
    def fixt(self) -> int:
        """This fixture will only be available within the scope of TestGroup"""
        return 123

    def test_one(self, param1: str, param2: str, fixt: int) -> None:
        print("\ntest_one", param1, param2, fixt)

    def test_two(self, param1: str, param2: str) -> None:
        print("\ntest_two", param1, param2)
```

```
$ pytest -s test_class_parametrization.py
================================================================== test session starts ==================================================================
platform linux -- Python 3.8.6, pytest-6.2.1, py-1.10.0, pluggy-0.13.1
rootdir: /home/jbss
plugins: pylint-0.18.0
collected 4 items

test_class_parametrization.py
test_one a b 123
.
test_one c d 123
.
test_two a b
.
test_two c d
.

=================================================================== 4 passed in 0.01s ===================================================================
```

### Reuse of test data and test logic via subclass inheritance

I'll use a modified version of code taken from [another answer][1] to demonstrate the usefulness of inheriting class attributes/methods from `TestClass` to `TestSubclass`:

```python
# in file `test_inheritance.py`
class TestClass:
    VAR: int = 3
    DATA: int = 4

    def test_var_positive(self) -> None:
        assert self.VAR >= 0


class TestSubclass(TestClass):
    VAR: int = 8

    def test_var_even(self) -> None:
        assert self.VAR % 2 == 0

    def test_data(self) -> None:
        assert self.DATA == 4
```

Running `pytest` on this file causes **four** tests to be run:

```
$ pytest -v test_inheritance.py
=========== test session starts ===========
platform linux -- Python 3.8.2, pytest-5.4.2, py-1.8.1
collected 4 items

test_inheritance.py::TestClass::test_var_positive PASSED
test_inheritance.py::TestSubclass::test_var_positive PASSED
test_inheritance.py::TestSubclass::test_var_even PASSED
test_inheritance.py::TestSubclass::test_data PASSED
```

In the subclass, the inherited `test_var_positive` method is run using the updated value `self.VAR == 8`, and the newly defined `test_data` method is run against the inherited attribute `self.DATA == 4`. Such method and attribute inheritance gives a flexible way to re-use or modify shared functionality between different groups of test-cases.


[1]: https://stackoverflow.com/a/52044620/4256346
