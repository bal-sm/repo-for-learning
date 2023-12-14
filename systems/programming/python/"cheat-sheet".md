# Python's "Cheat-sheet"

- `super().method(arg)`
  - ~~`super(`**`C, self`**`).method(arg)`~~
    - > gak perlu.
  - Example:

  ```python
      def __init__(self, *args, **kwargs):
          super().__init__(*args, **kwargs)
          ...
  ```

...

## Source(s)

- [1]: [Built-in Functions](https://docs.python.org/3/library/functions.html)
  - [1.1]: [`super` class](https://docs.python.org/3/library/functions.html#super)
