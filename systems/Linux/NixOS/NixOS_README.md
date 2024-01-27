# NixOS

_Work in Progress_

## Orat-oret

### Journey Ringkas

- Start from here
  - [ ] <https://christitus.com/nixos-explained/>
    - [ ] <github.com/ChrisTitusTech/nixos-titus>
    - [ ] [First Time NixOS Install with Customization](https://www.youtube.com/watch?v=_Z32SYFbxpw)
    - [ ] <https://www.bekk.christmas/post/2021/16/dotfiles-with-nix-and-home-manager>, **must read**.
  ...
  - [ ] my own configuration

### Keywords

- disko (dari btrfs page nya nix) + btrfs + declarative

Learning note:
> Wajib siah keyword keyword gitu dalam pembelajaran apapun.

### Journey + Yang didapatkan

`Insert ih dari fake diary 2024-01-27`

Dari video [First Time NixOS Install with Customization](https://www.youtube.com/watch?v=_Z32SYFbxpw):

- config files mau apa-apa juga bakal bersih udahnya.

Dari video [NixOS is not for beginners](https://youtu.be/NuPKijYukuQ?si=3vGhy-NZKEZbNxTB), penggalan video "first time bla-bla-bla" (maybe?):

Komen @itme_brain
> Regarding the nix store bloat, you can delete unused derivations with the garbage collector.
>
> You can also limit how many generations GRUB keeps in the boot menu and you can automate the garbage collection, all through the config file.

Mine:
> Tuh buang buang Nix store (ceuk bapak eta mah snapshot) pake garbacmge collector, terus ada integration sama GRUB juga dong? I wonder bisa utilize btrfs tea gak sih.

...
