# Kenapa Firefox source code bisa pakai `git` dan juga `mercurial`?

## 1

Mine:
> Indie pisan file ieu, cuman atuh da a whim, pengen tau aja. Oh iya terus gini, [`soon`](...).

Cenah [1.1]:
> To use `git`, you can grab the source code in “git” form by running the bootstrap script with the `vcs` parameter:
>
> ```python
> python3 bootstrap.py --vcs=git
> ```

Cenah, penting:
> This uses [Git Cinnabar](https://github.com/glandium/git-cinnabar/) under the hood.

## 2

Cenah [2]:
> git-cinnabar is a git remote helper to interact with mercurial repositories.

Mine:
> Jadi basically translation layer git ke mercurial. Kayak WINE, windows ke linux.

Mine:
> Nerd anying.

## Source(s)

- [1]: [Building Firefox On Linux](https://firefox-source-docs.mozilla.org/setup/linux_build.html)
  - [1.1]: [Bootstrap a copy of the Firefox source code](https://firefox-source-docs.mozilla.org/setup/linux_build.html#bootstrap-a-copy-of-the-firefox-source-code)
- [2]: [`git-cinnabar` repo](https://github.com/glandium/git-cinnabar/)
