# Packaging Python Projects

This will be a _to-the-point_ tutorial. Based on Python Packaging User Guide » Tutorials » Packaging Python Projects[^1]

## Make sure our pip is on the latest

```python
python3 -m pip install --upgrade pip
```

> Might different depends on your distribution system.

## File structure

Let's use mine as tutorial.

[bismillah_on_py](https://github.com/bal-sm/bismillah_on_py)

The structure:

```
bismillah_on_py/
├── .gitignore
├── LICENSE
├── pyproject.toml
├── README.md
├── src/
│   └── bismillah_on_py/
│       ├── __init__.py
│       └── bismillah.py
└── tests/
```

- Those contains:
  - `bismillah_on_py`, this is my name package of choice. 
    > What is "of choice"? Your thing or person of choice is the one that you usually choose in a particular situation
    > So, choose yours.
  - `__init__.py` is required to import the directory as a package, and ~~should be empty~~, _if you know what you are doing_.
  - `bismillah.py` is my module within the package _that could contain the logic_ (`Function`s, `Class`es, `Constant`s, etc.) of my package. 
    Here's my `bismillah.py` content:

    ```python
    the_sentence = "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"


    def print_them():
        print(the_sentence)
    ```

  - `tests/` is a folder for test files. 
    > Leave it empty, if you don't know what it is. But keep the folder.
  - `pyproject.toml` tells _frontend_ build tools like `pip` and build what _backend_ tool to use _to create distribution packages_ for your project.
    > I use poetry. Build your own `pyproject.toml` using `poetry init` command. Poetry's `pyproject.toml` will be explained below.
  - `README.md`.
    > A `m`ah`d`i file. Just see <systems/programming/md/styles.md> as a guide. and _use a text editor_.
  - `LICENSE` tells users who install your package the terms under which they can use your package.

    Notes:
    > For help picking a license, see <https://choosealicense.com/>.
    
    And,

    > I use MIT for this package.

### Poetry's `pyproject.toml`

Here's the content _with added some explanation_[^2]:

```python
[tool.poetry]
# name
name = "bismillah_on_py"
# The name of the package. This should be a valid name as defined by PEP 508. Required
# version
version = "1.0.1"
# The version of the package. This should be a valid PEP 440 string. Required
# description
description = "as `the_sentence`, and `print_them` function." 
# A short description of the package. Required
# authors
authors = ["Iqbal Syifa Mahmuda <bal.mahmuda@gmail.com>", "اللّٰه"] 
# The authors of the package. This is a list of authors and should contain at least one author. Authors must be in the form name <email>. Required
# license
license = "MIT"
# The license of the package.
# readme
readme = "README.md"
# A path, or list of paths corresponding to the README file(s) of the package. Optional
# packages
packages = [{include = "bismillah_on_py", from = "src"}]
# A list of packages and modules to include in the final distribution.

[tool.poetry.dependencies]
python = "^3.7"


[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"
```

## Generating distribution archives

- The next step is _to generate distribution packages_ for the package. 
  - These are _archives that are uploaded_ to the Python Package Index and 
  - can be installed by `pip`.

Source Distribution (or `sdist`), from Glossary:
> A distribution format (usually generated using `python setup.py sdist`) that _provides metadata and the essential source files needed_ for installing by a tool like `pip`, or for generating a Built Distribution.

Make sure you have the latest version of PyPA’s build installed:

```sh
pipx install build
pipx upgrade build
```

> I use `pipx`, make sure you have done whatever `pipx` told you so after installing or running `pipx` for the first time.

Then run this command _from the same directory where `pyproject.toml` is located_:

```sh
pyproject-build
```

> Maybe something is different between `pip` and `pipx`. In my case, build with `pyproject-build` command. If it fails to do so, refer to Poetry documentaion. Hm.

This command should output a lot of text and once completed should generate two files in the dist directory:

```
dist/
├── bismillah_on_py-1.0.1-py3-none-any.whl
└── bismillah_on_py-1.0.1.tar.gz
```

- Here's the explanation of those two files:
  - The `tar.gz` file is a source distribution 
  - whereas the `.whl` file is a built distribution. 

Cenah:
> Newer `pip` versions preferentially install built distributions, but will fall back to source distributions if needed. You should always upload a source distribution and provide built distributions for the platforms your project is compatible with. In this case, our example package is compatible with Python on any platform so only one built distribution is needed.

## Uploading the distribution archives

Change directory to `dist` and run this command:

```sh
twine upload *
```

> Use TestPyPI if it's a test package.[^1.1]

## Installing your newly uploaded package

```sh
pip install bismillah_on_py
```

## Source

[^1]: [Packaging Python Projects](https://packaging.python.org/en/latest/tutorials/packaging-projects/)

[^1.1]: [Uploading the distribution archives](https://packaging.python.org/en/latest/tutorials/packaging-projects/#uploading-the-distribution-archives)

[^2]: [Poetry's pyproject.toml file](https://python-poetry.org/docs/pyproject/)
