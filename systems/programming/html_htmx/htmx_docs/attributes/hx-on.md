+++
title = "hx-on - Mahmuda's version"
+++

- The `hx-on*`
  - > `hx-on:click`.
  - attributes allow you
    - to embed scripts inline
      - to respond to events directly on an element;
      - similar to the [`onevent` properties](https://developer.mozilla.org/en-US/docs/Web/Events/Event_handlers#using_onevent_properties) found in HTML,
        - > 'JavaScript' thing. Skipppppppp. Heueuh emang, padahal tetep dipake juga. But I really want (at least) Python as interpreter euy, WebAssembly, WebAssembly, I know, Django skip it though. Let's do it, guys.
        - such as `onClick`.

- The `hx-on*` attributes improve upon `onevent`
  - by enabling the handling of any arbitrary JavaScript event,
  - for enhanced [Locality of Behaviour (LoB)](/essays/locality-of-behaviour/)
    - even when dealing with non-standard DOM events.
  - For example, these attributes allow you
    - to handle [htmx events]`(/reference#events)`.

- With `hx-on` attributes,
  - you specify the event name
    - > `click`
      - if you want to respond to a `click` event,
    - as part of the attribute name, after a colon.
      - > `hx-on:click`
  - So, for example:

```html
<div hx-on:click="alert('Clicked!')">Click</div>
```

- Note that this syntax can be used to capture all 'htmx' events,
  - > `hx-on:htmx:bla-bla`
  - as well as most other custom events,
    - in addition to the standard DOM events.
      - > `hx-on:click`

---

- One **gotcha** to note is that DOM attributes
  - do not preserve case.
  - This means, unfortunately, an attribute
    - like ~~`hx-on:htmx:`_`beforeRequest`_~~ **will not work**,
      - because the DOM lowercases the attribute names.
  - Fortunately, htmx supports both:
    - camel case event names
    - and also [kebab-case event names](@/docs.md#events),
      - so you can use `hx-on:htmx:`**`before-request`** instead.

- In order to make writing 'htmx'-based event handlers
  - a little easier,
  - you can use the shorthand double-colon
    - > `hx-on::`
    - for 'htmx' events,
    - and omit the "htmx" part:

```html
<!-- These two are equivalent -->
<button hx-get="/info" hx-on:htmx:before-request="alert('Making a request!')">
    Get Info!
</button>

<button hx-get="/info" hx-on::before-request="alert('Making a request!')">
    Get Info!
</button>
```

---

- If you wish to handle *multiple* different *events*,
  - you can simply *add* *multiple* **attributes** to an element:

```html
<button hx-get="/info"
        hx-on::before-request="alert('Making a request!')"
        hx-on::after-request="alert('Done making a request!')">
    Get Info!
</button>
```

---

_[`JSX`](https://react.dev/learn/writing-markup-with-jsx) thing, no colon (`:`), so dashes (`-`)_

```html
<!-- These two are equivalent -->
<button hx-get="/info" hx-on-htmx-before-request="alert('Making a request!')">
    Get Info!
</button>

<button hx-get="/info" hx-on--before-request="alert('Making a request!')">
    Get Info!
</button>
```

Mine:
> I'm not skippingggg.

---

_Deprecated things, ya deprecated aja_

### Symbols

- Like `onevent`,
  - two symbols are made available
    - to event handler scripts:

- `this`
  - The **element** on
    - > `this` is `form` element.
    - which the `hx-on` attribute
      - is defined
- `event`
  - The event that triggered the handler

### Notes

- `hx-on` is *not* inherited,
  - however due to [event bubbling](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_bubbling_and_capture),
    - > skippppp, meureun nya ieu teh. `rfl`. si Emma pilihnya 'JavaScript', what a fucking loser. Cenah I choose you, 'JavaScript', what a fucking bad starter. I would rather stay at home.
  - `hx-on` attributes on parent elements
    - will typically be triggered by events on child elements
- `hx-on:*` and `hx-on` cannot be used together
  - on the same element;
  - if `hx-on:*` is present,
    - the value of an `hx-on` attribute
      - on the same element will be **ignored**.
    - The two forms can be mixed in the same document, however.
      - > what?

...
