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

---

- `htmx` extends and generalizes the core idea of `HTML` as a _**hypertext**_, 
  > opening up many more possibilities directly within the language:
  - **Now** any element, not just anchors and forms, can issue an HTTP request
    > Misalnya kayak button di atas tadi, terus HTTP request a response text yang bakal ditaro di id yang namanya `parent-div`
  - **Now** any event, not just clicks or form submissions, can trigger requests
    > Okay, learning-in-progress , fill this plz maksudnya gimana.

## Source(s)

- [Django & HTMX by Bugbytes](https://www.youtube.com/playlist?list=PL-2EBeDYMIbRByZ8GXhcnQSuv2dog4JxY)

## Learning in Progress

Note 1:
> What is AJAX requests?

Note 2:
Him:
> It can simplify your architecture instead using library such as React or Vue.js.
