# Chapter 4 - Working With Lists

> `Insert the content of chapter 4 here.`

## Looping Through an Entire List

Them:
> When you want to do the same action with every item in a list, you can use Python’s `for` loop.

Them, important:
> Say we have a list of magicians’ names, and we want to print out each name in the list. We could do this by retrieving each name from the list individually, but this approach could cause several problems. For one, it would be repetitive to do this with a long list of names. Also, we’d have to change our code each time the list’s length changed. Using a `for` loop avoids both of these issues by letting Python manage these issues internally.

---

Let’s use a `for` loop to print out each name in a list of magicians:

```python
magicians = ['alice', 'david', 'carolina']
for magician in magicians:
    print(magician)
```

Them, important:
> We begin by defining a list, just as we did in Chapter 3. Then we define a `for` loop. This line tells Python to pull a name from the list `magicians`, and associate it with the variable `magician`. Next, we tell Python to print the name that’s just been assigned to `magician`. Python then repeats these last two lines, once for each name in the list. It might help to read this code as “For every magician in the list of magicians, print the magician’s name.”

Output:
>
> ```
> alice
> david
> carolina
> ```

...
