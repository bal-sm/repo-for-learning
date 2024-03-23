# `return`, and Python's other keywords

Maintenance note:
> Harus dibikin di `_tidbits` ih.

## Q&A 1

### Question

bal-sm (me):
> Can you explain all of Python's keyword such as `return`?

Mine:
> Copilot used a file from my notes as reference, if it matters.

### Answer

GitHub Copilot:
> Sure, here's a brief explanation of Python's `return` keyword:

- The `return` keyword in Python is
  - used to **exit** a function and **return a value**.
  - When the `return` statement is executed, **the function terminates immediately**.
  - _Optional read_:
    - If the `return` statement is **without any expression**,
      - then the special value `None` is returned.
    - If there is **no `return` statement** _in the function code_,
      - > ya, berarti `return` keyword is a must on any function, ya, pastinya ada exception.
        - > you need to quit it gening.
      - the function **will end**,
        - when the control flow:
          - > _event loop atau apa gening, pokoknya yang bikin program jalan terus, sampe user "udah ah" -> exit (meureunnn)_
          - reaches the end of the function body and `None` will be returned.

Here are some other Python keywords and their brief explanations:

- `def`: This keyword is used to declare functions in Python.
- `if`, `elif`, `else`: These keywords are used for conditional branching or decision making.
- `for`, `while`: These keywords are used for looping. `for` is used for iterating over a sequence (like a list or a string) or other iterable objects. `while` is used for repeated execution as long as an expression is true.
- `break`: This keyword is used to break out of the smallest enclosing loop.
- `continue`: This keyword is used to skip the rest of the code inside the enclosing loop for the current iteration only.
- `class`: This keyword is used to declare user-defined classes.
- `try`, `except`, `finally`: These keywords are used for exception handling. `try` block is used for the code that can raise an exception, `except` block is used to catch and handle the exception and `finally` block is used to declare the code that must be executed regardless of whether an exception has occurred or not.

Dia:
> Remember, Python keywords are case sensitive.

## Q&A 2

### Question

bal-sm:
> Give me Python's code example which utilize `return`, `break`, `continue`, `try`, `except`, and `finally`.

### Answer

GitHub Copilot:
> Sure, here is a Python code example that utilizes `return`, `break`, `continue`, `try`, `except`, and `finally`.

```python
def process_numbers(numbers):
    for i in numbers:
        if i < 0:
            return "Negative number detected"  # return statement
        try:  # try statement
            if i == 0:
                break  # break statement
            elif i % 2 == 0:
                continue  # continue statement
            else:
                print(i)
        except TypeError:  # except statement
            print("Non-numeric value detected")
        finally:  # finally statement
            print("End of processing")

numbers = [1, 2, 3, 0, -1, "a"]
print(process_numbers(numbers))
```

Ignore:

```{note}
In this code, the function `process_numbers` takes a list of numbers as input. It iterates over each number in the list. If a negative number is detected, it immediately returns a message and stops execution. If the number is zero, it breaks the loop. If the number is even, it skips the rest of the loop and continues with the next iteration. If the number is odd, it prints the number. If a non-numeric value is encountered, it catches the `TypeError` and prints a message. Regardless of whether an exception was raised or not, it prints "End of processing" at the end of each iteration.
```
