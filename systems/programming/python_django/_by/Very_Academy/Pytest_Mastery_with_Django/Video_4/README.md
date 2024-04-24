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

...

## Source(s)

- [1]: [Towards Parametrizing Fixtures and Test Functions](https://www.youtube.com/watch?v=APhI43fyRHI&list=PLOLrQ9Pn6caw3ilqDR8_qezp76QuEOlHY&index=8)
- [2]: [`@pytest.mark.parametrize`: parametrizing test functions](https://docs.pytest.org/en/8.1.x/how-to/parametrize.html#pytest-mark-parametrize-parametrizing-test-functions)
