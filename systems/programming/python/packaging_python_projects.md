# Packaging Python Projects

This will be a _to-the-point_ tutorial.

## Make sure our pip is on the latest

```python
python3 -m pip install --upgrade pip
```

> Might different depends on your distribution system.

## File structure

The structure:

```
some_repo_for_python_code/
└── src/
    └── some_repo_for_python_code/
        ├── __init__.py
        └── example.py
```

- Those contains:
  - `some_repo_for_python_code`, your name package of choice.
    > What is "of choice"? Your thing or person of choice is the one that you usually choose in a particular situation
  - `__init__.py` is required to import the directory as a package, and ~~should be empty~~, _if you know what you are doing_.
  - `example.py` is a module within the package _that could contain the logic_ (`Function`s, `Class`es, `Constant`s, etc.) of your package.

    For example(`.py`):

    ```python
    def the_one():
        return "1"
    ```

## Source

[Packaging Python Projects](https://packaging.python.org/en/latest/tutorials/packaging-projects/)
