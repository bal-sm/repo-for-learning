# Assertions about expected exceptions - Mahmuda's version

In order to write assertions about raised exceptions, you can use:

---

[`pytest.raises()`](https://docs.pytest.org/en/8.1.x/reference/reference.html#pytest.raises) as a context manager like this:

```python
import pytest


def test_zero_division():
    with pytest.raises(ZeroDivisionError):
        1 / 0
```

---

and if you need to have access to the actual exception info you may use:

```python
def test_recursion_depth():
    with pytest.raises(RuntimeError) as excinfo:

        def f():
            f()

        f()
    assert "maximum recursion" in str(excinfo.value)
```

- `excinfo` is an [`ExceptionInfo`](https://docs.pytest.org/en/8.0.x/reference/reference.html#pytest.ExceptionInfo) instance,
  - which is a wrapper around the actual exception raised.
  - The main attributes of interest are:
    - `.type`,
    - `.value` and
    - `.traceback`.

---

- Note that `pytest.raises` will match:
  - the exception type or
    - ex: `RuntimeError`
  - any subclasses
    - ex: Django's `ValidationError` (which is a subclass of `ValueError`, meureun)
  - (like the standard `except` statement).

If you want to check if a block of code is raising *an exact* exception type, you need to check that explicitly:

```python
def test_foo_not_implemented():
    def foo():
        raise NotImplementedError

    with pytest.raises(RuntimeError) as excinfo:
        foo()
    assert excinfo.type is RuntimeError
```

The [`pytest.raises()`](https://docs.pytest.org/en/8.1.x/reference/reference.html#pytest.raises) call will succeed, even though the function raises [`NotImplementedError`](https://docs.python.org/3/library/exceptions.html#NotImplementedError), because [`NotImplementedError`](https://docs.python.org/3/library/exceptions.html#NotImplementedError) is a subclass of [`RuntimeError`](https://docs.python.org/3/library/exceptions.html#RuntimeError); however the following `assert` statement will catch the problem.

Mine:
>
> ```python
> class NotImplementedError(RuntimeError)
> ```
>
> therefore, test di atas correct.

## Source

- [Assertions about expected exceptions](https://docs.pytest.org/en/8.1.x/how-to/assert.html#assertions-about-expected-exceptions)
