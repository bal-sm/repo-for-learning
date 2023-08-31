# Python Crash Course - Learning

by Eric Matthes on no starch press.

## Contents

- [Chapter 1 - Getting Started](./Chapter_1/README.md)

## Praise For Python Crash Course

Great Lakes Geek:
> While Python Crash Course uses Python to teach you to code, it also teaches clean programming skills that apply to most other languages.

## Learning in Progress

### From PREFACE TO THE THIRD EDITION

My question:
> What is herein?

Note 1:
> use `pathlib` cenah, buat read and write file, karna lebih simple.

Note 2:
> Chapter 11 uses `pytest` to write automated tests for the code you write. The `pytest` library has become the industry standard tool for writing tests in Python.
> 
> It’s friendly enough to use for your first tests, and if you pursue a career as a Python programmer, you’ll use it in professional settings as well.

Note 3:
> The index has been thoroughly updated to allow you to use Python Crash Course as a reference for all of your future Python projects.

Mine:
> Wow.

---

Appendix A
----------

Python Keywords
---------------

Each of the following keywords has a specific meaning, and you’ll see an error if you try to use any of them as a variable name.

```
False      await      else       import     pass
None       break      except     in         raise
True       class      finally    is         return
and        continue   for        lambda     try
as         def        from       nonlocal   while
assert     del        global     not        with
async      elif       if         or         yield
```

Python Built-in Functions
-------------------------

You won’t get an error if you use one of the following readily available built-in functions as a variable name, but you’ll override the behavior of that function:\

```
abs()           hash()            slice()
aiter()         help()            sorted()
all()           hex()             staticmethod()
any()           id()              str()
anext()         input()           sum()
ascii()         int()             super()
bin()           isinstance()      tuple()
bool()          issubclass()      type()
breakpoint()    iter()            vars()
bytearray()     len()             zip()
bytes()         list()            __import__()
callable()      locals()
chr()           map()
classmethod()   max()
compile()       memoryview()
complex()       min()
delattr()       next()
dict()          object()
dir()           oct()
divmod()        open()
enumerate()     ord()
eval()          pow()
exec()          print()
filter()        property()
float()         range()
format()        repr()
frozenset()     reversed()
getattr()       round()
globals()       set()
hasattr()       setattr()
```

---

Appendix B
----------

Game Changer euy:

> ```json
>     "editor.rulers": [
>     80,
>     88,
>     120,
>     ]
> ```
> 
> di `settings.json` VSCode, biar ada penggaris buat nentuin panjang baris yang-
> nah kayak gini, omg wtf. kok baru tau aing.

Note aja:
>
> ```json
> {
>     --snip--
>     "configurations": [
>         {
>             --snip--
>             "console": "internalConsole",
>             "justMyCode": true
>         }
>     ]
> }
> ```
>
> biar output nya di output aja cenah, gak di terminal.

Wow kyknya:
> 
> ```python
> def say_hello:
>     print("Hello!")
> ```
> 
> omG game changer euy bener CTRL-], or ⌘-], CTRL-[, or ⌘-[, pas di highlight codenya.

Another one:
> 
> ```python
> # def say_wtf:
> #     print("what the fuck")
> ```
> 
> wow
> 
> kalo di md file ini juga bisa guys
> 
> <!-- kayak gini -->
> 
> wow
> 
> `CTRL-/, or ⌘-/`

Another one:
>
> ```python
> def pindah_code():
>     pass # aja dulu
> 
> pindah_code()
> 
> def wait_tapi():
>     pass # juga
> 
> wait_tapi()
> ```
> 
> Pake `ALT-up arrow`, or `Option-up`.

Wow, very good quote:
> Working efficiently in an editing environment takes practice, but it also takes intention. When you’re learning to work with code, try to notice the things you do repeatedly. Any action you take in your editor likely has a shortcut; if you’re clicking menu items to carry out editing tasks, look for the shortcuts for those actions. If you’re switching between your keyboard and mouse frequently, look for the navigation shortcuts that keep you from reaching for your mouse so often.
> 
> ~~You can see all the keyboard shortcuts in VS Code by clicking Code and then Preferences, and then choosing Keyboard Shortcuts. You can use the search bar to find a particular shortcut, or you can scroll through the list to find shortcuts that might help you work more efficiently.~~ 

Mine:
> Ignore paragraf 2, mending, use default aja terus search di Google. Apalagi VSCode sering update dgn new features.

Another very good quote:
> Remember, it’s better to focus on the code that you’re working on, and avoid spending too much time on the tools you’re using.

Mine:
> Eta pisan, + THIRD PARTY APPS you're using/considering to use. Bikin goblokk ih. Bikin a post in Reddit Django ah.
