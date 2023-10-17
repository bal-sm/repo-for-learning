# how to erase specific folder with matching name on every folder

Original title: Delete `node_modules` folder recursively from a specified path using command line.

> [From and thanks to Sumit, Darius, and Peter Mortensen](https://stackoverflow.com/questions/42950501/delete-node-modules-folder-recursively-from-a-specified-path-using-command-line).

Print out a list of directories to be deleted:

```sh
find . -name 'node_modules' -type d -prune
```

Delete directories from the current working directory:

```sh
find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
```

Pro-tip
> Replace `node_modules` with `.venv` to erase every created virtual environments created by `Poetry` or other Python Package Managers.
