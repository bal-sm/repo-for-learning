# python_exit_commands

- The functions `quit(), exit(), sys.exit() and os._exit()`:
  
  _almost the same as they_

  - raise the `SystemExit` exception
  - no stack traceback is printed

- We can catch the exception to intercept early exits and perform cleanup activities;
  - if uncaught, the interpreter exits as usual.

## `quit()`

- works only if the site module is imported
  - so it should not be used in production code
  - should only be used in the interpreter

- It raises the `SystemExit` exception behind the scenes.
  - If you print it, it will give a message.

Example:

```python
# Python program to demonstrate
# quit()
for i in range(10):
     
    # If the value of i becomes
    # 5 then the program is forced
    # to quit
    if i == 5:
         
        # prints the quit message
        print(quit)
        quit()
    print(i)
```

Output:

```sh
0
1
2
3
4
Use quit() or Ctrl-D (i.e. EOF) to exit
```

## Source

[Python exit commands: quit(), exit(), sys.exit() and os._exit() by Geeks for Geeks](https://www.geeksforgeeks.org/python-exit-commands-quit-exit-sys-exit-and-os-_exit/)
