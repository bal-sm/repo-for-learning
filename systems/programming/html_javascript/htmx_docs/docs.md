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

### Triggering Requests {#triggers}

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

...
