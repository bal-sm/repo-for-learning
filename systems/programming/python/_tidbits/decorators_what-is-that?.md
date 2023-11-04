# Decorators - What is that?

[By b001](https://www.youtube.com/watch?v=BE-L7xu8pO4)

```python
from functools import wraps
import time


def tictoc(func):
    @wraps(func)
    def wrapper():
        t1 = time.time()
        func()
        t2 = time.time() - t1
        print(f"{func.__name__} ran in" f" {t2} seconds")

    return wrapper


@tictoc
def do_this():
    time.sleep(1.3)


@tictoc
def do_that():
    time.sleep(0.4)


do_this()

do_that()

print("Done")
```

Kegunaan `functools.wraps()`, [from](https://docs.python.org/3/library/functools.html#functools.wraps):
> Without the use of this decorator factory, the name of the example function would have been 'wrapper', and the docstring of the original example() would have been lost.
