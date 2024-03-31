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

### Using Individual Values from a List

just as you would any other variable.

For example, you can use f-strings to create a message based on a value from a list.

_Skipped_

```python
bicycles = ['trek', 'cannondale', 'redline', 'specialized']
message = f"My first bicycle was a {bicycles[0].title()}."

print(message)
# Output: My first bicycle was a Trek.
```

## Try It Yourself

```python
friends = [None, None, None]

for friend in friends:
    print(f"{friend} will go to my party.")

# Output is sad.
```

## Modifying, Adding, and Removing Elements

### Modifying Elements in a List

```python
lists = [..., ..., ...]

lists[index] = new_value

lists[1] = "yolo"

lists = [..., "yolo", ...]
```

---

For example:

```python
motorcycles = ['honda', 'yamaha', 'suzuki']
print(motorcycles) # Output: ['honda', 'yamaha', 'suzuki']

motorcycles[1] = 'ducati'
print(motorcycles) # Output: ['honda', 'ducati', 'suzuki']
```

## Adding Elements to a List

### `lists.append()` - Appending Elements to the End of a List

```python
lists = [..., ...]
lists.append("new_value")

print(lists) # Output: [..., ..., "new_value"]
```

---

For example:

```python
motorcycles = ['honda', 'yamaha', 'suzuki']
print(motorcycles) # Output: ['honda', 'yamaha', 'suzuki']

motorcycles.append('ducati')
print(motorcycles) # Output: ['honda', 'yamaha', 'suzuki', 'ducati']
```

---

Another example:

```python
motorcycles = []

motorcycles.append('honda')
motorcycles.append('yamaha')
motorcycles.append('suzuki')

print(motorcycles) # Output: ['honda', 'yamaha', 'suzuki']
```

Them:
> Building lists this way is very common, because you often won’t know the data your users want to store in a program until after the program is running. To put your users in control, start by defining an empty list that will hold the users’ values. Then append each new value provided to the list you just created.

### `lists.insert()` - Inserting Elements into a List

```python
lists = [..., ...]

lists.insert(index, "new_value")

lists.insert(1, "new_value")
print(lists) # Output: [..., "new_value", ...]
```

...
