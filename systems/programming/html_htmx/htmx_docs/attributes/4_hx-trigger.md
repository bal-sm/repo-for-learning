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

...
