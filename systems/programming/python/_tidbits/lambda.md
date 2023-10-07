# Python Lambda

A lambda function is a small anonymous function.

A lambda function can take any number of arguments, but can only have one expression.

`lambda arguments : expression`

## Examples

`1.`

```python
plus_ten = lambda a : a + 10
print(plus_ten(5))
```

`2.`

```python
multiply_these_two = lambda a, b : a * b
print(multiply_these_two(5, 6))
```

`3.`

```python
plus_these_three = lambda a, b, c : a + b + c
print(plus_these_three(5, 6, 2))
```

Mine:
> Don't write these like w3schools. `x` is more like a variable rather than a (nonymous) function.

## Why Use Lambda Functions?

TL;DR:
> The power of lambda is better shown when you use them as an anonymous function inside another function.

Lanjutan in Indonesia:
> Jadinya kalau dipanggil nih suatu `function` yang `return`-nya pake `lambda`, terus besoknya bisa dipanggil lagi sama pake `argument` lagi

Example:

```python
def the_function(n):
    return lambda a : a * n

another_function = the_function(17171778314) # 17171778314 teh number, you can see it.

anoder_function_just_to_make_it_clear = the_function(8) # sama ini juga.

hasil_af = another_function(2)
print(hasil_af)

hasil_afjtmic = anoder_function_just_to_make_it_clear(3)
# there's a
print(hasil_afjtmic) # hour in a day.
```

## Source

[Python Lambda](https://www.w3schools.com/python/python_lambda.asp)
