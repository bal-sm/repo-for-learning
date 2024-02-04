# Overview of the Nix Language

Mine:
> Taken from <https://nixos.wiki/wiki/Overview_of_the_Nix_Language>.

...

```nix
add_a_b = { a, b }: a + b
add_a_b { a=5; b=2; c=10; }
# error: anonymous function at (string):1:2 called with unexpected argument 'c', at (string):1:1
add_a_b = { a, b, ... }: a + b
add_a_b { a=5; b=2; c=10; }
# 7
```

Mine, learning note:
> Tuh geura liat ya, Part 1. Terutama ini:

```nix
add_a_b = { a, b, ... }: a + b
```

```nix
add_a_b { a=5; b=2; c=10; }
```

Mine, learning note:
> The end of Part 2. 
>
> Jadi gini:
>
> ```nix
> { a, b , ... }:
> { 
>   a.something = something;
>   # etc, etc.
> }
> ```
>
> Sering kan di many `.nix` files kayak gini

...
