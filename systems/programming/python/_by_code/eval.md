# `eval()`

The `eval()` function evaluates the specified expression, if the expression is a legal Python statement, it will be executed.

```python
eval(expression, globals, locals) 
```

Parameter Values:
- `expression`
  - A String, that will be evaluated as Python code
- `globals`
  - Optional. A dictionary containing global parameters
- `locals`
  - Optional. A dictionary containing local parameters

## Example(s)

### 1

```python
x = 'print(55)'
eval(x)
```

### 2

```python
x = "6+9"
print(eval(x))
```

...

Mine, TBA, maintenance:
> Kasih contoh pake `globals` sama `locals` tea.
