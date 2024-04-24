# Towards Parametrizing Fixtures and Test Functions

A test function that implements parametrization -> checking multiple input leads to the expected output.

> sayangggg.

## For example, a case

Suppose we have a function:

- Email, Username, Password, Confirm Password
  1. Email's format is correct
  2. Email is unique
  3. Username's format is correct
  4. Username is unique
  5. Password == Confirm Password

## The syntax of `@pytest.mark.parametrize`

Taken from the docs [2]:
>
> ```python
> # content of test_expectation.py
> import pytest
> 
> 
> @pytest.mark.parametrize("test_input,expected", [("3+5", 8), ("2+4", 6), ("6*9", 54)])
> def test_eval(test_input, expected):
>     assert eval(test_input) == expected
> ```

## Creating some tests to check if mandatory fields are mandatory

Mine, maintenance:
> bikin bingung siah title-nya kayaknya.

cenah kurleb:
> some mandantory fields on `Product`, seperti `title` dan `discount_price` field, makanya test bahwa itu memang dan akan tetap selamanya begitu, kalau tidak, maka tidak valid.

For example, taken from [1.1.1]:

```python
import pytest
from core.app1.models import Product


@pytest.mark.parametrize(
    "title, category, description, slug, regular_price, discount_price, validity",
    [
        ("NewTitle", 1, "NewDescription", "slug", "4.99", "3.99", True),
        pytest.param("", 1, "NewDescription", "slug", "4.99", "3.99", False, marks=pytest.mark.xfail),
        pytest.param("NewTitle", None, "NewDescription", "slug", "4.99", "3.99", False, marks=pytest.mark.xfail),
        ("NewTitle", 1, "", "slug", "4.99", "3.99", True),
        pytest.param("NewTitle", 1, "NewDescription", "", "4.99", "3.99", False, marks=pytest.mark.xfail),
        pytest.param("NewTitle", 1, "NewDescription", "slug", "", "3.99", False, marks=pytest.mark.xfail),
        pytest.param("NewTitle", 1, "NewDescription", "slug", "4.99", "", False, marks=pytest.mark.xfail),
    ],
)
def test_product_instance(
    db, product_factory, title, category, description, slug, regular_price, discount_price, validity
):
    try:
        product_factory(
            title=title,
            category_id=category,
            description=description,
            slug=slug,
            regular_price=regular_price,
            discount_price=discount_price,
        )
    except:  # noqa: E722
        pass # !: but still fails wtf, on `8.1.1`.
    finally:
        item = Product.objects.all().count()
        print(item)
        assert item == validity
```

...

## Source(s)

- [1]: [Towards Parametrizing Fixtures and Test Functions](https://www.youtube.com/watch?v=APhI43fyRHI&list=PLOLrQ9Pn6caw3ilqDR8_qezp76QuEOlHY&index=8)
  - [1.1]: ...
    - [1.1.1]: [`test_ex5.py`](https://github.com/bal-sm/pytest-mastery-with-django/blob/bal_fixes/Part-4%20Parametrizing/tests/test_ex5.py)
- [2]: [`@pytest.mark.parametrize`: parametrizing test functions](https://docs.pytest.org/en/8.1.x/how-to/parametrize.html#pytest-mark-parametrize-parametrizing-test-functions)
