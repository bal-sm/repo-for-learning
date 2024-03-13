# `iter(something)` - WIP

Kenapa kepikiran ngerangkum ini:
> Soalnya habis baca ini -> <https://peps.python.org/pep-3132/> -> <https://peps.python.org/pep-3132/#rationale> -> `iter(seq)`.

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

## What is "Iterators" [2] - WIP

- Iterators are methods that iterate collections like:
  - lists,
  - tuples,
  - etc.

...

## ...

...

## Source(s)

- [Python `iter()`](https://www.programiz.com/python-programming/methods/built-in/iter)
- [2]: [Python Iterators](https://www.programiz.com/python-programming/iterator)

Mine:
> omG siah aing. <www.programiz.com>. Harus sering-sering.
