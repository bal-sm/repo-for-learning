# `iter(something)` - WIP

Kenapa kepikiran ngerangkum ini:
> Soalnya habis baca ini -> <https://peps.python.org/pep-3132/> -> <https://peps.python.org/pep-3132/#rationale> -> `iter(seq)`.

Maintenance note:
> Percantik lagi sectioning-nya.

## What is it?

The `iter()` method returns an [iterator](#what-is-iterators-2) for the given argument.

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

### Working of `for` loop for Iterators

Alt. title:
> Using for Loop alt. 2

```python
# create a list of integers
my_list = [1, 2, 3, 4, 5]

# create an iterator from the list
iterator = iter(my_list)

# iterate through the elements of the iterator
for element in iterator:

    # Print each element
    print(element)
```

## Building Custom Iterators

- Building an iterator from scratch is easy in Python.
  - We just have to implement the:
    - `__iter__()` and
      - `__iter__()` returns the iterator object itself. If required, some initialization can be performed.
    - the `__next__()` methods.
      - `__next__()` must return the next item in the sequence. On reaching the end, and in subsequent calls, _it must raise `StopIteration`_.

```python
class PowTwo:
    """Class to implement an iterator
    of powers of two"""

    def __init__(self, max=0):
        self.max = max

    def __iter__(self):
        self.n = 0
        return self

    def __next__(self):
        if self.n <= self.max:
            result = 2 ** self.n
            self.n += 1
            return result
        else:
            raise StopIteration


# create an object
numbers = PowTwo(3)

# create an iterable from the object
i = iter(numbers)

# Using next to get to the next iterator element
print(next(i)) # prints 1
print(next(i)) # prints 2
print(next(i)) # prints 4
print(next(i)) # prints 8
print(next(i)) # raises StopIteration exception
```

Output:

```
1
2
4
8
Traceback (most recent call last):
  File "<string>", line 32, in <module>
File "<string>", line 18, in __next__
StopIteration
```

Mine, learning note:
> Itu Traceback bukan berupa error though.

```python
for i in PowTwo(3):
    print(i)
```

Output:

```
1
2
4
8
```

## Python Infinite Iterators

```python
from itertools import count

# create an infinite iterator that starts at 1 and increments by 1 each time
infinite_iterator = count(1)

# print the first 5 elements of the infinite iterator
for i in range(5):
    print(next(infinite_iterator))
```

Output:

```
1
2
3
4
5
```

Mine, cuman buat saya, note:
> nu `yield` `yield` tea gening di Computerphile.

## `iter()` Syntax

The syntax of the `iter()` method is:

```python
iter(object, sentinel [optional])
```

The parameters:
- `object` - can be a list, set, tuple, etc.
- `sentinel [optional]` - a special value that is used to represent the end of a sequence
  - example: `iter(DoubleIt(), 16)` -> jadinya: 2, 4, 8, ~~16~~.

The `iter()` method returns:
- iterator object for the given argument until _the sentinel character is found_.
- **`TypeError`** for a user-defined object that doesn't implement `__iter__()`, and `__next__()` or `__getitem()__`

## Example 1: Python `iter()`

```python
# list of vowels
vowels = ["a", "e", "i", "o", "u"]

# iter() with a list of vowels
vowels_iter = iter(vowels)

print(next(vowels_iter))
print(next(vowels_iter))
print(next(vowels_iter))
print(next(vowels_iter))
print(next(vowels_iter))
```

Output:

```
a
e
i
o
u
```

## Example 2: `iter()` for custom objects

```python
class PrintNumber:
    def __init__(self, max):
        self.max = max

# iter() method in a class
    def __iter__(self):
        self.num = 0
        return self

# next() method in a class 
    def __next__(self):
        if(self.num >= self.max):
            raise StopIteration
        self.num += 1
        return self.num

print_num = PrintNumber(3)

print_num_iter = iter(print_num)
print(next(print_num_iter))  # 1
print(next(print_num_iter))  # 2
print(next(print_num_iter))  # 3

# raises StopIteration
print(next(print_num_iter))
```

Output:

```
1
2
3
Traceback (most recent call last):
  File "", line 23, in 
File "", line 11, in __next__
StopIteration
```

## Example 3: `iter()` with Sentinel Parameter

```python
class DoubleIt:

    def __init__(self):
        self.start = 1

    def __iter__(self):
        return self

    def __next__(self):
        self.start *= 2
        return self.start

    __call__ = __next__
    
my_iter = iter(DoubleIt(), 16)

for x in my_iter:
    print(x)
```

Output:

```
2
4
8
```

Mine, learning note:
> Gak ada `StopIteration` soalnya gak diimplementasikan. Eh ketang cenah "At this point in the code, the program will raise a StopIteration automatically."

Them, skip aja atau gak tau ketang:
> In the above example, we haven't implemented a `StopIteration` condition.
>
> Instead, we have used the `iter()` method with a sentinel parameter to stop the iteration:
>
> ```python
> my_iter = iter(DoubleIt(), 16)
> ```
>
> The value of the sentinel parameter here is *16* so the program will stop when the value from the `__next__()` method is equal to this number.
>
> At this point in the code, the program will raise a `StopIteration` automatically. 

## Note(s)

Them:
> Recommended Reading: (cenah)
> - [Python Iterators](https://www.programiz.com/python-programming/iterator)
>   - > ada di sini.
> - [Python `next()`](https://www.programiz.com/python-programming/methods/built-in/next)
>   - > belum dirangkum, maintenance, aja.

## Source(s)

- [Python `iter()`](https://www.programiz.com/python-programming/methods/built-in/iter)
- [2]: [Python Iterators](https://www.programiz.com/python-programming/iterator)

Mine:
> omG siah aing. <www.programiz.com>. Harus sering-sering.
