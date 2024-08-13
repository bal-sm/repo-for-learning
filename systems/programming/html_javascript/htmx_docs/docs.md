# `htmx` Documentation - Mahmuda's version

Mine:
> 1 file-in aja we, `htmx/www/content/docs.md` -> `docs.md` di sini.

Mine:
> terus jangan lupa `rfl` singleton ini, <https://github.com/bal-sm/bal_simple_finance_app_with_django_and_htmx>.

## htmx in a Nutshell - Introduction - Mahmuda's version

- `htmx` is a library
  - that allows you
    - to access modern browser features
      - **directly** from HTML,
      - *rather* than using JavaScript.

- To understand `htmx`,
  - first lets take a look at an anchor tag:

```html
<a href="/blog">Blog</a>
```

This anchor tag tells a browser:

> - When a user clicks on this link,
>   - issue an HTTP GET request to `/blog`
>   - and load the response content
>     - **into** the browser window.

---

With that in mind, consider the following bit of HTML:

```html
<button hx-post="/clicked"
    hx-trigger="click"
    hx-target="#parent-div"
    hx-swap="outerHTML"
>
    Click Me!
</button>
```

This tells `htmx`:

> - When a user clicks on this button,
>   - issue an HTTP POST request
>     - to `/clicked`
>   - and use the content from the response
>     - to replace the element
>       - with the id `parent-div` in the DOM

---

- `htmx` extends
  - and generalizes
    - the core idea of HTML
      - as a hypertext,
  - opening up many more possibilities directly within the language:
    - Now any element,
      - not just anchors and forms,
        - can issue an HTTP request
    - Now any event,
      - not just clicks or form submissions,
        - can trigger requests
    - Now any [HTTP verb](https://en.wikipedia.org/wiki/HTTP_Verbs),
      - not just `GET` and `POST`,
        - can be used
    - Now any element,
      - not just the entire window,
        - can be the target for update by the request

---

- Note that
  - when you are using `htmx`,
    - on the server side
  - you typically respond:
    - **with** *`HTML`*,
    - **not** *`JSON`*.
  - This keeps you firmly
    - within the [original web programming model](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm),
    - using [Hypertext As The Engine Of Application State](https://en.wikipedia.org/wiki/HATEOAS)
    - without even needing to really understand that concept.
    - > wow, baca, learning note.

---

- It's worth mentioning that,
  - if you prefer,
    - you can use the [`data-`](https://html.spec.whatwg.org/multipage/dom.html#attr-data-*) prefix
  - when using htmx:

```html
<a data-hx-post="/click">Click Me!</a>
```

Them:
> Finally, [Version 1](https://v1.htmx.org) of htmx is still supported and supports IE11.

Mine:
> who cares.

## 1.x to 2.x Migration Guide

Them:
> If you are migrating to htmx 2.x from [htmx 1.x](https://v1.> htmx.org), please see the [htmx 1.x migration guide](@/migration-guide-htmx-1.md).
>
> If you are migrating to htmx from intercooler.js, please see the [intercooler migration guide](@/migration-guide-intercooler.md).

Mine:
> Okay! Enggak tp.

## Installing - Mahmuda's version

- Htmx is
  - a dependency-free,
  - browser-oriented javascript library.
  - This means that
    - using it is
      - as simple
        - as adding a `<script>` tag
    - to your document head.
  - There is no need for a build system to use it.

Mine:
> bagus banget yah plugin system-nya juga kayaknya.

_skipped, cara lainnya, udah we ah_

### Via A CDN (e.g. `unpkg.com`)

The fastest way to get going with htmx is to load it via a CDN. You can simply add this to your head tag and get going:

```html
<script src="https://unpkg.com/htmx.org@2.0.2" integrity="sha384-Y7hw+L/jvKeWIRRkqWYfPcvVxHzVzn5REgzbawhxAuQGwX1XWe70vji+VSeHOThJ" crossorigin="anonymous"></script>
```

An unminified version is also available for debugging as well:

```html
<script src="https://unpkg.com/htmx.org@2.02/dist/htmx.js" integrity="sha384-yZq+5izaUBKcRgFbxgkRYwpHhHHCpp5nseXp0MEQ1A4MTWVMnqkmcuFez8x5qfxr" crossorigin="anonymous"></script>
```

While the CDN approach is extremely simple, you may want to consider [not using CDNs in production](https://blog.wesleyac.com/posts/why-not-javascript-cdn).

Mine:
> pake ini aja deh aku.

## AJAX - Mahmuda's version

- The **core** of `htmx`
  - is a set of attributes
    - that allow you
      - to issue AJAX requests
        - directly from HTML:

- [`hx-get`](@/attributes/hx-get.md)
  - Issues a `GET` request to the given URL
- [`hx-post`](@/attributes/hx-post.md)
  - Issues a `POST` request to the given URL
- [hx-put](@/attributes/hx-put.md)
  - Issues a `PUT` request to the given URL
- [hx-patch](@/attributes/hx-patch.md)
  - Issues a `PATCH` request to the given URL
- [hx-delete](@/attributes/hx-delete.md)
  - Issues a `DELETE` request to the given URL

---

- Each of these attributes
  - takes a URL
    - to issue an AJAX request to.
  - The element will
    - issue a request
      - of the specified type
        - to the given URL
          - when the element is [triggered](#triggers):

```html
<button hx-put="/messages">
    Put To Messages
</button>
```

This tells the browser:

> - When a user clicks on this button,
>   - issue a PUT request
>     - to the URL `/messages`
>       - and load the response into the button

### Triggering Requests - Mahmuda's version {#triggers}

- By default,
  - AJAX requests
    - are triggered
      - by the "natural" event
        - of an element:

- `input`, `textarea` & `select`
  - are triggered on the `change` event
- `form`
  - is triggered on the `submit` event
- everything else
  - is triggered by the `click` event

- If you
  - want different behavior
    - you can use the [hx-trigger](@/attributes/hx-trigger.md) attribute
      - to specify which event will cause the request.

- Here is a `div`
  - that posts to `/mouse_entered`
    - when a mouse enters it:

```html
<div hx-post="/mouse_entered" hx-trigger="mouseenter">
    [Here Mouse, Mouse!]
</div>
```

#### Trigger Modifiers - Mahmuda's version

- A trigger can also
  - have a few additional modifiers
    - that change its behavior.
  - For example,
    - if you want a request
      - to only happen once,
    - you can use the `once` modifier for the trigger:

```html
<div hx-post="/mouse_entered" hx-trigger="mouseenter once">
    [Here Mouse, Mouse!]
</div>
```

Other modifiers you can use for triggers are:

- `changed`
  - only issue a request if the value of the element has changed
- `delay:<time interval>`
  - wait the given amount of time (e.g. `1s`) before issuing the request.
    - If the event triggers again, the countdown is reset.
- `throttle:<time interval>`
  - wait the given amount of time (e.g. `1s`) before issuing the request.
  - Unlike `delay` if a new event occurs before the time limit is hit the event will be discarded, so the request will trigger at the end of the time period.
- `from:<CSS Selector>` - listen for the event on a different element.  This
  - can be used for things like keyboard shortcuts.
  - **Note** that this CSS selector is not re-evaluated if the page changes.

---

- You can use these attributes
  - to implement many common UX patterns,
  - such as [Active Search](@/examples/active-search.md):

```html
<input type="text" name="q"
    hx-get="/trigger_delay"
    hx-trigger="keyup changed delay:500ms"
    hx-target="#search-results"
    placeholder="Search..."
>
<div id="search-results"></div>
```

- This input will
  - issue a request 500 milliseconds
    - > `500ms`
  - after a key up event
    - > `keyup`
  - if the input has been changed
    - > `changed`
  - and inserts the results
    - into the `div`
      - with the id `search-results`.

- Multiple triggers
  - can be specified
    - in the [`hx-trigger`](@/attributes/hx-trigger.md) attribute,
    - separated by commas.
    - > kumaha ieu teh?, learning note.

#### Trigger Filters - Mahmuda's version

- You may also
  - apply trigger filters
    - by using square brackets
      - after the event name,
        - > `hx-trigger="click[ctrlKey]"`
        - enclosing a javascript expression
          - that will be evaluated.
  - If the expression
    - evaluates to `true`
      - the event will trigger,
      - otherwise it will not.

---

- Here is an example
  - that triggers only
    - on a Control-Click of the element

```html
<div hx-get="/clicked" hx-trigger="click[ctrlKey]">
    Control Click Me
</div>
```

- Properties like `ctrlKey`
  - will be resolved
    - against the triggering event first,
      - then against the global scope.
  - The(n) `this` symbol will be set to the current element.

#### Special Events - Mahmuda's version

- `htmx`
  - provides a few special events
    - for use in [hx-trigger](@/attributes/hx-trigger.md):

- `load`
  - fires once
    - when the element is first loaded
- `revealed`
  - fires once
    - when an element
      - first scrolls into the viewport
- `intersect`
  - fires once
    - when an element
      - first intersects the viewport.
  - This supports two additional options:
    - `root:<selector>`
      - a CSS selector of the root element for intersection
    - `threshold:<float>`
      - a floating point number between 0.0 and 1.0, indicating what amount of intersection to fire the event on

Them, note:
> You can also use custom events to trigger requests if you have an advanced use case.

#### Polling - Mahmuda's version

- If you want an element
  - to poll the given URL
  - rather than wait for an event,
  - you can use the `every` syntax with the [`hx-trigger`](@/attributes/hx-trigger.md) attribute:

```html
<div hx-get="/news" hx-trigger="every 2s"></div>
```

- This tells htmx
  - Every 2 seconds,
    - issue a `GET`
      - to `/news`
    - and load the response into the div

---

- If you want to stop polling
  - from a server response
  - you can respond
    - with the HTTP response code [`286`](https://en.wikipedia.org/wiki/86_(term))
      - and the element will cancel the polling.

#### Load Polling {#load_polling} - Mahmuda's version

- Another technique
  - that can be used to achieve polling
    - in htmx
      - is "load polling",
        - where an element specifies
          - a `load` trigger along with a delay,
          - and replaces itself with the response:

```html
<div hx-get="/messages"
    hx-trigger="load delay:1s"
    hx-swap="outerHTML"
>
</div>
```

- If the `/messages` end point
  - keeps returning a div
    - set up this way,
  - it will keep "polling" back to the URL every
second.

- Load polling
  - can be useful in situations
    - where a poll
      - has an end point
        - at which point the polling terminates, such as
          - when you are showing the user a [progress bar](@/examples/progress-bar.md).

### Request Indicators - Mahmuda's version

- When an AJAX request is issued
  - it is often good
    - to let the user know
      - that something is happening
      - since the browser will not give them any feedback.
  - You can accomplish this in htmx by using `htmx-indicator` class.
    - > `class="htmx-indicator"`.

- The `htmx-indicator` class
  - is defined
    - so that the opacity of any element
      - with this class is `0` by default,
        - making it invisible
        - but present in the DOM.

- When `htmx` issues a request,
  - it will put a `htmx-request` class
    - onto an element
      - (either the requesting element or another element, if specified).
  - The `htmx-request` class will
    - cause a child element
      - with the `htmx-indicator` class on it
        - to transition to an opacity of 1,
          - showing the indicator.

---

Mine:
> ~~cuman di-kode-nya mah gak diapa-apain loh, opacity-nya, sebenernya.~~ eh gimana sih? oh iya maksudnya otomatis gitu loh. `htmx-request`, on a parent -> a child `htmx-indicator`, an `img` -> `img.opacity = 0` -> transition to `img.opacity = 1`. gitu aja we dulu.

```html
<button hx-get="/click">
    Click Me!
    <img class="htmx-indicator" src="/spinner.gif">
</button>
```

- Here we have a button.
  - When it is clicked the `htmx-request` class
    - will be added to it,
    - which will reveal the spinner gif element.
      - (I like [SVG spinners](http://samherbert.net/svg-loaders/) these days.)

---

- While the `htmx-indicator` class
  - uses opacity
    - to hide
    - and show the progress indicator,
  - if you would
    - prefer another mechanism
      - you can create your own CSS transition like so:

```css
.htmx-indicator{
    display:none;
}
.htmx-request .htmx-indicator{
    display:inline;
}
.htmx-request.htmx-indicator{
    display:inline;
}
```

---

- If you want the `htmx-request` class
  - added to a different element,
    - you can use the [hx-indicator](@/attributes/hx-indicator.md) attribute
      - with a CSS selector to do so:

```html
<div>
    <button hx-get="/click" hx-indicator="#indicator">
        Click Me!
    </button>
    <img id="indicator" class="htmx-indicator" src="/spinner.gif"/>
</div>
```

- Here we call out the indicator
  - explicitly by `id`.
  - Note that
    - we could have placed the class
      - on the parent `div` as well
      - and had the same effect.
      - > okay, terus kenapa gak gitu? mending yang mana, dahlah.

...
