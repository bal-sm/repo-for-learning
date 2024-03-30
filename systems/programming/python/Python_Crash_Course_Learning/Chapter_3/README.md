# Chapter 3 - Introducing Lists

## What Is a List?

`lists = [..., ...]`

`bicycles.py`:

```python
bicycles = ['trek', 'cannondale', 'redline', 'specialized']
```

### Accessing Elements in a List

```python
lists[index] = [..., ...]
```

---

To pull out the first bicycle in the list `bicycles`:

```python
bicycles = ['trek', 'cannondale', 'redline', 'specialized']
print(bicycles[0]) # Output: trek
```

---

You can also use the string methods:

```python
bicycles = ['trek', 'cannondale', 'redline', 'specialized']
print(bicycles[0].title()) # Output: Trek
```

### Index Positions Start at `0`, Not `1`

It's just how index and lists operations are implemented at a lower level.

```python
bicycles = ['trek', 'cannondale', 'redline', 'specialized']
print(bicycles[1]) # Output: cannondale
print(bicycles[3]) # Output: specialized
```

---

Them:
> Python has a special syntax for accessing the last element in a list. If you ask for the item at index `-1`, Python always returns the last item in the list:

```python
bicycles = ['trek', 'cannondale', 'redline', 'specialized']
print(bicycles[-1]) # Output: specialized
```

...
