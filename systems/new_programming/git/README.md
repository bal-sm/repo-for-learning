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

For config:
- `git config --global --add --bool push.autoSetupRemote true`
  - > nanti liat we ketang my personal `.gitconfig` <!-- with the credentialssss ofc, just kidding,  IDK wtf vscode put in there --->
