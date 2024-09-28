+++
title = "hx-on"
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

...