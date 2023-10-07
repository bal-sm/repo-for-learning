# git _things_

## Config Location

- `~/.gitconfig` for global config

## My Personal Most Used Commands

- `git log --oneline --graph` to see the commit history
  - `--decorate --all` dari GitJob Kolipot.
- `git pull --prune --all` to prune all the deleted remote branches
- `git cleanup`
  - bentar ya ini alias, tapi di mana ya original code dari stackoverflow nya.
  - udah we code block nya aja.
    
    ```
    [alias]
        cleanup = "!git branch --merged | grep  -v '\\*\\|master\\|develop' | xargs -n 1 -r git branch -d"
    ```

  - jadi branch selain yang di checked out, terus commit nya udah ada di checked out, di delete semua.
    - kecuali kalo git nya lagi bego (not loaded commit tungtungnya)
- ~~`git pus --tags`~~ 
  - ~~soalnya kok goblok ya, `push` biasa teh gak sama `tags` nya~~
  - gblk [cenah](https://stackoverflow.com/questions/2988088/do-git-tags-get-pushed-as-well#comment51762361_2988099):
    > I recommend not using or training others to use git push --tags as it can be very very difficult to get rid of bad tags when your co-workers are trained to push all tags, as people continue to push the old bad tags they have locally every time they want to push a new tag. Because of this, I will only every advise someone to use `git push origin <tag_name>` now.
- `git push origin <tag_name>`
- `git pull --rebase`
  - kalo edit di github terus ada editan di vscode juga cumn belum di push jadi rebase lah.
- `git merge master --no-ff`
  - soalnya verbose is better than implicit.
  - cuman ayo kita bikin aliasnya. nanti.
- `git commit --no-verify`
  - kalo lagi don't care about the `pre-commit`s hooks.
- `git commit -a` terus `-m "apa gitu commit message nya"`
  - biar tinggal klik terminal, atas, terus enter, terus tulis lagi more, terus atas, terus enter.
- `git rebase --interactive --autosquash --rebase-merges` terus `apa-gitu-nama-branchnya-atau-commitnya`
  - jadi gak bakal ke white washed (ma aing we ngaranna), branch nya, kok gblg ih
    - gak sabar fork git jadi gimana aku.
      - atau gak ya bikin extension. semoga pada pake.

## For config

```.gitconfig
# This is Git's per-user configuration file.
[user]
	name = ???
	email = ???
# Please adapt and uncomment the following lines:
#	name = Jajang Maulana
#	email = jajangmaulana452@yahoo.com
[alias]
    cleanup = "!git branch --merged | grep  -v '\\*\\|master\\|develop' | xargs -n 1 -r git branch -d"
	rb = "rebase"
	rb-ulti = "rebase --interactive --autosquash --rebase-merges"
	com = "commit"
	com-ulti = "commit --all --verbose --no-signoff --edit"
	com-ulti-for-linux = "commit --all --verbose --signoff --edit"
	fix-com = "commit --all --fixup"
	cekot = "checkout"
	new-branch = "checkout -b"
	del = "branch -d" # rey. Mama.
	push-ulti = "push --all"
	push-ulti-and-tags = "!git push --all && git push --tags" # Whatever we can have it
	push-o = "push origin"
	# [`hub sync`](https://stackoverflow.com/a/9781639)
	# -------------------------------------------------
	# This updates all local branches that have a matching upstream branch.
	# Need `hub` binary.
	sync = "!hub sync"
	# end of aliases that are not harmful
	del-y = "branch -D" # "Fuck you." - (jealousy) Qabil
	push-force = "push --force-with-lease"
	# end of aliases that **are** harmful
[core]
	editor = code --wait
[filter "lfs"]
# Apa ya ini teh
	clean = git-lfs clean -- %f
	smudge = git-lfs smudge -- %f
	process = git-lfs filter-process
	required = true
[credential]
	helper = ???
[push]
	# biar gampang push nya kalo belum ada di "remote"/"origin"
	autoSetupRemote = true
```

> Wow kan ya guys. Cuman kayak y'know what the frick terminal. Anjing ada yang lupa ya gatau. Udah we pokoknya kenapa manual-nya gblk terus kalo mau masukin nama, kadang harus `--` dulu. Udahlah, pusing. Future I can see it.
