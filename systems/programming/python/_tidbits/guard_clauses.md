# Guard clauses for better “if” statements — Python

Taken from -> <https://medium.com/lemon-code/guard-clauses-3bc0cd96a2d3>. Thanks to Ícaro.

bla-bla-bla

```python
# Sorry for the silly example
def is_platypus(self):
    if self.is_mammal():
        if self.has_fur():
            if self.has_beak():
                if self.has_tail():
                    if self.can_swim():
                        # It's a platypus!
                        return True
    # Not a platypus
    return False
```

bla-bla-bla

```python
def is_platypus(self):
    # Not a platypus for everything below
    if not self.is_mammal():
        return False
    if not self.has_fur():
        return False
    if not self.has_beak():
        return False
    if not self.has_tail():
        return False
    if not self.can_swim():
        return False
    # Finally, it's a platypus!
    return True
```

bla-bla-bla

```python
def func_not_guarded(self, param):
    if param == 'something':
        self.counter += 1
        if self.counter > 10:
            self.reached_ten()
        else:
            if self.counter < 5:
                self.has_not_reached_5()
            else:
                self.has_not_reached_5()
    else:
        self.counter -= 1


def func_guarded(self, param):
    if param != 'something':
        self.counter -= 1
        # You can call return even if the function doesn't return anything
        return
    # Important path in a low indentation level
    self.counter += 1
    if self.counter > 10:
        self.reached_ten()
        return
    # By returning early, you don't need `else` statements
    if self.counter < 5:
        self.has_not_reached_5()
        return
    self.has_not_reached_5()
```
