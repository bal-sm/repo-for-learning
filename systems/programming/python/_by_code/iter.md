# `iter(something)` - WIP

Kenapa kepikiran ngerangkum ini:
> Soalnya habis baca ini -> <https://peps.python.org/pep-3132/> -> <https://peps.python.org/pep-3132/#rationale> -> `iter(seq)`.

Maintenance note:
> Percantik lagi sectioning-nya.

## What is it?

The `iter()` method returns an [iterator](#what-is-iterators) for the given argument.

Example:

```python
# list of vowels
phones = ['apple', 'samsung', 'oneplus']
phones_iter = iter(phones)

print(next(phones_iter))   
print(next(phones_iter))    
print(next(phones_iter))    

# Output:
# apple
# samsung
# oneplus
```

## What is "Iterators" [2]

- Iterators are methods that iterate collections like:
  - lists,
  - tuples,
  - etc.
- Using an iterator method, we can loop through an object and return its elements.
- Technically, _a Python iterator object_ must implement two special methods:
  - `__iter__()` and
  - `__next__()`, collectively called the **iterator protocol**.

Learning note:
> Udah we yang dari [2] mau dike sini-in aja.

## Iterating Through an Iterator

We can use `next()` function to return the next item in the sequence.

```python
# define a list
my_list = [4, 7, 0]

# create an iterator from the list
iterator = iter(my_list)

# get the first element of the iterator
print(next(iterator))  # prints 4

# get the second element of the iterator
print(next(iterator))  # prints 7

# get the third element of the iterator
print(next(iterator))  # prints 0
```

Output:

```
4
7
0
```

### Using for Loop

```python
# define a list
my_list = [4, 7, 0]

for element in my_list:
    print(element)
```

Output:

```
4
7
0
```

## ...

...

## Source(s)

- [Python `iter()`](https://www.programiz.com/python-programming/methods/built-in/iter)
- [2]: [Python Iterators](https://www.programiz.com/python-programming/iterator)

Mine:
> omG siah aing. <www.programiz.com>. Harus sering-sering.
