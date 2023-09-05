# Chapter 3

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

## f-strings

```python
first_name = "Katy"
last_name = "Perry"

full_name = f"{first_name} {last_name}"

# terus bisa gini
print(f"Hello, {full_name.title()}!")
```

## `.rstrip()`

To alter a whole string permanently:

```python
favorite_language = 'python '
favorite_language = favorite_language.rstrip()
favorite_language
# Output: 'python'
```

## Codes

[`mengurangi_ketidaksetaraan.py`](mengurangi_ketidaksetaraan.py)

[`stringz.ipynb`](stringz.ipynb)
