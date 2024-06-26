# Chapter 3 - Introducing Lists

## What Is a List?

`lists = [..., ...]`

`bicycles.py`:

```python
bicycles = ['trek', 'cannondale', 'redline', 'specialized']
```

### `lists[index]` - Accessing Elements in a List

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

---

For example:

```python
motorcycles = ['honda', 'yamaha', 'suzuki']

motorcycles.insert(0, 'ducati')
print(motorcycles) # Output: ['ducati', 'honda', 'yamaha', 'suzuki']
```

## Removing Elements from a List

### Removing an Item Using the `del` Statement

```python
lists = ["to be deleted", "a", "b"]

del lists[0]
print(lists) # Output: ["a", "b"]
```

---

```python
motorcycles = ['honda', 'yamaha', 'suzuki']

del motorcycles[0]
print(motorcycles) # Output: ['yamaha', 'suzuki']
```

---

```python
motorcycles = ['honda', 'yamaha', 'suzuki']

del motorcycles[1]
print(motorcycles) # Output: ['honda', 'suzuki']
```

---

Mine:
> In both examples, you can no longer access the value that was removed from the list after the `del` statement is used.

### Removing an Item Using the `pop()` Method

```python
lists = ["start", "middle", "end"]

popped_item = lists.pop()
print(lists) # Output: ["start", "middle"]
print(popped_item) # Output: end
```

---

```python
motorcycles = ['honda', 'yamaha', 'suzuki']

popped_motorcycle = motorcycles.pop()
print(motorcycles) # Output: ['honda', 'yamaha']
print(popped_motorcycle) # Output: suzuki
```

---

```python
motorcycles = ['honda', 'yamaha', 'suzuki']

last_owned = motorcycles.pop()
print(f"The last motorcycle I owned was a {last_owned.title()}.")
# Output: The last motorcycle I owned was a Suzuki.
```

### Popping Items from Any Position in a List

```python
lists = ["pop_this", "a", "b"]
first_item = lists.pop(0)

print(lists) # Output: ["a", "b"]
print(first_item) # Output: pop_this
```

---

```python
motorcycles = ['honda', 'yamaha', 'suzuki']

first_owned = motorcycles.pop(0)
print(f"The first motorcycle I owned was a {first_owned.title()}.")
# Output: The first motorcycle I owned was a Honda.
```

---

Them:
> - If you’re unsure whether to use the `del` statement or the `pop()` method, here’s a simple way to decide:
>   1. when you want to delete an item from a list and not use that item in any way,
>      - use the `del` statement;
>   2. if you want to use an item as you remove it,
>      - use the `pop()` method.

### Removing an Item by Value

```python
lists = ["a", "b", "c", "d"]

lists.remove("c")
print(lists) # Output: ["a", "b", "d"]
```

---

```python
motorcycles = ['honda', 'yamaha', 'suzuki', 'ducati']

motorcycles.remove('ducati')
print(motorcycles) # Output: ['honda', 'yamaha', 'suzuki']
```

---

Working with a value that's being removed:

```python
motorcycles = ['honda', 'yamaha', 'suzuki', 'ducati']

too_expensive = 'ducati'
motorcycles.remove(too_expensive)
print(motorcycles)
print(f"\nA {too_expensive.title()} is too expensive for me.")
```

Output:

```
['honda', 'yamaha', 'suzuki']

A Ducati is too expensive for me.
```

---

Them:
> The `remove()` method deletes only the first occurrence of the value you specify. If there’s a possibility the value appears more than once in the list, you’ll need to use a loop to make sure all occurrences of the value are removed. You’ll learn how to do this in Chapter 7.

Mine:
>
> ```python
> motorcycles = ["honda", "yamaha", "ducati", "suzuki", "ducati"]
> 
> while True:
>     try:
>         motorcycles.remove("ducati")
>     except ValueError:
>         break
> 
> print(motorcycles)
> ```
>

## Try It Yourself 2

_Skipped_

## Organizing a List

### Sorting a List Permanently with the `sort()` Method

Mine:
> **Permanently**.

```python
lists = ["c", "b", "a"]
lists.sort()

print(lists) # Output: ["a", "b", "c"]
```

---

```python
cars = ['bmw', 'audi', 'toyota', 'subaru']
cars.sort()

print(cars) # ['audi', 'bmw', 'subaru', 'toyota']
```

Them:
> The `sort()` method changes the order of the list permanently. The cars are now in alphabetical order, and we can never revert to the original order.

---

Them:
> You can also sort this list in reverse-alphabetical order by passing the argument `reverse=True` to the `sort()` method. The following example sorts the list of cars in reverse-alphabetical order:

```python
cars = ['bmw', 'audi', 'toyota', 'subaru']
cars.sort(reverse=True)

print(cars) # ['toyota', 'subaru', 'bmw', 'audi']
```

### Sorting a List Temporarily with the `sorted()` Function

Mine:
> **Temporarily**.

```python
cars = ['bmw', 'audi', 'toyota', 'subaru']

print("Here is the original list:")
print(cars) # ['bmw', 'audi', 'toyota', 'subaru']

print("\nHere is the sorted list:")
print(sorted(cars)) # ['audi', 'bmw', 'subaru', 'toyota']

print("\nHere is the original list again:")
print(cars) # ['bmw', 'audi', 'toyota', 'subaru']

print("\nHere is the reverse-sorted list:")
print(sorted(cars, reverse=True)) # ['toyota', 'subaru', 'bmw', 'audi']
```

Them:
> Sorting a list alphabetically is a bit more complicated when all the values are not in lowercase. There are several ways to interpret capital letters when determining a sort order, and specifying the exact order can be more complex than we want to deal with at this time. However, most approaches to sorting will build directly on what you learned in this section.

### Printing a List in Reverse Order

```python
lists = ["a", "d", "b", "c"]
lists.reverse()

print(lists) # Output: ["c", "b", "d", "a"]
```

---

Them:
> If we originally stored the list of cars in chronological order according to when we owned them, we could easily rearrange the list into reverse-chronological order:

```python
cars = ['bmw', 'audi', 'toyota', 'subaru']

cars.reverse() # ['subaru', 'toyota', 'audi', 'bmw']
print(cars)
```

---

Them, cenah, huh:
> The `reverse()` method changes the order of a list permanently, but you can revert to the original order anytime by applying `reverse()` to the same list a second time.

Mine, learning note, meureun:
> That's expensive ain't it? Mending simpen as a new variable we. We're talking about Python and its really slow performance here.

### Finding the Length of a List

```python
lists = ["a", "b", "c", "d"]
print(len(lists)) # Output: 4
```

Them:
> You’ll find `len()` useful when you need to identify the number of aliens that still need to be shot down in a game, determine the amount of data you have to manage in a visualization, or figure out the number of registered users on a website, among other tasks.

Them, a note:
> Python counts the items in a list starting with one, so you shouldn’t run into any off-by-one errors when determining the length of a list.

## Try It Yourself 3

_Skipped_

## Avoiding Index Errors When Working with Lists

_skipped most of the text_, pokoknya inget aja bakal ngeror kalo index out of range, `IndexError`.

---

```python
motorcycles = ['honda', 'yamaha', 'suzuki']
print(motorcycles[3])
```

Output:

```
Traceback (most recent call last):
  File "motorcycles.py", line 2, in <module>
    print(motorcycles[3])
          ~~~~~~~~~~~^^^
IndexError: list index out of range
```

---

```python
motorcycles = ['honda', 'yamaha', 'suzuki']
print(motorcycles[-1]) # suzuki
```

---

```python
motorcycles = []
print(motorcycles[-1])
```

Output:

```
Traceback (most recent call last):
  File "motorcyles.py", line 3, in <module>
    print(motorcycles[-1])
          ~~~~~~~~~~~^^^^
IndexError: list index out of range
```

---

*Mine*

```python
motorcycles = []

try:
    my_last_motorcycle = motorcycles[-1]
except IndexError:
    my_last_motorcycle = None

print(my_last_motorcycle) # None
```

## Summary

Them, modded:
> In this chapter,
> - you learned what lists are and 
>   - how to work with the individual items in a list. 
> - You learned how to define a list and 
>   - how to add and remove elements. 
> - You learned how to sort lists:
>   - permanently and 
>   - temporarily for display purposes. 
> - You also learned how to find the length of a list and
>   - how to avoid index errors when you’re working with lists.
>
> In Chapter 4 you’ll learn how to work with items in a list more efficiently. By looping through each item in a list using just a few lines of code you’ll be able to work efficiently, even when your list contains thousands or millions of items.
