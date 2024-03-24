# Chapter 2 - VARIABLES AND SIMPLE DATA TYPES

Variable is a label for a value/a string/data, rather than a box for a value. This is important to grasp the concept of variable even more.

## _Name Changing_ Methods

- `.title()`
  - Titling case a string
  - Example: `Jim The Cult Leader`
- `.upper()`
  - Uppercase a string
  - Example: `Jim the drug dealer`
- `.lower()`
  - Lowercase a string
  - Example: `oh my lord`
- `.strip()`
  - To strip extra whitespace on a string
  - Example: ` python  ` -> `python` 
  - Variation:
    - `.lstrip()`
    - `.rstrip()`
- `.removeprefix()`
  - To remove a prefix
  - Example:

    ```python
    nostarch_url = 'https://nostarch.com'
    simple_url = nostarch_url.removeprefix('https://')
    print(simple_url)
    # Output: 'nostarch.com'
    ```

## f-strings

### 1

```python
first_name = "Katy"
last_name = "Perry"

full_name = f"{first_name} {last_name}"

# terus bisa gini
print(f"Hello, {full_name.title()}!")
```

### 2

```python
artist = "Miley Cyrus"
album = f"{artist} and Her Dead Petz"

print(f"omg his new album, {album}, is so good!")
```

## Adding Whitespace to Strings with Tabs or Newlines

In programming, whitespace refers to any nonprinting characters, such as spaces, tabs, and end-of-line symbols.

### 1

```python
print("\tPython")
```

### 2

```python
print("Languages:\nPython\nC\nToyLanguage")
```

## Stripping Whitespace

### With `.rstrip()`

To alter a whole string permanently:

```python
favorite_language = 'python '
favorite_language = favorite_language.rstrip()
favorite_language
# Output: 'python'
```

Mine:
> omG, kalo di Django ada clean method, wow very clean.

### Other methods

```python
>>> favorite_language = ' python '
>>> favorite_language.rstrip()
' python'
>>> favorite_language.lstrip()
'python '
>>> favorite_language.strip()
'python'
```

## Removing prefixes

```python
>>> nostarch_url = 'https://nostarch.com'
>>> nostarch_url.removeprefix('https://')
'nostarch.com'

# If you want to keep the new value
>>> simple_url = nostarch_url.removeprefix('https://')
```

Them:
> When you see a URL in an address bar and the `https://` part isn’t shown, the browser is probably using a method like `removeprefix()` behind the scenes.

## Avoiding Syntax Errors with Strings

_Syntax error because `"`/`'`_

The correct way to use `"` and `'`:

```python
message = "One of Python's strengths is its diverse community."
print(message)
# Output: One of Python's strengths is its diverse community.
```

However, if you use single quotes:

```python
message = 'One of Python's strengths is its diverse community.'
print(message)
```

...

## Notes

Mine, 2024-03-24, 8:46:48 PM:
> Pokoknya approach-nya langsung tulis aja kodenya kesini. Terus masukin some notes aja jika diperlukan.
