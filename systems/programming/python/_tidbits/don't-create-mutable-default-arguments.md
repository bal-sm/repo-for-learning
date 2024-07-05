# (Don't create) Mutable default arguments

## Don't do this

```python
def append_to(element, to=[]):
    to.append(element)
    return to

my_list = append_to(12)
print(my_list) # [12]

my_other_list = append_to(42)
print(my_other_list) # [12, 42] - What?
```

## What actually happens

Them, [3]:
> A new list is created once when the function is defined, and the same list is used in each successive call.
>
> Python’s default arguments are evaluated *once* when the function is defined, not each time the function is called (like it is in say, Ruby). This means that if you use a mutable default argument and mutate it, you *will* and have mutated that object for all future calls to the function as well.

## Do this instead

```python
def append_to(element, to=None):
    if to is None:
        to = []
    to.append(element)
    return to

my_list = append_to(12)
print(my_list) # [12]

my_other_list = append_to(42)
print(my_other_list) # [42] - Nice. Everything can be nice too.
```

## Source(s)

- [1]: [Mutable Default Arguments](https://fireship.io/lessons/code-this-not-that-python-edition/)
  - > fix the link, plssyg.
  - > langsung rangkum aja we nanti ah, maintenance.
  - > thank you nya eta Aa bule cakep.
- [2]: [meme from r/ProgrammerHumor](https://www.reddit.com/r/ProgrammerHumor/s/YHNtR7KJdK)
  - [3]: [Mutable Default Arguments](https://docs.python-guide.org/writing/gotchas/#mutable-default-arguments)
    - > rangkum juga, maintenance.
