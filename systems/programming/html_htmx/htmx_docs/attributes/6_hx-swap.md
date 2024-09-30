+++
title = "`hx-swap` - Mahmuda's version"
+++

- The `hx-swap` attribute allows you
  - to specify how the response will be swapped
    - in relative to the [target](@/attributes/hx-target.md)
      - of an 'AJAX' request.
  - If you do not specify the option,
    - the default is `htmx.config.defaultSwapStyle` (`innerHTML`).

The possible values of this attribute are:

* `innerHTML`
  - Replace the inner html of the target element
  - > what? so the `div`s of the original element are untouched?
* `outerHTML`
  - Replace the entire target element with the response
  - > much better!
* `textContent`
  - Replace the text content of the target element,
    - without parsing the response as HTML
* `beforebegin`
  - Insert the response
    - before the target element
* `afterbegin`
  - Insert the response
    - before the first child
      - of the target element
* `beforeend`
  - Insert the response
    - after the last child
      - of the target element
* `afterend`
  - Insert the response
    - after the target element
* `delete`
  - Deletes the target element
    - regardless of the response
* `none`
  - Does not append content from response
    - (out of band items will still be processed).

Them, wow:
> - These options are based
>   - on standard DOM naming
>   - and the [`Element.insertAdjacentHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML) specification.

So in this code:

```html
  <div hx-get="/example" hx-swap="afterend">Get Some HTML & Append It</div>
```

- The `div` will issue a request to `/example`
  - and append the returned content after the `div`.

### Modifiers - Mahmuda's version

- The `hx-swap` attributes
  - supports modifiers
    - for changing the behavior of the swap.
      - They are outlined below.

#### Transition: `transition`

- If you want to use the new [View Transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API) API
  - when a swap occurs,
  - you can use the `transition:true` option for your swap.
  - You can also enable this feature globally
    - by setting the `htmx.config.globalViewTransitions` config
      - setting to `true`.

#### Timing: `swap` & `settle`

- You can modify the amount of time
  - that 'htmx' will wait after receiving a response to swap the content
    - by including a `swap` modifier:

```html
  <!-- this will wait 1s before doing the swap after it is received -->
  <div hx-get="/example" hx-swap="innerHTML swap:1s">Get Some HTML & Append It</div>
```

---

- Similarly, you can modify the time between the swap
  - and the settle logic
    - by including a `settle` modifier:

```html
  <!-- this will wait 1s before doing the swap after it is received -->
  <div hx-get="/example" hx-swap="innerHTML settle:1s">Get Some HTML & Append It</div>
```

- These attributes
  - can be used
    - to synchronize 'htmx'
      - with the timing of CSS **transition** *effects*.

...