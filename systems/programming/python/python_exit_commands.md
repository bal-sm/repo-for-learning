# python_exit_commands

- The functions `quit(), exit(), sys.exit() and os._exit()`:
  
  _almost the same as they_

  - raise the `SystemExit` exception
  - no stack traceback is printed

- We can catch the exception to intercept early exits and perform cleanup activities;
  - if uncaught, the interpreter exits as usual.

## Source

[Python exit commands: quit(), exit(), sys.exit() and os._exit() by Geeks for Geeks](https://www.geeksforgeeks.org/python-exit-commands-quit-exit-sys-exit-and-os-_exit/)
