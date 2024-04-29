# Teardown/Cleanup (AKA Fixture finalization)

Mine:
> of "How to use fixtures" [1].

..., TBA.

## Sekedar info sebelum dilanjut

> jadi kayak gini:

```python
@pytest.fixture
def some_fixture(another_fixture):
    # setup code
    yield something
    # teardown code
```

> dan dia gak ngasih class based test-nya. dahlah tinggalin aja, tulis test functions aja. kayak pake FBV aja (kalo di Django) jangan CBV, another topic eta mah.

## Source(s)

- [1]: [How to use fixtures](https://docs.pytest.org/en/8.2.x/how-to/fixtures.html)
  - [1.1]: [Teardown/Cleanup (AKA Fixture finalization)](https://docs.pytest.org/en/8.2.x/how-to/fixtures.html#teardown-cleanup-aka-fixture-finalization)
- [2]: [How do I correctly setup and teardown for my pytest class with tests?](https://stackoverflow.com/questions/26405380/how-do-i-correctly-setup-and-teardown-for-my-pytest-class-with-tests)
  - [2.1]: [Best answer](https://stackoverflow.com/a/39401087)
