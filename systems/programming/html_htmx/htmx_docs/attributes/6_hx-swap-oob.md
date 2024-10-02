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

...
