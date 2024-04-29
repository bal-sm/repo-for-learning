# Binaries for normal Linux OS, sometimes incompatible with NixOS

## Personal Experience

mau jalanin `pgadmin4` yang udah diinstal lewat `pipx`, keluarnya gini:

```
NOTE: Configuring authentication for SERVER mode.

Enter the email address and password to use for the initial pgAdmin user account:

Email address: placeholder@ants.com
Password: 
Retype password:
Traceback (most recent call last):
  File "/home/d/.local/bin/pgadmin4", line 5, in <module>
    from pgadmin4.pgAdmin4 import main
  File "/home/d/.local/share/pipx/venvs/pgadmin4/lib/python3.12/site-packages/pgadmin4/pgAdmin4.py", line 103, in <module>
    app = create_app()
          ^^^^^^^^^^^^
  File "/home/d/.local/share/pipx/venvs/pgadmin4/lib/python3.12/site-packages/pgadmin4/pgadmin/__init__.py", line 751, in create_app
    app.register_blueprint(module)
  File "/home/d/.local/share/pipx/venvs/pgadmin4/lib/python3.12/site-packages/flask/scaffold.py", line 50, in wrapper_func
    return f(self, *args, **kwargs)
           ^^^^^^^^^^^^^^^^^^^^^^^^
  File "/home/d/.local/share/pipx/venvs/pgadmin4/lib/python3.12/site-packages/flask/app.py", line 997, in register_blueprint
    blueprint.register(self, options)
  File "/home/d/.local/share/pipx/venvs/pgadmin4/lib/python3.12/site-packages/pgadmin4/pgadmin/tools/__init__.py", line 52, in register
    from .psql import blueprint as module
  File "/home/d/.local/share/pipx/venvs/pgadmin4/lib/python3.12/site-packages/pgadmin4/pgadmin/tools/psql/__init__.py", line 15, in <module>
    from eventlet.green import subprocess
  File "/home/d/.local/share/pipx/venvs/pgadmin4/lib/python3.12/site-packages/eventlet/__init__.py", line 11, in <module>
    from eventlet import convenience
  File "/home/d/.local/share/pipx/venvs/pgadmin4/lib/python3.12/site-packages/eventlet/convenience.py", line 4, in <module>
    from eventlet import greenpool
  File "/home/d/.local/share/pipx/venvs/pgadmin4/lib/python3.12/site-packages/eventlet/greenpool.py", line 4, in <module>
    from eventlet import queue
  File "/home/d/.local/share/pipx/venvs/pgadmin4/lib/python3.12/site-packages/eventlet/queue.py", line 49, in <module>
    from eventlet.event import Event
  File "/home/d/.local/share/pipx/venvs/pgadmin4/lib/python3.12/site-packages/eventlet/event.py", line 3, in <module>
    from eventlet import hubs
  File "/home/d/.local/share/pipx/venvs/pgadmin4/lib/python3.12/site-packages/eventlet/hubs/__init__.py", line 7, in <module>
    from eventlet.support import greenlets as greenlet
  File "/home/d/.local/share/pipx/venvs/pgadmin4/lib/python3.12/site-packages/eventlet/support/__init__.py", line 6, in <module>
    from eventlet.support import greenlets
  File "/home/d/.local/share/pipx/venvs/pgadmin4/lib/python3.12/site-packages/eventlet/support/greenlets.py", line 1, in <module>
    import greenlet
  File "/home/d/.local/share/pipx/venvs/pgadmin4/lib/python3.12/site-packages/greenlet/__init__.py", line 29, in <module>
    from ._greenlet import _C_API # pylint:disable=no-name-in-module
    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
ImportError: libstdc++.so.6: cannot open shared object file: No such file or directory
```

> mari kita lihat solusinya.

## Solution

...

## ...

...

## Source(s)

- [1]: [Sqlalchemy python fails to find libstdc++.so.6 in virtualenv](https://discourse.nixos.org/t/sqlalchemy-python-fails-to-find-libstdc-so-6-in-virtualenv/38153)
  - [1.1]: [NixOS 61: Using non-Nix Python Packages with Binaries on NixOS](https://github.com/mcdonc/.nixconfig/blob/e7885ad18b7980f221e59a21c91b8eb02795b541/videos/pydev/script.rst)
