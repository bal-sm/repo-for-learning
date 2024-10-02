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

...
