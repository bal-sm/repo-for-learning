# `:=`, walrus operator

- Available on >= Python 3.8
- allows you to assign a value to a variable within an expression.
- This can be useful when you need to use a value multiple times in a loop, but don’t want to repeat the calculation.
- can be used on `while` loops and `if` statements.
- > The assignment expressions allow a value to be assigned to a variable,
  - > me: "Assignment Expressions" teh apa gitu ya?
  - > even a variable that doesn’t exist yet,
  - > in the context of expression rather than as a _stand-alone statement_.

Syntax:

```python
variable := some_expression
```

## First example

```python
numbers = [1, 2, 3, 4, 5]

while (n := len(numbers)) > 0:
    print(numbers.pop())
```

Output:

```
5
4
3
2
1
```

Mine:
> tuh jadi gitu, kalau `while (n = len(numbers)) > 0:..` aja gak bisa kannn, soalnya artinya bisa goblok, makanya pake `:=`. easy.

## Second example - Python 3.7 (lack of `walrus` tea) vs. Python 3.8

```python
sample_data = [
    {"userId": 1,  "name": "rahul", "completed": False},
    {"userId": 1, "name": "rohit", "completed": False},
    {"userId": 1,  "name": "ram", "completed": False},
    {"userId": 1,  "name": "ravan", "completed": True}
]

print("With Python 3.8 Walrus Operator:")
for entry in sample_data:
    if name := entry.get("name"):
        print(f'Found name: "{name}"')

print("Without (Python 3.7 and less) Walrus operator:")
for entry in sample_data:
    name = entry.get("name")
    if name:
        print(f'Found name: "{name}"')
```

Output:

```
With Python 3.8 Walrus Operator:
Found name: "rahul"
Found name: "rohit"
Found name: "ram"
Found name: "ravan"
Without (Python 3.7 and less) Walrus operator:
Found name: "rahul"
Found name: "rohit"
Found name: "ram"
Found name: "ravan"
```

### Third example - With `input()`

```python
## The below example is without Walrus Operator
foods = list()
while True:
  food = input("What food do you like? ")
  if food == "quit":
    break
    foods.append(food)

# Below Approach uses Walrus Operator
foods1 = list()
while (food := input("What food do you like:=  ")) != "quit":
    foods1.append(food)
```

_Output skipped_, you get it, it can be used with `input()` too.

Mine, learning note:
> Don't read explanation from the original source, rancu.

## Source(s)

- [1]: [Walrus Operator in Python 3.8](https://www.geeksforgeeks.org/walrus-operator-in-python-3-8/)
