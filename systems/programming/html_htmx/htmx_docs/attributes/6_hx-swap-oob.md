+++
title = "`hx-swap-oob`"
+++

- The `hx-swap-oob` attribute
  - allows you to specify that some content
    - in a response should be
      - swapped into the DOM somewhere
      - other than the target,
        - that is **"Out of Band"**.
        - This allows you to piggy back updates to other element updates on a response.

Consider the following response HTML:

```html
<div id="..." other-than-that="...">
    ...
</div>
<div id="alerts" hx-swap-oob="true">
    Saved!
</div>
```

- The first `div` will be swapped
  - into the target the usual manner.
  - The second `div`,
    - however, will be swapped in
      - as a replacement for the element
        - with the id `alerts`,
        - and will not end up in the target.

---

_Mahmuda's version_

1. The original `html`:

```html
<div id="..." other-than-that="...">
    ...
</div>
<div id="alerts" hx-swap-oob="true">
    Saved!
</div>
```

2. The response:

```html
<div id="alerts">
    Bookmarked!
</div>
```

3. The DOM's aftermath of `html`:

```html
<div id="..." other-than-that="...">
    ...
</div>
<div id="alerts">
    Bookmarked!
</div>
```

---

---

The value of the `hx-swap-oob` can be:

- `true`
- any valid [`hx-swap`](@/attributes/hx-swap.md) value
- any valid [`hx-swap`](@/attributes/hx-swap.md) value,
  - followed by a colon,
    - > **`show:`**
    - followed by a CSS selector
      - > `show:`**`window:top`**

- If the value
  - is:
    - `true` or
    - `outerHTML`
    - (which are equivalent)
  - the element will be swapped inline.

- If a swap value is given,
  - that swap strategy will be used.
    - > `hx-swap-oob="textContent"`

- If a selector is given,
  - > `#some-id`
  - all elements matched by that selector
    - will be swapped.
  - If not, the element with an ID
    - matching the new content will be swapped.

...
