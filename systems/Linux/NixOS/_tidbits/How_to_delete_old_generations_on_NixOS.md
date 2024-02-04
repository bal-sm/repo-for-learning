# How to delete old generations on NixOS

Taken from <https://www.reddit.com/r/NixOS/comments/10107km/comment/j2lekuj/>. Thanks to u/stuzenz.

```sh
nix-env --list-generations

nix-collect-garbage  --delete-old

nix-collect-garbage  --delete-generations 1 2 3

# recommeneded to sometimes run as sudo to collect additional garbage
sudo nix-collect-garbage -d

# As a separation of concerns - you will need to run this command to clean out boot
sudo /run/current-system/bin/switch-to-configuration boot
```
