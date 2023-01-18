Source: https://stackoverflow.com/questions/16937359/git-copy-file-preserving-history

All you have to do is:

    move the file to two different locations,
    merge the two commits that do the above, and
    move one copy back to the original location.

You will be able to see historical attributions (using `git blame`) and full history of changes (using `git log`) for both files.

Suppose you want to create a copy of file `foo` called `bar`. In that case the workflow you'd use would look like this:

```bash
git mv foo bar
git commit

SAVED=`git rev-parse HEAD`
git reset --hard HEAD^
git mv foo copy
git commit

git merge $SAVED     # This will generate conflicts
git commit -a        # Trivially resolved like this

git mv copy foo
git commit
```

Why this works

After you execute the above commands, you end up with a revision history that looks like this:

```
( revision history )            ( files )

    ORIG_HEAD                      foo
     /     \                      /   \
SAVED       ALTERNATE          bar     copy
     \     /                      \   /
      MERGED                     bar,copy
        |                           |
     RESTORED                    bar,foo
```
