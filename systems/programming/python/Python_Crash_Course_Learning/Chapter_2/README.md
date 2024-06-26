# Chapter 2 - VARIABLES AND SIMPLE DATA TYPES

Variable is a label for a value/a string/data, rather than a box for a value. This is important to grasp the concept of variable even more.

## Strings

### _Name Changing_ Methods

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

### f-strings

#### 1

```python
first_name = "Katy"
last_name = "Perry"

full_name = f"{first_name} {last_name}"

# terus bisa gini
print(f"Hello, {full_name.title()}!")
```

#### 2

```python
artist = "Miley Cyrus"
album = f"{artist} and Her Dead Petz"

print(f"omg his new album, {album}, is so good!")
```

### Adding Whitespace to Strings with Tabs or Newlines

In programming, whitespace refers to any nonprinting characters, such as spaces, tabs, and end-of-line symbols.

#### 1

```python
print("\tPython")
```

#### 2

```python
print("Languages:\nPython\nC\nToyLanguage")
```

### Stripping Whitespace

#### With `.rstrip()`

To alter a whole string permanently:

```python
favorite_language = 'python '
favorite_language = favorite_language.rstrip()
favorite_language
# Output: 'python'
```

Mine:
> omG, kalo di Django ada clean method, wow very clean.

#### Other methods

```python
>>> favorite_language = ' python '
>>> favorite_language.rstrip()
' python'
>>> favorite_language.lstrip()
'python '
>>> favorite_language.strip()
'python'
```

### Removing prefixes

```python
>>> nostarch_url = 'https://nostarch.com'
>>> nostarch_url.removeprefix('https://')
'nostarch.com'

# If you want to keep the new value
>>> simple_url = nostarch_url.removeprefix('https://')
```

Them:
> When you see a URL in an address bar and the `https://` part isn’t shown, the browser is probably using a method like `removeprefix()` behind the scenes.

### Avoiding Syntax Errors with Strings

_Syntax error because `"`/`'`_

The correct way to use `"` and `'`:

```python
message = "One of Python's strengths is its diverse community."
print(message)
# Output: One of Python's strengths is its diverse community.
```

However, if you use single quotes:

```python
message = 'One of Python's strengths is its diverse community.' # ❌
print(message)
```

You'll see the following output:

```
  File "apostrophe.py", line 1
    message = 'One of Python's strengths is its diverse community.'
                                                                ❶ ^
SyntaxError: unterminated string literal (detected at line 1)
```

Them:
> In the output you can see that the error occurs right after the final single quote ❶. ..

Them, a note:
> Your editor’s syntax highlighting feature should help you spot some syntax errors quickly as you write your programs. If you see Python code highlighted as if it’s English or English highlighted as if it’s Python code, you probably have a mismatched quotation mark somewhere in your file.

### Try It Yourself

#### 2-5 + 2-6

1. Find a quote from a famous person
2. Print the quote and the name of its author
3. Represent the famous person’s name using a variable

```python
my_name = "Iqbal Syifa Mahmuda"

quote = f"{my_name} once said, \"Karena saya literally menciptakan listrik, somehow I'm one of you.\""

print(quote)
```

#### 2-8

- Python has a removesuffix() method.
  - Try it!

```python
file_name = "python_notes.txt"

clean_file_name = file_name.removesuffix(".txt")
```

## Numbers

### Integers

```python
>>> 2 + 3 # addition
5
>>> 3 - 2 # subtraction
1
>>> 2 * 3 # multiplification
6
>>> 3 / 2 # division
1.5
```

Exponential:

```python
>>> 3 ** 2 # 3^2
9
>>> 3 ** 3 # 3^3
27
>>> 10 ** 6 # 10^6
1000000
```

You can also use parentheses:

```python
>>> 2 + 3*4
14
>>> (2 + 3) * 4
20
```

### Floats

Them:
> Python calls any number with a decimal point a float. This term is used in most programming languages, and it refers to the fact that a decimal point can appear at any position in a number. Every programming language must be carefully designed to properly manage decimal numbers so numbers behave appropriately, no matter where the decimal point appears.
>
> For the most part, you can use floats without worrying about how they behave.

```python
>>> 0.1 + 0.1
0.2
>>> 0.2 + 0.2
0.4
>>> 2 * 0.1
0.2
>>> 2 * 0.2
0.4
```

Them:
> However, be aware that you can sometimes get an arbitrary number of decimal places in your answer:

```python
>>> 0.2 + 0.1
0.30000000000000004
>>> 3 * 0.1
0.30000000000000004
```

Them:
> This happens in all languages and is of little concern. Python tries to find a way to represent the result as precisely as possible, which is sometimes difficult given how computers have to represent numbers internally. Just ignore the extra decimal places for now; you’ll learn ways to deal with the extra places when you need to in the projects in Part II.

### Integers and Floats

Any two numbers -divided-> a float (always):

```python
>>> 4/2
2.0
```

If you mix an integer and a float in any other operation, you’ll get a float as well:

```python
>>> 1 + 2.0
3.0
>>> 2 * 3.0
6.0
>>> 3.0 ** 2
9.0
```

Them:
> Python defaults to a float in any operation that uses a float, even if the output is a whole number.

### Underscores in Numbers

You can group digits using underscores to make large numbers more readable:

```python
>>> universe_age = 14_000_000_000
```

When you print a number that was defined using underscores, Python prints only the digits:

```python
>>> print(universe_age)
14000000000
```

Them:
> Python ignores the underscores when storing these kinds of values. Even if you don’t group the digits in threes, the value will still be unaffected. To Python, 1000 is the same as 1_000, which is the same as 10_00. This feature works for both integers and floats.

## Multiple Assignment

```python
>>> x, y, z = "something", 42, "something else"
>>> z
'something else'
>>> y
42
>>> x
'something'
```

## Constants

Them:
> A _constant_ is a variable whose value stays the same throughout the life of a program. Python doesn’t have built-in constant types, but Python programmers use all capital letters to indicate a variable should be treated as a constant and never be changed:

```python
MAX_CONNECTIONS = 5000
```

## Try It Yourself 2

### 2-10

```python
my_favorite_number = 1
quote = f"My favorite number is {my_favorite_number}."
print(quote)
```

## Comments

### How Do You Write Comments

Using hash mark (#):

`comment.py`:

```python
# Say hello to everyone.
print("Hello Python people!")
```

Output:

```
Hello Python people!
```

Them:
> Python ignores the first line and executes the second line.

## The Zen of Python

Few lines of "The Zen of Python" by Tim Peters:

```python
>>> import this
```

> The Zen of Python, by Tim Peters

> Beautiful is better than ugly.

> Simple is better than complex.

> Complex is better than complicated.

> Readability counts.

> There should be one-- and preferably only one --obvious way to do it.

> Now is better than never.

## Summary

Them, modified:
> In this chapter you learned:
> - how to work with variables. 
> - You learned to use descriptive variable names and resolve name errors and syntax errors when they arise.
> - You learned what strings are and how to display them using lowercase, uppercase, and title case.
> - You started using whitespace to organize output neatly, and you learned how to remove unneeded elements from a string.
> - You started working with integers and floats, and you learned some of the ways you can work with numerical data.
> - You also learned to write explanatory comments to make your code easier for you and others to read.
> - Finally, you read about the philosophy of keeping your code as simple as possible, whenever possible.
>
> In Chapter 3, you’ll learn:
> - how to store collections of information in data structures called _lists_. 
> - You’ll also learn how to work through a list, manipulating any information in that list.

## Notes

Mine, 2024-03-24, 8:46:48 PM:
> Pokoknya approach-nya langsung tulis aja kodenya kesini. Terus masukin some notes aja jika diperlukan.

Mine, 2024-03-29, 2:13 PM:
> Sectioning nya freestyle daripada ngikutin bukunya.
