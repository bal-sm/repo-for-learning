# CSS Selectors

Mine, learning note:
> dipake, walaupun aku pake Tailwind, tapi aku membutuhkannya untuk 'select' on `htmx` 'script's.

- A CSS selector selects the HTML element(s) you want to style.
  - > and, for interactivity, guys.

We can divide CSS selectors into five categories:

- Simple selectors
  - (select elements based on
    - 'name',
      - > `p` tag, kela, meureun ya.
    - `id`,
      - > `id=para1`
    - `class`)
      - > `class = px-something`
  - > nu ieu.
- [Combinator selectors](https://www.w3schools.com/css/css_combinators.asp)
  - (select elements based on a specific relationship between them)
  - > `rfl`-keun, soon, bebas.
- [Pseudo-class selectors](https://www.w3schools.com/css/css_pseudo_classes.asp)
  - (select elements based on a certain state)
  - > `rfl`-keun.
- [Pseudo-elements selectors](https://www.w3schools.com/css/css_pseudo_elements.asp)
  - (select and style a part of an element)
  - > `rfl`-keun.
- [Attribute selectors](https://www.w3schools.com/css/css_attribute_selectors.asp)
  - (select elements based on an attribute or attribute value)
  - > `rfl`-keun. di dieu aja meureun ya.

## Element selector

Mine:
> 'name' tea gening, kan yah. iya bener.

Them:
> The element selector selects HTML elements based on the element 'name'.

Example:

```css
p {
  text-align: center; /* all `<p>` elements on the page will be center-aligned */
  color: red; /* with a red text color */
}
```

## `id` selector

- The `id` selector
  - uses the `id` attribute
    - of an HTML element
    - to select a specific element.

- The `id` of an element
  - is **unique** within a page,
  - so the `id` selector
    - is used to select one unique element!
  - > a `p` tag with `id=para1` and another `p` / any other type of element (`h1`) with `id=para1` are not **valid**.
  - > another `rfl` topic bisa, maintenance and learning note.

- To select an element with a specific `id`,
  - write a hash (`#`) character,
    - followed by the `id` of the element.
      - > **`#`**`some-id`

Example:

```css
#para1 {
  text-align: center;
  color: red;
}
```

- > Note: An `id` name cannot start with a number!
  - > ~~`id=1-par`~~
    - > me: kayak declaring a variable in Python.

## `class` selector

- The `class` selector
  - selects HTML elements
    - with a specific `class` attribute.
      - > `class=center`

- To select elements with a specific `class`,
  - write a period (`.`) character,
    - followed by the `class` name.
      - > **`.`**`center`

Example:

```css
.center {
  text-align: center;
  color: red;
}
```

### per element, `class` selector

- You can also specify that
  - only specific HTML elements
    - should be affected by a `class`.

- In this example only `<p>` elements
  - with `class="center"` will be
    - red and
    - center-aligned:

```css
p.center {
  text-align: center;
  color: red;
}
```

### side lesson, more than one class

`center` and `large`:

```html
<p class="center large">This paragraph refers to two classes.</p>
```

### a note

Them, a ote:
> A `class` name cannot start with a number!

### `*` (universal) selector

- The universal selector (`*`)
  - selects all HTML elements on the page.

Example:

- The CSS rule below
  - will affect every HTML element
    - on the page:

```css
* {
  text-align: center;
  color: blue;
}
```

## Grouping selector

- The grouping selector
  - selects all the HTML elements
    - with the same style definitions.

Misalnya, before:

```css
h1 {
  text-align: center;
  color: red;
}

h2 {
  text-align: center;
  color: red;
}

p {
  text-align: center;
  color: red;
}
```

After:

```css
h1, h2, p {
  text-align: center;
  color: red;
}
```

## All CSS simple selectors

- `#id`
  - Example: `#firstname`
  - Selects the element with `id="firstname"`
- `.class`
  - Example: `.intro`
  - Selects all elements with `class="intro"`
- `element.class`
  - Example: `p.intro`
  - Selects only `<p>` elements with `class="intro"`
- `*`
  - Example: `*`
  - Selects all elements
- `element`
  - Example: `p`
  - Selects all `<p>` elements
- `element,element,..`
  - Example: `div`, `p`
  - Selects all `<div>` elements and all `<p>` elements

## ...

..., TBA atau gak usah, bebas.

## All CSS combinator selectors

- `element element`
  - `div p`
  - Selects all `<p>` elements
    - inside `<div>` elements
- `element>element`
  - `div > p`
  - Selects all `<p>` elements
    - where the parent is a `<div>` element
  - > bedanya apa ya sama yang di atas? learning note.
- `element+element`
  - `div + p`
  - Selects the first `<p>` element
    - that are placed immediately after `<div>` elements
- `element1~element2`
  - `p ~ ul`
  - Selects every `<ul>` element
    - that are preceded by a `<p>` element

Mine:
> gimana yah ini teh bisa ditambahin lagi meureun ya.

## ...

Mine:
> ..., TBA, udah we ah, wing it aja, pokoknya kalo butuh lagi, baca aja dokumen ini, lagi pula, easy.

## Source(s)

- [1]: [CSS Selectors](https://www.w3schools.com/css/css_selectors.asp)
  - > we need to admit, that is a really good resource site.
  - > cuman pake `.asp` segala, deh.
