# How to put fixtures as plugins locally

Mine, maintenance:
> Da ini teh rangkuman versi saya, harusnya di folder `_by` atau gimana?

## Quick Summary

Mine:
> aja lah, singkat-singkat. da atuh ditinggalin lupa.

1. Create a `conftest.py` file in the same directory as your test files.
2. Define your `pytest_plugins`:

   ```python
   pytest_plugins = [
       "app_one.tests.as_plugin",
       "app_two.tests.as_plugin",
       "app_three.tests.as_plugin",
   ]
   ```

3. Create those `as_plugin.py` files..
4. And put your fixtures in those files..
5. And those fixtures are shared across the entire project.
6. For example:

   ```python
   # app_one/tests/as_plugin.py
   import pytest

   @pytest.fixture
   def my_first_fixture():
       return "my_first_fixture_on_app_1"
   ```

   ```python
   # app_two/tests/test_from_app_one.py

   def test_the_return(my_first_fixture):
       assert my_first_fixture="my_first_fixture_on_app_1"
   ```

Mine, maintenance:
> Rapihin atau lanjutin atau gimanalah, sayanggg..

## ...

..., TBA.

## Source(s)

- [1]: [pytest fixtures in a separate directory on Stackoverflow](https://stackoverflow.com/questions/32567306/pytest-fixtures-in-a-separate-directory)
  - [1.1]: [#1 answer](https://stackoverflow.com/a/54736376)
    - -> [2.1]
  - [1.2]: [#2 answer](https://stackoverflow.com/a/32644348)
    - -> [3.2]
- [2]: [How and where does py.test find fixtures on Stackoverflow](https://stackoverflow.com/questions/13641973/how-and-where-does-py-test-find-fixtures)
  - [2.1]: [That answer](https://stackoverflow.com/a/54736237)
    - [Cenah](https://github.com/pytest-dev/pytest/issues/3039#issuecomment-464489204)
- [3], `pytest` docs
  - [3.1]: [Requiring/Loading plugins in a test module or conftest file](https://docs.pytest.org/en/8.2.x/how-to/plugins.html#requiring-loading-plugins-in-a-test-module-or-conftest-file)
  - [3.2]: [Choosing a test layout](https://docs.pytest.org/en/8.2.x/explanation/goodpractices.html#choosing-a-test-layout)
  - [3.3]: [`pytest_plugins`](https://docs.pytest.org/en/8.2.x/reference/reference.html#globalvar-pytest_plugins)
  - [3.4]: [`conftest.py`: sharing fixtures across multiple files](https://docs.pytest.org/en/latest/reference/fixtures.html#conftest-py-sharing-fixtures-across-multiple-files)

Mine, learning + maintenance note:
> EUrrghh pusing euy, pake yang "blabla#blabla" aja daripada "a/number-teu-puguh-yang-aku-gak-kenal".
