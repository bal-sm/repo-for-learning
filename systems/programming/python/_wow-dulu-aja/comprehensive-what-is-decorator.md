# Decorator explained - How can I make a chain of function decorators in Python?

Sources:
- [Original QnA post](https://stackoverflow.com/questions/739654/)how-do-i-make-function-decorators-and-chain-them-together
  - [Jump to the answer](https://stackoverflow.com/a/1594484)
- [GitHub Gist](https://gist.github.com/Zearin/2f40b7b9cfc51132851a)
- [Reddit]https://www.reddit.com/r/Python/comments/8jup2z/the_best_explanation_of_python_decorators_ive/

Mine
> Thanks to them all.

## Answer / Contents

...

```python
# ! Belum dipindahin ini

def getTalk(kind="shout"):
    # We define functions on the fly
    def shout(word="yes"):
        return word.capitalize() + "!"

    def whisper(word="yes"):
        return word.lower() + "..."

    # Then we return one of them
    if kind == "shout":
        # We don’t use '()'. We are not calling the function;
        # instead, we’re returning the function object
        return shout
    else:
        return whisper


# How do you use this strange beast?

# Get the function and assign it to a variable
talk = getTalk()

# You can see that `talk` is here a function object:
print(talk)  # print talk
# outputs : <function shout at 0xb7ea817c>
# new_outputs : <function getTalk.<locals>.shout at 0x7f4c75c11760>

# The object is the one returned by the function:
print(talk())  # print talk()
# outputs : Yes!

# And you can even use it directly if you feel wild:
print(getTalk("whisper")())  # print getTalk('whisper')()
# outputs : yes...

# omG ~~versi 2 anying~~ versi 3 ayeuna
```

...
