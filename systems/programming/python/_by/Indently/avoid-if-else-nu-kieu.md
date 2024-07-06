# [AVOID "if-else" Hell In Python With THIS Simple Trick](https://www.youtube.com/watch?v=hWTTfPc2XsQ)

> Thanks to him, Indently!

## Before - Don't do this ❌

```python
def first():
    print('Calling: first')


def second():
    print('Calling: second')


def third():
    print('Calling: third')


def default():
    print('Calling: default')


var: int = 0

if var == 0:
    first()
elif var == 1:
    second()
elif var == 2:
    third()
else:
    default()
```

Output:

```
Calling: first
```

## After - Do this ✅

```python
def first():
    print("Calling: first")


def second():
    print("Calling: second")


def third():
    print("Calling: third")


def default():
    print("Calling: default")


var: int = 0

funcs = {
    0: first,
    1: second,
    2: third,
}

funcs.get(var, default)()
```

Mine:
> Remember that `function` declaration is working in anyway type of form of declaring. It's not written as a string!

Mine, 2:
> And also, that dictionary (which contains those `function`s declaration) can be also processed easily (with `dict` methods).

### Side note

Mine:
> ih dia mah tapi gini.

```python
# ...

final = funcs.get(var, default)
final()
```

Mine:
> jadinya memang lebih clean sih. you should write callable as a variable first, 'cause it can be ran multiple times..
