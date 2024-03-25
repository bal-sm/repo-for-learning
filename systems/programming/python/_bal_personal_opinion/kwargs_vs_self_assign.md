# `**kwargs` vs assign to `self`

```python
class SomeObject:
    def __init__(self, something, *args, **kwargs):
        self.something = something

    def __repr__(self):
        return f"{self.__dict__}"
```

vs.

```python
class SomeObject:
    def __init__(self, *args, **kwargs):
        self.something = kwargs['something']

    def __repr__(self):
        return f"{self.__dict__}"
```

Mine:
> Dua-dua nya valid! Dan sama aja, tapi explicit lebih baik daripada implicit.

Mine:
> Pokoknya harus di instantiate dulu ke `self` baru methodnya bisa pake.

Mine:
> Baca masalah `*` operator di [sini](../_tidbits/*_what-is-it-exactly.md).

## Kalo digabung sama `super()`

Mine:
> Taken from [here](https://www.geeksforgeeks.org/python-super/), and modified.

```python
class Emp():
    def __init__(self, id, name, address):
        self.id = id
        self.name = name
        self.address = address
 
# Class freelancer inherits EMP
class Freelance(Emp):
    def __init__(self, *args, emails): # vs. self, id, name, address, emails
        self.emails = emails
        super().__init__(*args) # vs. self, id, name, address
 
emp_1 = Freelance(103, "Suraj kr gupta", "Noida" , emails="KKK@gmails") # vs. ..., "KKK@gmails"
print('The ID is:', emp_1.id)
print('The Name is:', emp_1.name)
print('The Address is:', emp_1.address)
print('The Emails is:', emp_1.emails)
```
