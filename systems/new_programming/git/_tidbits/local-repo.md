# Git local

Git is by design not a centralized version control system.
If you only need to collaborate with yourself and/or want to have your changes on more than one machine you can follow this quick tutorial to do so.

This guide requires:

* Access to a ssh server (university, personal server or work server)

## Setting things up

### Server setup

On the server you can create a local bare git repository using the following commoand:

```
mkdir bare-repository
cd bare-repository
git init --bare
```

This initializes a bare repository, which unlike a regular Git repository, can only be accesed by interacting using another Git repository.

You can then, if you have a git repository on the server use the following command inside the repository:

```
git remote add bare `path-to-bare-repository`
```