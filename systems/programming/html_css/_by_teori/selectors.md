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
  - > **`#`**`some-id`

- The `id` of an element
  - is **unique** within a page,
  - so the `id` selector
    - is used to select one unique element!
  - > a `p` tag with `id=para1` and another `p` / any other type of element (`h1`) with `id=para1` are not **valid**.
  - > another `rfl` topic bisa, maintenance and learning note.

- To select an element with a specific `id`,
  - write a hash (`#`) character,
    - followed by the `id` of the element.

...

## Source(s)

- [1]: [CSS Selectors](https://www.w3schools.com/css/css_selectors.asp)
  - > we need to admit, that is a really good resource site.
  - > cuman pake `.asp` segala, deh.
