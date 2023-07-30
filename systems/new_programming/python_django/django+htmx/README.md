# Django + HTMX guys

## [htmx in a Nutshell](https://htmx.org/docs/#introduction)

- `htmx` is a library that 
  - allows you to access modern browser features directly from HTML, rather than using JavaScript.

```html
<a href="/blog">Blog</a>
```

This anchor tag tells a browser:
> - When a user clicks on this link:
>   - issue an `HTTP` `GET` request to `/blog` and 
>   - load the response content into the browser window.

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

This tells htmx:
> - When a user clicks on this button:
>   - issue an `HTTP` `POST` request to `/clicked` and 
>   - use _the **content** from the response_ to 
>     - **replace** _the element with the id `parent-div`_ in the [`DOM`](https://www.w3schools.com/js/js_htmldom.asp).

## Source(s)

- [Django & HTMX by Bugbytes](https://www.youtube.com/playlist?list=PL-2EBeDYMIbRByZ8GXhcnQSuv2dog4JxY)

## Learning in Progress

Note 1:
> What is AJAX requests?

Note 2:
Him:
> It can simplify your architecture instead using library such as React or Vue.js.
