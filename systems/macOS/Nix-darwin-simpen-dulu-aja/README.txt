###
### [2023-06-19] UPDATE: Just tried to use my instructions again on a fresh install and it failed in a number of places. 
###.   Not sure if I'll update this gist (though I realise it seems to still have some traffic), but here's a list of 
###.   things to watch out for:
###      - Check out the `nix-darwin` instructions, as they have changed.
###      - There's a home manager gotcha https://github.com/nix-community/home-manager/issues/4026
###

# I found some good resources but they seem to do a bit too much (maybe from a time when there were more bugs).
# So here's a minimal Gist which worked for me as an install on a new M1 Pro.
# Inspired by https://github.com/malob/nixpkgs I highly recommend looking at malob's repo for a more thorough configuration
#
# Some people are coming directly to this Gist from search results and not the original post[1]. If that sounds like you, you should also know there is a video[2] that accompanies this.
#
# [1] https://discourse.nixos.org/t/simple-workable-config-for-m1-macbook-pro-monterey-12-0-1-with-nix-flakes-nix-darwin-and-home-manager/16834
# [2] https://www.youtube.com/watch?v=KJgN0lnA5mk
#
# Let's get started
#
# Let's install nix (at the time of writing this is version 2.5.1
curl -L https://nixos.org/nix/install | sh

# I might not have needed to, but I rebooted
mkdir -p ~/.config/nix

# Emable nix-command and flakes to bootstrap 
cat <<EOF > ~/.config/nix/nix.conf
experimental-features = nix-command flakes
EOF

# Get the flake.nix in this gist
cd ~/.config
curl https://gist.githubusercontent.com/jmatsushita/5c50ef14b4b96cb24ae5268dab613050/raw/24a755065de59fc77a552518e106454750e86a49/flake.nix -O
# Get the configuration.nix and home.nix
curl https://gist.githubusercontent.com/jmatsushita/5c50ef14b4b96cb24ae5268dab613050/raw/24a755065de59fc77a552518e106454750e86a49/configuration.nix -O
curl https://gist.githubusercontent.com/jmatsushita/5c50ef14b4b96cb24ae5268dab613050/raw/24a755065de59fc77a552518e106454750e86a49/home.nix -O

# Until this is addressed https://github.com/LnL7/nix-darwin/issues/149
sudo mv /etc/nix/nix.conf /etc/nix/.nix-darwin.bkp.nix.conf
# Build the configuration
nix build .#darwinConfigurations.j-one.system
./result/sw/bin/darwin-rebuild switch --flake .
# Enjoy!

# Might be useful to install x86 packages in the nix profile manually
nix profile install nixpkgs#legacyPackages.x86_64-darwin.haskellPackages.stack
