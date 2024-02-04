# NixOS

_Work in Progress_

## Orat-oret

### Journey Ringkas

- Start from here
  - [ ] <https://christitus.com/nixos-explained/>
    - [ ] <github.com/ChrisTitusTech/nixos-titus>
    - [ ] [First Time NixOS Install with Customization](https://www.youtube.com/watch?v=_Z32SYFbxpw)
    - [ ] <https://www.bekk.christmas/post/2021/16/dotfiles-with-nix-and-home-manager>, **must read**.
    - [ ] <https://www.tweag.io/blog/2020-05-25-flakes/>, maybe just read it
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

---

- [Nix Flakes, Part 1: An introduction and tutorial](https://www.tweag.io/blog/2020-05-25-flakes/)
  - [Flake outputs](https://www.tweag.io/blog/2020-05-25-flakes/#flake-outputs)
    - While a flake can have arbitrary outputs, some of them, if they exist, have a special meaning to certain Nix commands and therefore must have a specific type. For example, the output `defaultPackage.<system>` must be a derivation; it’s what `nix build` and `nix shell` will build by default unless you specify another output. The `nix` CLI allows you to specify another output through a syntax reminiscent of URL fragments...
      - > tuh.

---

"masukkin dong sayang"

"my machine sayang, aku tawarin pake `/", SOALNYA DIA BUKAN ROBOT!"
