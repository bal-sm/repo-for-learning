# How to install (Mahmuda's original)

`1.`

```python
pipx install pgadmin4
```

`2.`

Create a new file named `config_local.py` (if not already present) at your installation location [1]:

`~/.local/share/pipx/venvs/pgadmin4/lib/python3.12/site-packages/pgadmin4/config_local.py`

```python
import os
DATA_DIR = os.path.realpath(os.path.expanduser(u'~/.pgadmin/'))
LOG_FILE = os.path.join(DATA_DIR, 'pgadmin4.log')
SQLITE_PATH = os.path.join(DATA_DIR, 'pgadmin4.db')
SESSION_DB_PATH = os.path.join(DATA_DIR, 'sessions') 
STORAGE_DIR = os.path.join(DATA_DIR, 'storage')
```

`3.` (NixOS issue)

Follow: <https://github.com/bal-sm/repo-for-learning/blob/4c47753b292678437a6a65ff723361d39a853c5c/systems/Linux/NixOS/_tidbits/binaries_for_normal_linux_incompatibility.md>

## Source(s)

- [1]: [OSError: Errno 13: Permission denied: '/var/lib/pgadmin'](https://stackoverflow.com/questions/46707935/oserror-errno-13-permission-denied-var-lib-pgadmin)
  - [1.1]: [Best answer](https://stackoverflow.com/a/46722646)
