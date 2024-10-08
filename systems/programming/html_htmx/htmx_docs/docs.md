# `htmx` Documentation - Mahmuda's version

Mine:
> ~~1 file-in aja we, `htmx/www/content/docs.md` -> `docs.md` di sini.~~ jangan ketang.

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
      - > `rfl`.
    - using [Hypertext As The Engine Of Application State](https://en.wikipedia.org/wiki/HATEOAS)
      - > `rfl`.
    - without even needing to really understand that concept.
    - > wow, baca, learning note. (2✖️)

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

- You can also add the [`disabled` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled)
  - to elements for the duration
    - of a request
      - by using the [hx-disabled-elt](@/attributes/hx-disabled-elt.md) attribute.

### Targets - Mahmuda's version

- If you want the response
  - to be loaded
    - into a different element
    - other than the one that made the request,
    - you can use the [hx-target](@/attributes/hx-target.md) attribute,
      - which takes a CSS selector.
  - Looking back at our Live Search example:

```html
<input type="text" name="q"
    hx-get="/trigger_delay"
    hx-trigger="keyup delay:500ms changed"
    hx-target="#search-results"
    placeholder="Search..."
>
<div id="search-results"></div>
```

- You can see that the results from the search
  - are going to be loaded
    - into `div#search-results`,
    - rather than into the `input` tag.

#### Extended CSS Selectors - Mahmuda's version

- `hx-target`,
  - and most attributes that take a CSS selector,
    - support an "extended" CSS syntax:

- You can use the `this` keyword,
  - which indicates
    - that the element
      - that the `hx-target` attribute
        - is on is the target
- The `closest <CSS selector>` syntax
  - will find the [`closest`](https://developer.mozilla.org/docs/Web/API/Element/closest):
    - ancestor element
    - or itself,
    - that matches the given CSS selector.
  - (e.g. `closest tr` will target the closest table row to the element)
- The `next <CSS selector>` syntax
  - will find the next element
    - in the DOM
      - matching the given CSS selector.
- The `previous <CSS selector>` syntax
  - will find the previous element
    - in the DOM
      - matching the given CSS selector.
- `find <CSS selector>`
  - which will find
    - the first child descendant element
      - that matches the given CSS selector.
  - (e.g `find tr` would target the first child descendant row to the element)

---

- In addition,
  - a CSS selector may be wrapped in `<` and `/>` characters,
    - mimicking the [query literal](https://hyperscript.org/expressions/query-reference/) syntax of hyperscript.

- Relative targets
  - like this can be useful
    - for creating flexible user interfaces
      - without peppering your DOM
        - with lots of `id` attributes.

### Swapping - Mahmuda's version

- `htmx` offers a few different ways
  - to swap the HTML
    - returned into the DOM.
  - By default, the content
    - replaces the `innerHTML`
      - of the target element.
  - You can modify this
    - by using the [hx-swap](@/attributes/hx-swap.md) attribute
      - with any of the following values:

- `innerHTML`
  - the default,
    - puts the content
      - inside the target element
- `outerHTML`
  - replaces the entire target element
    - with the returned content
- `afterbegin`
  - prepends the content
    - before the first child
      - inside the target
- `beforebegin`
  - prepends the content
    - before the target
      - in the target's parent element
- `beforeend`
  - appends the content
    - after the last child
      - inside the target
- `afterend`
  - appends the content
    - after the target
      - in the target's parent element
- `delete`
  - deletes the target element
    - regardless of the response
- `none`
  - does not append content
    - from response ([Out of Band Swaps](#oob_swaps)
    - and [Response Headers](#response-headers) will still be processed)
- > ~~hah.~~ it's easy just do it yourself.

#### Morph Swaps - Mahmuda's version

- In addition to the standard swap mechanisms above,
  - `htmx` also supports _morphing_ swaps,
    - via extensions.
- Morphing swaps
  - attempt to _merge_ new content
    - into the existing DOM,
    - rather than simply replacing it.
  - They often do a better job
    - preserving things like
      - focus,
      - video state,
      - etc.
    - by mutating existing nodes
      - in-place
        - during the swap operation,
          - at the cost of more CPU.

The following extensions are available for morph-style swaps:

- [Idiomorph](https://github.com/bigskysoftware/idiomorph#htmx)
  - A morphing algorithm created by the `htmx` developers.
- [Morphdom Swap](https://github.com/bigskysoftware/htmx-extensions/blob/main/src/morphdom-swap/README.md)
  - Based on the [morphdom](https://github.com/patrick-steele-idem/morphdom),
    - the original DOM morphing library.
- [Alpine-morph](https://github.com/bigskysoftware/htmx-extensions/blob/main/src/alpine-morph/README.md)
  - Based on the [alpine morph](https://alpinejs.dev/plugins/morph) plugin,
    - plays well with alpine.js
    - > do I need this?

#### View Transitions - Mahmuda's version

- The new, experimental [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
  - gives developers a way
    - to create an animated transition
      - between different DOM states.
  - It is still in active development
    - and is not available in all browsers,
    - but htmx provides
      - a way to work
        - with this new API
          - that falls back
            - to the non-transition mechanism
              - if the API is not available in a given browser.

You can experiment with this new API using the following approaches:

- Set the `htmx.config.globalViewTransitions` config variable
  - to `true` to use transitions for all swaps
- Use the `transition:true` option
  - in the `hx-swap` attribute
- If an element swap
  - is going to be transitioned
    - due to either of the above configurations,
      - you may catch the `htmx:beforeTransition` event
      - and call `preventDefault()` on it to cancel the transition.

- View Transitions can be configured
  - using CSS,
    - as outlined in [the Chrome documentation for the feature](https://developer.chrome.com/docs/web-platform/view-transitions/#simple-customization).

- You can see a view transition example
  - on the [Animation Examples](/examples/animations#view-transitions) page.

#### Swap Options - Mahmuda's version

- The [hx-swap](@/attributes/hx-swap.md) attribute
  - supports many options
    - for tuning the swapping behavior of htmx.
  - For example, by default
    - htmx will swap
      - in the title of a title tag
        - found anywhere in the new content.
    - You can turn this behavior off by setting the `ignoreTitle` modifier to true:

```html
    <button hx-post="/like" hx-swap="outerHTML ignoreTitle:true">Like</button>
```

The modifiers available on `hx-swap` are:

- `transition`
  - `true` or `false`,
    - whether to use the view transition API for this swap
- `swap`
  - The swap delay to use
    - (e.g. `100ms`)
    - between
      - when old content is cleared
      - and the new content is inserted
- `settle`
  - The settle delay to use
    - (e.g. `100ms`)
    - between
      - when new content is inserted
      - and when it is settled
- `ignoreTitle`
  - If set to `true`,
    - any title found in the new content
      - will be ignored
      - and not update the document title
- `scroll`
  - `top` or `bottom`,
    - will scroll the target element
      - to its top
      - or bottom
- `show`
  - `top` or `bottom`,
    - will scroll the target element's
      - top
      - or bottom
      - into view

- All swap modifiers appear
  - after the swap style is specified,
    - > `outerHTML`
  - ~~and are colon-separated~~.
    - > `:`, what kela. maksudnya `option:value` meureun ya..

See the [hx-swap](@/attributes/hx-swap.md) documentation for more details on these options.

### Synchronization - Mahmuda's version

- Often you want to coordinate the requests
  - between two elements.
  - For example,
    - you may want a request
      - from one element
        - to supersede
          - the request of another element,
      - or to wait until
        - the other element's request has finished.

- htmx offers a [`hx-sync`](@/attributes/hx-sync.md) attribute
  - to help you accomplish this.

---

- Consider a race condition between
  - a form submission
  - and an individual input's validation request
  - in this HTML:

```html
<form hx-post="/store">
    <input id="title" name="title" type="text"
        hx-post="/validate"
        hx-trigger="change">
    <button type="submit">Submit</button>
</form>
```

- Without using `hx-sync`,
  - filling out the input
  - and immediately submitting the form
    - triggers two parallel requests to
      - `/validate`
      - and `/store`.

---

- Using `hx-sync="closest form:abort"` on the input
  - will watch for requests
    - on the form
  - and abort the input's request
    - if a form request is present or starts
    - while the input request is in flight:

```html
<form hx-post="/store">
    <input id="title" name="title" type="text"
        hx-post="/validate"
        hx-trigger="change"
        hx-sync="closest form:abort">
    <button type="submit">Submit</button>
</form>
```

- This resolves the synchronization
  - between the two elements in a declarative way.

---

- htmx also supports a programmatic way
  - to cancel requests:
    - you can send the `htmx:abort` event
      - to an element
        - to cancel any in-flight requests:

```html
<button id="request-button" hx-post="/example">
    Issue Request
</button>
<button onclick="htmx.trigger('#request-button', 'htmx:abort')">
    Cancel Request
</button>
```

---

- More examples and details can be found on the [`hx-sync` attribute page.](@/attributes/hx-sync.md)
  - > me: wajib baca lanjut nih, learning note.

### CSS Transitions - Mahmuda's version

- `htmx` makes it easy to use [CSS Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions)
  - without javascript.
  - Consider this HTML content:

```html
<div id="div1">Original Content</div>
```

---

- Imagine this content
  - is replaced by `htmx`
    - via an `ajax` request
      - with this new content:

```html
<div id="div1" class="red">New Content</div>
```

Note two things:

- The div
  - has the *same* `id`
    - in the original
    - and in the new content
- The `red` class
  - has been added
    - to the new content

---

- Given this situation,
  - we can write a CSS transition
    - from the old state to the new state:

```css
.red {
    color: red;
    transition: all ease-in 1s ;
}
```

Mine:
> berarti pake `hx-swap` terus `outerHTML` attribute-nya (sic, wrong term). ye kan?

---

- When `htmx` swaps in this new content,
  - it will do so in such a way
    - that the CSS transition
      - will apply to the new content,
        - giving you a nice, smooth transition to the new state.

- So, in summary,
  - all you need to do
    - to use CSS transitions
      - for an element
        - is keep its `id` stable across requests!

You can see the [Animation Examples](@/examples/animations.md) for more details and live demonstrations.

#### Details - Mahmuda's version

- To understand how CSS transitions
  - actually work in `htmx`,
    - you must understand
      - the underlying
        - `swap`
        - & `settle` model
        - that htmx uses.

- When new content is received from a server,
  - before the content is swapped in,
  - the existing content of the page is examined
    - for elements that match by the `id` attribute.
  - If a match is found for an element in the new content,
    - the attributes of the old content are copied
      - onto the new element before the swap occurs.
    - The new content is then swapped in,
      - but with the *old* attribute values.
    - Finally, the new attribute values are swapped in,
      - after a "settle" delay (20ms by default).
    - A little crazy, but this is what allows CSS transitions to work
      - without any javascript by the developer.

### Out of Band Swaps - Mahmuda's version

- If you want to swap content
  - from a response directly
    - into the DOM
      - by using the `id` attribute
        - you can use the [`hx-swap-oob`](@/attributes/hx-swap-oob.md) attribute
          - in the *response* html:

```html
<div id="message" hx-swap-oob="true">Swap me directly!</div>
Additional Content
```

Mine:
> - pake something `hx-post` and `hx-swap` ~~meureun ya~~, ya.
> - jadi kalo ada swapping ke original DOM yang `id`-nya sama-sama `message` maka langsung aja ganti juga element itu.

- In this response,
  - `div#message` would be
    - swapped directly into the matching DOM element,
  - while the additional content would be
    - swapped into the target in the normal manner.

You can use this technique to "piggy-back" updates on other requests.

#### Troublesome Tables - Mahmuda's version

- Table elements can be problematic
  - when combined with out of band swaps,
    - because, by the HTML spec,
    - many can't stand on their own in the DOM
      - e.g.
        - `<tr>`
        - or `<td>`

To avoid this issue you can use a `template` tag to encapsulate these elements:

```html
<template>
    <tr id="message" hx-swap-oob="true"><td>Joe</td><td>Smith</td></tr>
</template>
```

#### Selecting Content To Swap - Mahmuda's version

- If you want to select a subset of the response HTML
  - to swap into the target,
    - you can use the [`hx-select`](@/attributes/hx-select.md) attribute,
      - which takes a CSS selector
        - and selects the matching elements
          - from the response.

- You can also pick out pieces of content
  - for an out-of-band swap
    - by using the [`hx-select-oob`](@/attributes/hx-select-oob.md) attribute,
      - which takes a list of element IDs
        - > `id=something`
        - to pick out and swap.

Mine:
> gimana tuh contohnya, learning note

#### Preserving Content During A Swap - Mahmuda's version

- If there is content
  - that you wish to be preserved
    - across swaps
      - (e.g. a video player that you wish to remain playing even if a swap occurs)
  - you can use the [hx-preserve](@/attributes/hx-preserve.md) attribute
    - on the elements you wish to be preserved.

Mine:
> gimana tuh contohnya (2), learning note.

### Parameters - Mahmuda's version

- By default,
  - an element that causes a request
    - will include its value
      - if it has one.
  - If the element is a form
    - it will include the values of all inputs within it.

- As with HTML forms,
  - the `name` attribute
    - of the input
    - is used as the parameter name
      - in the request that `htmx` sends.

- Additionally, if the element causes a non-`GET` request,
  - the values of all the inputs
    - of the nearest enclosing form
      - will be included.

- If you wish to include the values of other elements,
  - you can use the [hx-include](@/attributes/hx-include.md) attribute
    - with a CSS selector
      - of all the elements
      - whose values you want
        - to include in the request.

- If you wish to filter out some parameters
  - you can use the [hx-params](@/attributes/hx-params.md) attribute.

- Finally, if you want to programmatically modify the parameters,
  - you can use the [htmx:configRequest](@/events.md#htmx:configRequest) event.

Mine:
> - masih gak ngerti. I wish ada kayak step-by-step debug info.
>   - cuman kayaknya kalo aku serius Client Side Scripting + Alpine.js, bakal berguna banget ini..

#### File Upload - Mahmuda's version

- If you wish to upload files via an htmx request,
  - you can set the [hx-encoding](@/attributes/hx-encoding.md) attribute
    - to `multipart/form-data`.
  - This will use a `FormData` object to submit the request,
    - which will properly include the file in the request.

- Note that depending on your server-side technology,
  - you may have to handle requests
    - with this type of body content
      - very differently.

- Note that htmx fires a `htmx:xhr:progress` event periodically
  - based on the standard `progress` event during upload,
    - which you can hook into to show the progress of the upload.

- See the [examples section](@/examples/_index.md)
  - for more advanced form patterns,
  - including
    - [progress bars](@/examples/file-upload.md)
    - and [error handling](@/examples/file-upload-input.md).

#### Extra Values - Mahmuda's version

- You can include extra values in a request
  - using
    - the [hx-vals](@/attributes/hx-vals.md)
      - (name-expression pairs in JSON format)
    - and [hx-vars](@/attributes/hx-vars.md) attributes
      - (comma-separated name-expression pairs that are dynamically computed).

Mine, learning note:
> gimana ini teh? terus kode-nya? lanjutin ya.

### Confirming Requests - Mahmuda's version

- Often you will want to confirm an action
  - before issuing a request.
  - htmx supports the [`hx-confirm`](@/attributes/hx-confirm.md) attribute,
    - which allows you to confirm an action
      - using a simple javascript dialog:

```html
<button hx-delete="/account" hx-confirm="Are you sure you wish to delete your account?">
    Delete My Account
</button>
```

- Using events you can implement more sophisticated confirmation dialogs.
  - The [confirm example](@/examples/confirm.md)
    - shows how to use [sweetalert2](https://sweetalert2.github.io/) library
      - for confirmation of htmx actions.

#### Confirming Requests Using Events - Mahmuda's version

- Another option to do confirmation
  - with is via the [`htmx:confirm` event](@/events.md#htmx:confirm) event.
    - This event is fired on *every* trigger
      - for a request
        - (not just on elements that have a `hx-confirm` attribute)
        - and can be used to implement asynchronous confirmation of the request.

- Here is an example using
  - [sweet alert](https://sweetalert.js.org/guides/)
    - on any element
      - with a `confirm-with-sweet-alert='true'` attribute on it:

```javascript
document.body.addEventListener('htmx:confirm', function(evt) {
  if (evt.target.matches("[confirm-with-sweet-alert='true']")) {
    evt.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Are you sure you are sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((confirmed) => {
      if (confirmed) {
        evt.detail.issueRequest();
      }
    });
  }
});
```

## Attribute Inheritance - Mahmuda's version

- Most attributes in htmx are inherited:
  - they apply to the element they are on
    - as well as any children elements.
  - This allows you to "hoist" attributes up the DOM
    - to avoid code duplication.
  - Consider the following htmx:

```html
<button hx-delete="/account" hx-confirm="Are you sure?">
    Delete My Account
</button>
<button hx-put="/account" hx-confirm="Are you sure?">
    Update My Account
</button>
```

- Here we have a duplicate `hx-confirm` attribute.
  - We can hoist this attribute to a parent element:

```html
<div hx-confirm="Are you sure?">
    <button hx-delete="/account">
        Delete My Account
    </button>
    <button hx-put="/account">
        Update My Account
    </button>
</div>
```

This `hx-confirm` attribute will now apply to all htmx-powered elements within it.

---

- Sometimes you wish to undo this inheritance.
  - Consider if we had a cancel button to this group,
    - but didn't want it to be confirmed.
  - We could add an `unset` directive on it like so:

```html
<div hx-confirm="Are you sure?">
    <button hx-delete="/account">
        Delete My Account
    </button>
    <button hx-put="/account">
        Update My Account
    </button>
    <button hx-confirm="unset" hx-get="/">
        Cancel
    </button>
</div>
```

- The top two buttons
  - would then show a confirm dialog,
- but the bottom cancel button would not.

---

- Inheritance can be disabled
  - on a per-element
  - and per-attribute basis
  - using the [`hx-disinherit`](@/attributes/hx-disinherit.md) attribute.

- If you wish to disable attribute inheritance entirely,
  - you can set the `htmx.config.disableInheritance` configuration variable
    - to `true`.
  - This will disable inheritance as a default,
    - and allow you to specify inheritance explicitly
      - with the [`hx-inherit`](@/attributes/hx-inherit.md) attribute.

## Boosting - Mahmuda's version

- 'Htmx' supports "boosting" regular HTML anchors and forms
  - with the [hx-boost](@/attributes/hx-boost.md) attribute.
    - This attribute will convert
      - all anchor tags and forms
        - into AJAX requests that,
          - by default, target the body of the page.

Here is an example:

```html
<div hx-boost="true">
    <a href="/blog">Blog</a>
</div>
```

- The anchor tag in this div
  - will issue an AJAX `GET` request
    - to `/blog`
    - and swap the response into the `body` tag.

### Progressive Enhancement - Mahmuda's version

- A feature of `hx-boost`
  - is that it degrades gracefully
    - if javascript is not enabled:
      - the links and forms continue to work,
      - they simply don't use ajax requests.
  - This is known as [Progressive Enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement),
    - and it allows a wider audience to use your site's functionality.
  - > me: who needs this, skip?

- Other 'htmx' patterns can be adapted to achieve progressive enhancement as well,
  - but they will require more thought.

- Consider the [active search](@/examples/active-search.md) example.
  - As it is written,
    - it will not degrade gracefully:
      - someone who does not have javascript enabled
        - will not be able to use this feature.
    - This is done for simplicity’s sake,
      - to keep the example as brief as possible.

---

However, you could wrap the htmx-enhanced input in a form element:

```html
<form action="/search" method="POST">
    <input class="form-control" type="search"
        name="search" placeholder="Begin typing to search users..."
        hx-post="/search"
        hx-trigger="keyup changed delay:500ms, search"
        hx-target="#search-results"
        hx-indicator=".htmx-indicator">
</form>
```

- With this in place,
  - javascript-enabled clients
    - would still get the nice active-search UX,
  - but non-javascript enabled clients
    - would be able to hit the enter key and still search.
    - Even better, you could add a "Search" button as well.
- You would then need to update the form
  - with an `hx-post`
    - that mirrored the `action` attribute,
    - or perhaps use `hx-boost` on it.

---

- You would need to check
  - on the server side
  - for the `HX-Request` header
    - to differentiate between
      - an htmx-driven
      - and a regular request,
      - to determine exactly what to render to the client.

Other patterns can be adapted similarly to achieve the progressive enhancement needs of your application.

- As you can see, this requires more thought and more work.
  - It also rules some functionality entirely out of bounds.
  - These tradeoffs must be made by you,
    - the developer,
    - with respect to your projects goals and audience.

---

- [Accessibility](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/What_is_accessibility) is a concept
  - closely related to progressive enhancement.
  - Using progressive enhancement techniques such as `hx-boost`
    - will make your htmx application more accessible
      - to a wide array of users.

- 'htmx'-based applications are very similar
  - to normal,
  - non-AJAX driven web applications
  - because 'htmx' is HTML-oriented.

- As such, the normal HTML accessibility recommendations apply.
  - For example:

- Use semantic HTML as much as possible
  - (i.e. the right tags for the right things)
- Ensure focus state is clearly visible
- Associate text labels with all form fields
- Maximize the readability of your application
  - with appropriate fonts, contrast, etc.

## Web Sockets & SSE - Lite Mod

- Web Sockets and Server Sent Events (SSE)
  - are supported via extensions.
    - Please see:
      - the [SSE extension](https://github.com/bigskysoftware/htmx-extensions/blob/main/src/sse/README.md)
      - and [WebSocket extension](https://github.com/bigskysoftware/htmx-extensions/blob/main/src/ws/README.md)
      - pages to learn more.

[mdn](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API):
> - The **WebSocket API** is an advanced technology
>   - that makes it possible
>     - to open a two-way interactive communication session
>       - between
>         - the user's browser
>         - and a server.
>   - With this API,
>     - you can send messages to a server
>     - and receive event-driven responses
>       - without having to poll the server for a reply.

[mdn](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events):
> - Traditionally, a web page has to send a request
>   - to the server to receive new data;
>   - that is, the page requests data from the server.
>   - With server-sent events, it's possible for a server
>     - to send new data
>       - to a web page at any time,
>         - by pushing messages to the web page.
>     - These incoming messages can be treated
>       - as Events + data
>         - inside the web page.

Mine:
> Aku inget ada course yang ngajarin bikin chat pake AJAX request yang talk pake interval terus-menerus. wtf.

## History Support - Mahmuda's version

- 'Htmx' provides a simple mechanism
  - for interacting with the [browser history API](https://developer.mozilla.org/en-US/docs/Web/API/History_API):

- If you want a given element
  - to push its request URL
    - into the browser navigation bar
    - and add the current state of the page to the browser's history,
  - include the [hx-push-url](@/attributes/hx-push-url.md) attribute:

```html
<a hx-get="/blog" hx-push-url="true">Blog</a>
```

- When a user clicks on this link,
  - 'htmx' will snapshot the current DOM
    - and store it
      - before it makes a request to `/blog`.
- It then does the swap
  - and pushes a new location
    - onto the history stack.

- When a user hits the back button,
  - 'htmx' will retrieve the old content
    - from storage
  - and swap it back into the target,
    - simulating "going back" to the previous state.
  - If the location is not found in the cache, '
    - htmx' will make an 'ajax' request to the given URL,
      - with the header `HX-History-Restore-Request` set to true,
    - and expects back the HTML needed for the entire page.
  - Alternatively, if the `htmx.config.refreshOnHistoryMiss` config variable
    - is set to true,
      - it will issue a hard browser refresh.

- **NOTE:** If you push a URL into the history,
  - you **must** be able to navigate to that URL
    - and get a full page back!
  - A user could copy and paste the URL
    - into an email,
    - or new tab.
  - Additionally, 'htmx' will need the entire page
    - when restoring history
      - if the page is not in the history cache.

### Specifying History Snapshot Element - Mahmuda's voice note version

- By default, htmx will use the `body` to take
  - and restore the history snapshot from.
  - This is usually the right thing,
    - but if you want to use a narrower element
      - for snapshotting
        - you can use the [hx-history-elt](@/attributes/hx-history-elt.md) attribute
          - to specify a different one.

Careful: this element will need to be on all pages or restoring from history won't work reliably.

Mine:
> I don't see any real benefit from using this for my own personal project.

### Undoing DOM Mutations By 3rd Party Libraries - skipped

Mine:
> baca we geura, really? harus gitu? bye third party libraries yang kurang senonoh sama 'htmx' gitu.

### Disabling History Snapshots - Mahmuda's version

Mine:
> _yang ini tidak di-skip_

- History snapshotting can be disabled
  - for a URL
  - by setting the [hx-history](@/attributes/hx-history.md) attribute
    - to `false`
  - on any element in the current document,
    - or any html fragment loaded into the current document by htmx.
  - This can be used to prevent sensitive data
    - entering the `localStorage` cache,
      - which can be important for shared-use / public computers.
  - History navigation will work as expected,
    - but on restoration the URL
      - will be requested from the server
        - instead of the local history cache.

Mine:
> - 'Alpine' + 'htmx' + 'Alpine-morph'
>   - vs.
>     - 'Alpine' + 'htmx'

## Requests + Responses - Mahmuda's version

- 'Htmx' expects responses
  - > from `hx-post` & `hx-get`.
  - to the AJAX requests
    - it makes to be HTML,
      - typically HTML fragments
      - (although a full HTML document, matched with a [hx-select](@/attributes/hx-select.md) tag can be useful too).
  - 'Htmx' will then swap the returned HTML
    - into the document
      - at the target specified
      - and with the swap strategy specified.

---

- Sometimes you might want to do nothing in the swap,
  - but still perhaps trigger a client side event ([see below](#response-headers)).
    - > JavaScript thing?

- For this situation, by default,
  - you can return a `204 - No Content` response code,
  - and 'htmx' will ignore the content of the response.
  - > bait and switch thing. I actually want to restart the client DOM (not sic).

- In the event of an error response from the server
  - (e.g. a `404` or a `501`),
  - 'htmx' will trigger the [`htmx:responseError`](@/events.md#htmx:responseError) event,
    - which you can handle.

- In the event of a connection error,
  - the [`htmx:sendError`](@/events.md#htmx:sendError) event
    - will be triggered.

### Configuring Response Handling - Mahmuda's version

- You can configure the above behavior of htmx by:
  - mutating
  - or replacing the a`htmx.config.responseHandling` array.
  - This object is a collection of `JavaScript` objects
    - defined like so:

```js
    responseHandling: [
        {code:"204", swap: false},   // 204 - No Content by default does nothing, but is not an error
        {code:"[23]..", swap: true}, // 200 & 300 responses are non-errors and are swapped
        {code:"[45]..", swap: false, error:true}, // 400 & 500 responses are not swapped and are errors
        {code:"...", swap: false}    // catch all for any other response code
    ]
```

- When `htmx` receives a response
  - it will iterate in order
    - over the `htmx.config.responseHandling` array
  - and test if the `code` property
    - of a given object,
    - when treated as a Regular Expression (`Regex`),
      - matches the current response.
        - > hah. learning note ieu.
  - If an entry does match the current response code,
    - it will be used to determine
      - if and
      - how;
      - the response will be processed.

- The fields available
  - for response handling configuration
    - on entries in this array are:

- `code`
  - a 'String' representing a regular expression
    - that will be tested against response codes.
- `swap`
  - `true`
    - if the response should be **swapped** into the DOM,
  - `false` otherwise
- `error`
  - `true`
    - if htmx should treat this response as an **error**
- `ignoreTitle`
  - `true`
    - if htmx should **ignore title** tags in the response
- `select`
  - A CSS selector to use to **select content** from the response
- `target`
  - A CSS selector specifying an **alternative target** for the response
- `swapOverride`
  - An *alternative* **swap** **mechanism** for the response

#### Configuring Response Handling Examples - Mahmuda's version

- As an example of how to use this configuration,
  - consider a situation
    - when a server-side framework responds
      - with a [`422 - Unprocessable Entity`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422) response
        - when validation errors occur.
    - By default, htmx will ignore the response, since it matches the Regular Expression `[45]..`.

- Using the [meta config](#configuration-options) mechanism
  - for configuring response handling,
  - we could add the following config:

```html
<!--
  * 204 No Content by default does nothing, but is not an error
  * 2xx, 3xx and 422 responses are non-errors and are swapped
  * 4xx & 5xx responses are not swapped and are errors
  * all other responses are swapped using "..." as a catch-all
-->
<meta
	name="htmx-config"
	content='{
        "responseHandling":[
            {"code":"204", "swap": false},
            {"code":"[23]..", "swap": true},
            {"code":"422", "swap": true},
            {"code":"[45]..", "swap": false, "error":true},
            {"code":"...", "swap": true}
        ]
    }'
/>
```

Mine:
> suka deh ih architecture of putting things-nya unified pisan. buatan aing.

- If you wanted to swap everything,
  - regardless of HTTP response code,
  - you could use this configuration:

```html
<meta name="htmx-config" content='{code:".*", swap: true}, // all responses are swapped'>
```

- Finally, it is worth considering using the [Response Targets](https://github.com/bigskysoftware/htmx-extensions/blob/main/src/response-targets/README.md)
extension,
  - which allows you
    - to configure the behavior of response codes
      - declaratively via attributes.

### CORS

- When using `htmx` in a cross origin context,
  - remember to configure your web server
    - to set `Access-Control` headers in order for `htmx` headers to be visible
      - on the client side.

- [`Access-Control-Allow-Headers` (for request headers)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers)
- [`Access-Control-Expose-Headers` (for response headers)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers)

[See all the request and response headers that `htmx` implements.](@/reference.md#request_headers)

Mine:
> Jangan. Gak usah, kalo bukan search engine thing. I want Google for myself.

### Request Headers - Mahmuda's version

`htmx` includes a number of useful headers in requests:

- `HX-Boosted`
  - indicates that the request is _via an **element**_ using [`hx-boost`](@/attributes/hx-boost.md)
- `HX-Current-URL`
  - _the current **URL**_ of the browser
- `HX-History-Restore-Request`
  - "true" if the request is for history restoration after a miss in the local history cache
- `HX-Prompt`
  - _the user **response**_ to an [hx-prompt](@/attributes/hx-prompt.md)
- `HX-Request`
  - always "true"
- `HX-Target`
  - the `id` of the target element if it exists
- `HX-Trigger-Name`
  - the `name` of the triggered element if it exists
- `HX-Trigger`
  - the `id` of the triggered element if it exists

### Response Headers - Mahmuda's version

`htmx` supports some `htmx`-specific response headers:

- [`HX-Location`](@/headers/hx-location.md)
  - *allows* you to do a client-side **redirect**
    - that does not do a full page reload
- [`HX-Push-Url`](@/headers/hx-push-url.md)
  - *pushes* a new **url** into the history stack
- `HX-Redirect`
  - can be used to do a *client-side* **redirect**
    - _to a new location_
      - (full page reload)
- `HX-Refresh`
  - if set to "true" the client-side
    - will do a *full* **refresh** of the page
- [`HX-Replace-Url`](@/headers/hx-replace-url.md)
  - *replaces* the current **URL** in the location bar
- `HX-Reswap`
  - *allows* you to *specify* how the **response**
    - will be **swapped**.
  - See [hx-swap](@/attributes/hx-swap.md) for possible values
- `HX-Retarget`
  - a CSS selector that *updates* the target of the **content update**
    - to a different *element* on the page
- `HX-Reselect`
  - a CSS selector that allows you to *choose*
    - which part of the *response* is used
      - to be swapped in.
  - Overrides an existing [`hx-select`](@/attributes/hx-select.md)
    - on the triggering element
- [`HX-Trigger`](@/headers/hx-trigger.md)
  - allows you to *trigger* *client-side* *events*
- [`HX-Trigger-After-Settle`](@/headers/hx-trigger.md)
  - allows you to trigger client-side events _after the **settle** step_
- [`HX-Trigger-After-Swap`](@/headers/hx-trigger.md)
  - allows you to trigger client-side events _after the **swap** step_

For more on the `HX-Trigger` headers, see [`HX-Trigger` Response Headers](@/headers/hx-trigger.md).

- Submitting a form via htmx has the benefit
  - of no longer needing the [Post/Redirect/Get Pattern](https://en.wikipedia.org/wiki/Post/Redirect/Get).
  - After successfully processing a `POST` request on the server,
    - you don't need to return a [HTTP 302 (Redirect)](https://en.wikipedia.org/wiki/HTTP_302).
  - You can directly return the new HTML fragment.

### Request Order of Operations - Mahmuda's version

The order of operations in a 'htmx' request are:

- The element is triggered and begins a request
  1. _Values are **gathered**_ for the request
  2. The `htmx-request` class is **applied** to the appropriate elements
  3. The request is then **issued** *asynchronously* via `AJAX`
     1. Upon getting a response the target element is **marked** with the `htmx-swapping` class
     2. An optional **swap** *delay* is **applied** (see the [hx-swap](@/attributes/hx-swap.md) attribute)
     3. The *actual* *content* **swap** is done
        1. the `htmx-swapping` class is **removed** from the target
        2. the `htmx-added` class is **added** to each new piece of content
        3. the `htmx-settling` class is **applied** to the target
        4. A *settle* **delay** is done (default: 20ms)
        5. The `DOM` is **settled**
        6. the `htmx-settling` class is **removed** _from the target_
        7. the `htmx-added` class is **removed** _from each new piece of content_

- You can use
  - the `htmx-swapping`
  - and `htmx-settling` classes;
  - to create [CSS transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions) between pages.

## Validation - Mahmuda's version

- 'Htmx' integrates with the [HTML5 Validation API](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
  - and will not issue a request for a 'form'
    - if a validatable input is invalid.
  - This is true for both `AJAX` requests
    - as well as `WebSocket` sends.

- 'Htmx' fires events around validation
  - that can be used to hook in:
    - custom validation,
    - and error handling:

- `htmx:validation:validate`
  - called before an element's `checkValidity()` method
    - is called.
  - May be used to add in custom validation logic
- `htmx:validation:failed`
  - called when `checkValidity()` returns **`false`**,
    - indicating an invalid input
- `htmx:validation:halted`
  - called when a request is not issued
    - due to validation errors.
  - Specific errors may be found
    - in the `event.detail.errors` object

- Non-form elements do not validate
  - before they make requests by default,
  - but you can enable validation by setting
    - the [`hx-validate`](@/attributes/hx-validate.md) attribute to **`true`**.

Mine, learning note:
> What if Django's form?

### Validation Example - Mahmuda's version

- Here is an example of
  - an input that uses the [`hx-on`](/attributes/hx-on) attribute
    - to catch the `htmx:validation:validate` event
    - and require that the input
      - have the value `foo`:

```html
<form id="example-form" hx-post="/test">
    <input name="example"
           onkeyup="this.setCustomValidity('') // reset the validation on keyup"
           hx-on:htmx:validation:validate="if(this.value != 'foo') {
                    this.setCustomValidity('Please enter the value foo') // set the validation error
                    htmx.find('#example-form').reportValidity()          // report the issue
                }">
</form>
```

- Note that all client side validations must be re-done on the server side,
  - as they can always be bypassed.

Mine:
> udah we gini aja, jangan ribet masalah harus ngirim ke Django's views terus, meureun. In the end, it's JavaScript land, it sucks.

## Animations - Gini aja

- 'Htmx' allows you to use [CSS transitions](#css_transitions)
  - in many situations using only 'HTML' and 'CSS'.

- Please see the [Animation Guide](@/examples/animations.md)
  - for more details on the options available.

## Extensions - Mahmuda's version

- Htmx has an extension mechanism
  - that allows you to customize the libraries' behavior.
  - Extensions [are defined in 'javascript'](https://github.com/bigskysoftware/htmx-extensions/tree/main?tab=readme-ov-file#defining-an-extension)
    - and then used via the [`hx-ext`](@/attributes/hx-ext.md) attribute:

```html
<div hx-ext="debug">
    <button hx-post="/example">This button used the debug extension</button>
    <button hx-post="/example" hx-ext="ignore:debug">This button does not</button>
</div>
```

- If you are interested in adding your own extension to htmx,
  - please [see the extension docs](https://github.com/bigskysoftware/htmx-extensions/tree/main?tab=readme-ov-file#defining-an-extension)

## Events & Logging

_Skipped_

## Debugging

_Skipped_

## Scripting - Mahmuda's version

_Skipped, bentar ketang_

Them, quote, jadi mine:
> - [AlpineJS](https://alpinejs.dev/)
>   - Alpine.js provides a rich set of tools
>     - for creating sophisticated front end scripts, including:
>       - reactive programming support,
>         - while still remaining extremely lightweight.
> - Alpine encourages the "inline scripting" approach
>   - that we feel pairs well with htmx.

Mine:
> Wow, another wholesome day on the books, valentine's day, I cannot wait to have diner with my husband, I really appreciate that he brings a new housemate, even though the bills are not paid, and the girl is unemployed. Caitlin Weilly. Caitlin Reilly, I said it like that 'cause another video, on the books.
>
> And that's what I call, real `JavaScript` framework.

But, them:
> - We have an entire chapter entitled ["Client-Side Scripting"](https://hypermedia.systems/client-side-scripting/)
>   - in [our book](https://hypermedia.systems)
>   - that looks at how scripting can be integrated
>     - into your htmx-based application

### Examples - Lite

#### 1

```html
<button onclick="alert('You clicked me!')">
    Click Me!
</button>
```

#### 2

```html
<button hx-on:click="alert('You clicked me!')">
    Click Me!
</button>
```

#### 3

```html
<button hx-post="/example"
        hx-on:htmx:config-request="event.detail.parameters.example = 'Hello Scripting!'">
    Post Me!
</button>
```

#### 4

```html
<form class="sortable" hx-post="/items" hx-trigger="end">
    <div class="htmx-indicator">Updating...</div>
    <div><input type='hidden' name='item' value='1'/>Item 1</div>
    <div><input type='hidden' name='item' value='2'/>Item 2</div>
    <div><input type='hidden' name='item' value='2'/>Item 3</div>
</form>
```

#### 5

```javascript
$(document).ready(function() {
    var sortables = document.body.querySelectorAll(".sortable");
    for (var i = 0; i < sortables.length; i++) {
        var sortable = sortables[i];
        new Sortable(sortable, {
            animation: 150,
            ghostClass: 'blue-background-class'
        });
    }
});
```

#### 6

```js
htmx.onLoad(function(content) {
    var sortables = content.querySelectorAll(".sortable");
    for (var i = 0; i < sortables.length; i++) {
        var sortable = sortables[i];
        new Sortable(sortable, {
            animation: 150,
            ghostClass: 'blue-background-class'
        });
    }
})
```

#### 7

```js
let myDiv = document.getElementById('my-div')
fetch('http://example.com/movies.json')
    .then(response => response.text())
    .then(data => { myDiv.innerHTML = data; htmx.process(myDiv); } );
```

#### 8

```html
<div x-data="{show_new: false}"
    x-init="$watch('show_new', value => {
        if (show_new) {
            htmx.process(document.querySelector('#new_content'))
        }
    })">
    <button @click = "show_new = !show_new">Toggle New Content</button>
    <template x-if="show_new">
        <div id="new_content">
            <a hx-get="/server/newstuff" href="#">New Clickable</a>
        </div>
    </template>
</div>
```

### Web Components

- Please see the [Web Components Examples](@/examples/web-components.md) page
  - for examples on how to integrate 'htmx'
    - with web components.

## Caching

_Skipped, kapan-kapan_

## Security

_Skipped, tapi **harus**_

## Configuring htmx - Original

Htmx has some configuration options that can be accessed either programmatically or declaratively.  They are
listed below:

<div class="info-table">

| Config Variable                       | Info                                                                                                                                                                                                                                                                                                                                              |
|---------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `htmx.config.historyEnabled`          | defaults to `true`, really only useful for testing                                                                                                                                                                                                                                                                                                |
| `htmx.config.historyCacheSize`        | defaults to 10                                                                                                                                                                                                                                                                                                                                    |
| `htmx.config.refreshOnHistoryMiss`    | defaults to `false`, if set to `true` htmx will issue a full page refresh on history misses rather than use an AJAX request                                                                                                                                                                                                                       |
| `htmx.config.defaultSwapStyle`        | defaults to `innerHTML`                                                                                                                                                                                                                                                                                                                           |
| `htmx.config.defaultSwapDelay`        | defaults to 0                                                                                                                                                                                                                                                                                                                                     |
| `htmx.config.defaultSettleDelay`      | defaults to 20                                                                                                                                                                                                                                                                                                                                    |
| `htmx.config.includeIndicatorStyles`  | defaults to `true` (determines if the indicator styles are loaded)                                                                                                                                                                                                                                                                                |
| `htmx.config.indicatorClass`          | defaults to `htmx-indicator`                                                                                                                                                                                                                                                                                                                      |
| `htmx.config.requestClass`            | defaults to `htmx-request`                                                                                                                                                                                                                                                                                                                        |
| `htmx.config.addedClass`              | defaults to `htmx-added`                                                                                                                                                                                                                                                                                                                          |
| `htmx.config.settlingClass`           | defaults to `htmx-settling`                                                                                                                                                                                                                                                                                                                       |
| `htmx.config.swappingClass`           | defaults to `htmx-swapping`                                                                                                                                                                                                                                                                                                                       |
| `htmx.config.allowEval`               | defaults to `true`, can be used to disable htmx's use of eval for certain features (e.g. trigger filters)                                                                                                                                                                                                                                         |
| `htmx.config.allowScriptTags`         | defaults to `true`, determines if htmx will process script tags found in new content                                                                                                                                                                                                                                                              |
| `htmx.config.inlineScriptNonce`       | defaults to `''`, meaning that no nonce will be added to inline scripts                                                                                                                                                                                                                                                                           |
| `htmx.config.attributesToSettle`      | defaults to `["class", "style", "width", "height"]`, the attributes to settle during the settling phase                                                                                                                                                                                                                                           |
| `htmx.config.inlineStyleNonce`        | defaults to `''`, meaning that no nonce will be added to inline styles                                                                                                                                                                                                                                                                            |
| `htmx.config.useTemplateFragments`    | defaults to `false`, HTML template tags for parsing content from the server (not IE11 compatible!)                                                                                                                                                                                                                                                |
| `htmx.config.wsReconnectDelay`        | defaults to `full-jitter`                                                                                                                                                                                                                                                                                                                         |
| `htmx.config.wsBinaryType`            | defaults to `blob`, the [type of binary data](https://developer.mozilla.org/docs/Web/API/WebSocket/binaryType) being received over the WebSocket connection                                                                                                                                                                                       |
| `htmx.config.disableSelector`         | defaults to `[hx-disable], [data-hx-disable]`, htmx will not process elements with this attribute on it or a parent                                                                                                                                                                                                                               |
| `htmx.config.withCredentials`         | defaults to `false`, allow cross-site Access-Control requests using credentials such as cookies, authorization headers or TLS client certificates                                                                                                                                                                                                 |
| `htmx.config.timeout`                 | defaults to 0, the number of milliseconds a request can take before automatically being terminated                                                                                                                                                                                                                                                |
| `htmx.config.scrollBehavior`          | defaults to 'smooth', the behavior for a boosted link on page transitions. The allowed values are `auto` and `smooth`. Smooth will smoothscroll to the top of the page while auto will behave like a vanilla link.                                                                                                                                |
| `htmx.config.defaultFocusScroll`      | if the focused element should be scrolled into view, defaults to false and can be overridden using the [focus-scroll](@/attributes/hx-swap.md#focus-scroll) swap modifier.                                                                                                                                                                        |
| `htmx.config.getCacheBusterParam`     | defaults to false, if set to true htmx will append the target element to the `GET` request in the format `org.htmx.cache-buster=targetElementId`                                                                                                                                                                                                  |
| `htmx.config.globalViewTransitions`   | if set to `true`, htmx will use the [View Transition](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API) API when swapping in new content.                                                                                                                                                                                    |
| `htmx.config.methodsThatUseUrlParams` | defaults to `["get"]`, htmx will format requests with these methods by encoding their parameters in the URL, not the request body                                                                                                                                                                                                                 |
| `htmx.config.selfRequestsOnly`        | defaults to `true`, whether to only allow AJAX requests to the same domain as the current document                                                                                                                                                                                                                                     |
| `htmx.config.ignoreTitle`             | defaults to `false`, if set to `true` htmx will not update the title of the document when a `title` tag is found in new content                                                                                                                                                                                                                   |
| `htmx.config.disableInheritance`      | disables attribute inheritance in htmx, which can then be overridden by the [`hx-inherit`](@/attributes/hx-inherit.md) attribute                                                                                                                                                                                                                  |
| `htmx.config.scrollIntoViewOnBoost`   | defaults to `true`, whether or not the target of a boosted element is scrolled into the viewport. If `hx-target` is omitted on a boosted element, the target defaults to `body`, causing the page to scroll to the top.                                                                                                                           |
| `htmx.config.triggerSpecsCache`       | defaults to `null`, the cache to store evaluated trigger specifications into, improving parsing performance at the cost of more memory usage. You may define a simple object to use a never-clearing cache, or implement your own system using a [proxy object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Proxy) |
| `htmx.config.allowNestedOobSwaps`     | defaults to `true`, whether to process OOB swaps on elements that are nested within the main response element. See [Nested OOB Swaps](@/attributes/hx-swap-oob.md#nested-oob-swaps).                                                                                                                                                              |

</div>

You can set them directly in javascript, or you can use a `meta` tag:

```html
<meta name="htmx-config" content='{"defaultSwapStyle":"outerHTML"}'>
```

## Conclusion

And that's it!

- Have fun with htmx!
  - You can accomplish [quite a bit](@/examples/_index.md)
    - without writing a lot of code!

## Source(s)

- [1]: [`htmx`'s Documentation](https://github.com/bigskysoftware/htmx/blob/eeaad206e89eff30db112a66dafb13ac75a0948a/www/content/docs.md)
