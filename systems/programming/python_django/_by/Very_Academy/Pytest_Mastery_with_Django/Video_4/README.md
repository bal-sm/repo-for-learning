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

## Creating some tests to check if mandatory fields are mandatory

Mine, maintenance:
> bikin bingung siah title-nya kayaknya.

cenah kurleb:
> some mandantory fields on `Product`, seperti `title` dan `discount_price` field, makanya test bahwa itu memang dan akan tetap selamanya begitu, kalau tidak, maka tidak valid.

Taken from the docs:
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

...
