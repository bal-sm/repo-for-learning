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

## `exit()`

- `exit()` is defined in `site.py`
  - it works only if the site module is imported so it should be used in the interpreter only.
  - like synonym for `quit()`

Example:

```python
# Python program to demonstrate
# exit()
for i in range(10):
    # If the value of i becomes
    # 5 then the program is forced
    # to exit
    if i == 5:
 
        # prints the exit message
        print(exit)
        exit()
    print(i)
```

Output:

```sh
0
1
2
3
4
Use exit() or Ctrl-D (i.e. EOF) to exit
```

## `sys.exit([arg])`

- considered good to be used in production code for the `sys` module is always available
  - _unlike quit() and exit(), sys.exit()_

- The optional argument arg can be an integer giving the exit or another type of object.
  - If it is an integer, zero is considered “successful termination”.

Note:
> A string can also be passed to the sys.exit() method.

Example:

```python
# Python program to demonstrate
# sys.exit()
import sys
 
age = 17
 
# program that stops execution if the age is less than 18.
if age < 18:   
    # exits the program
    sys.exit("Age less than 18")   
else:
    print("Age is not less than 18")
```

## `os._exit(n)`

- The `os._exit()` method in Python is used to:
  - exit the process _with specified status without calling cleanup handlers_
  - flushing `stdio` buffers
  - etc.

Note:
> This method is normally used _in the child process_ after `os.fork()` system call. _The standard way to exit the process is `sys.exit(n)` method._

Example:

```python
# Python program to explain os._exit() method
     
# importing os module
import os
     
# Create a child process
# using os.fork() method
pid = os.fork()
     
     
# pid greater than 0
# indicates the parent process
if pid > 0:
     
    print("\nIn parent process")
    # Wait for the completion
    # of child process and   
    # get its pid and
    # exit status indication using
    # os.wait() method
    info = os.waitpid(pid, 0)
     
         
    # os.waitpid() method returns a tuple
    # first attribute represents child's pid
    # while second one represents
    # exit status indication
     
    # Get the Exit code
    # used by the child process
    # in os._exit() method
         
    # firstly check if
    # os.WIFEXITED() is True or not
    if os.WIFEXITED(info[1]) :
        code = os.WEXITSTATUS(info[1])
        print("Child's exit code:", code)
     
else :
    print("In child process")
    print("Process ID:", os.getpid())
    print("Hello ! Geeks")
    print("Child exiting..")
         
    # Exit with status os.EX_OK
    # using os._exit() method
    # The value of os.EX_OK is 0       
    os._exit(os.EX_OK)
```

Output:

```sh
In child process
Process ID: 25491
Hello ! Geeks
Child exiting..

In parent process
Child's exit code: 0
```

## Source

[Python exit commands: quit(), exit(), sys.exit() and os._exit() by Geeks for Geeks](https://www.geeksforgeeks.org/python-exit-commands-quit-exit-sys-exit-and-os-_exit/)
