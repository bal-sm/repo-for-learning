# Definition vs. Declaration vs. Type Definition vs. References

Mine:
> ih di TypeScript nya mah malah beda lagi opsi-opsi-nya. Udah we. I make it Python thing aja.

Mine:
> Diambil dari [1.1] dan diubah jadi Python tea.

## Declaration

Them:
> This is where you first declare a symbol (variable, constant, function etc.)

```python
my_string = None
```

Mine:
> Sebenernya kalau di Python gak ada "declare without assign" thing, kayak di TypeScript -> `let myString: string;`. Jadi gitu aja lah.

## Definition

Them:
> This is where you define a value for a symbol.

```python
my_string: str = "Hello, World!"
```

Them:
> And of course, you can do the definition and declaration in one go
>
> ```typescript
> let myValue: string = 'foo';
> ```

## References

This is any place where you use a symbol that has been defined elsewhere. The following example contains two references, at `MyObject` and at `my_function`.

```python
MyObject.name = "some_object"
return_value = my_function()
```

## Type Definition [1.2]

It's the definition (like in the example) of the *type* of the object behind the cursor. For example, if your cursor is on `my_string`, the "type definition" would be where `str` itself is defined. 

```python
my_string: str = "Hello, World!"

# mengarah ke sini, di Python source code

class str(...):
    # ...
```

## Source(s)

- [1]: [LSP: Differences between definition, declaration, type declaration and reference in plain English](https://www.reddit.com/r/neovim/comments/11u3sx3/lsp_differences_between_definition_declaration/)
  - [1.1]: [A comment](https://www.reddit.com/r/neovim/comments/11u3sx3/comment/jcmaksx/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)
  - [1.2]: [Type Definition](https://www.reddit.com/r/neovim/comments/11u3sx3/comment/jcmbug5/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)
- [2]: [Code Navigation](https://code.visualstudio.com/docs/editor/editingevolved)
  - [2.1]: [Go To Definition](https://code.visualstudio.com/docs/editor/editingevolved#_go-to-definition)

Mine:
> Much thanks to u/FunctionalHacker.

## Note(s)

Mine:
> Akhirnya mah udah Ctrl + Left Click aja yang dipake, which is "Go to Definition".
>
> OmG, atau Ctrl + Alt + Left Click.
>
> Baca di [2.1].
