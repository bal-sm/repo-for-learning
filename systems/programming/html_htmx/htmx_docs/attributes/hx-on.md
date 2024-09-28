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

- One **gotcha** to note is that DOM attributes
  - do not preserve case.
  - This means, unfortunately, an attribute
    - like ~~`hx-on:htmx:`_`beforeRequest`_~~ **will not work**,
      - because the DOM lowercases the attribute names.
  - Fortunately, htmx supports both:
    - camel case event names
    - and also [kebab-case event names](@/docs.md#events),
      - so you can use `hx-on:htmx:`**`before-request`** instead.

...
