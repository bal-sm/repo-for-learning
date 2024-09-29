+++
title = "`hx-trigger` - Mahmuda's version"
+++

- The `hx-trigger` attribute allows you
  - to specify what triggers an AJAX request.
  - A trigger value can be one of the following:

- An event name
  - (e.g.
    - `click`
    - or `my-custom-event`)
  - followed
    - by an event filter
    - and a set of event modifiers
- A polling definition
  - of the form `every <timing declaration>`
- A comma-separated list of such events

### Standard Events

- A standard event,
  - such as `click` can be specified
    - as the trigger like so:

```html
<div hx-get="/clicked" hx-trigger="click">Click Me</div>
```

#### Standard Event Filters - Mahmuda's version

- Events can be filtered
  - by enclosing a boolean javascript expression
    - in square brackets after the event name.
  - If this expression evaluates to `true`
    - the event will be triggered,
    - otherwise it will be ignored.

```html
<div hx-get="/clicked" hx-trigger="click[ctrlKey]">Control Click Me</div>
```

- This event will trigger
  - if a click event is triggered with the `event.ctrlKey` property
    - set to true.

Conditions can also refer to *global* **functions** or **state**:

```html
<div hx-get="/clicked" hx-trigger="click[checkGlobalState()]">Control Click Me</div>
```

And can also be combined using the *standard* **javascript** *syntax*:

```html
<div hx-get="/clicked" hx-trigger="click[ctrlKey&&shiftKey]">Control-Shift Click Me</div>
```

- Note that all symbols used in the expression
  - will be resolved first against the triggering event,
  - and then next against the global namespace,
  - so `myEvent[foo]` will
    - first look for a property named `foo` on the event,
    - then look for a global symbol with the name `foo`

#### Standard Event Modifiers - Mahmuda's version

- Standard events can also have modifiers
  - that change how they behave.
  - The modifiers are:

- `once`
  - the event will only trigger once
    - (e.g. the first click)
- `changed`
  - the event will only change
    - if the value of the element has **changed**.
  - Please pay attention
    - `change` is the name of the event
    - and `changed` is the name of the modifier.
- `delay:<timing declaration>`
  - a delay will occur
    - before an event triggers a request.
  - If the event is seen again
    - it will reset the delay.
- `throttle:<timing declaration>`
  - a throttle will occur
    - after an event triggers a request.
  - If the event is seen again
    - before the delay completes,
      - it is ignored,
      - the element will trigger at the end of the delay.
- `from:<Extended CSS selector>`
  - allows the event
    - that triggers a request
      - to come from another element
        - in the document
    - (e.g. listening to a key event on the body,
      - to support hot keys)
  - A standard CSS selector raesolves to all elements matching that selector.
    - Thus, `from:input` would listen on every input on the page.
  - The CSS selector is only evaluated once
    - and is not re-evaluated when the page changes.
    - If you need to detect dynamically added elements
      - use an event filter,
        - for example `click[event.target.matches('input')]`
  - The extended CSS selector here allows for the following non-standard CSS values:
    - `document`
      - listen for events on the document
    - `window`
      - listen for events on the window
    - `closest <CSS selector>`
      - finds the [closest](https://developer.mozilla.org/docs/Web/API/Element/closest) ancestor element
        - or itself, matching the given css selector
    - `find <CSS selector>`
      - finds the closest child matching the given css selector
    - `next` resolves to [element.nextElementSibling](https://developer.mozilla.org/docs/Web/API/Element/nextElementSibling)
    - `next <CSS selector>`
      - scans the DOM forward
        - for the first element
          - that matches the given CSS selector.
      - (e.g. `next .error` will target the closest following
        - sibling element with `error` class)
    - `previous` resolves to [element.previousElementSibling](https://developer.mozilla.org/docs/Web/API/Element/previousElementSibling)
    - `previous <CSS selector>`
      - scans the DOM backwards
        - for the first element
          - that matches the given CSS selector.
      - (e.g `previous .error` will target the closest previous sibling
        - with `error` class)
- `target:<CSS selector>`
  - allows you to filter
    - via a CSS selector
      - on the target of the event.
  - This can be useful when you want to listen for triggers from elements
    - that might not be in the DOM
      - at the point of initialization,
        - by, for example, listening on the body,
        - but with a target filter for a child element
- `consume`
  - if this option is included the event
    - will not trigger any other htmx requests on parents
    - (or on elements listening on parents)
- `queue:<queue option>`
  - determines how events are queued
    - if an event occurs while a request
      - for another event is in flight.
  - Options are:
    - `first`
      - queue the first event
    - `last`
      - queue the last event (default)
    - `all`
      - queue all events (issue a request for each event)
    - `none`
      - do not queue new events

---

- Here is an example of a search box
  - that searches on `keyup`,
    - but only if the search value has changed
    - and the user hasn't typed anything new for 1 second:

```html
<input name="q"
       hx-get="/search" hx-trigger="keyup changed delay:1s"
       hx-target="#search-results"/>
```

- The response from the `/search` url
  - will be appended to the `div`
    - with the `id` `search-results`.

...
