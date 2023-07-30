# Django + HTMX guys

## Table of Contents

- [Django + HTMX guys](#django--htmx-guys)
  - [Table of Contents](#table-of-contents)
  - [htmx in a Nutshell](#htmx-in-a-nutshell)
  - [Source(s)](#sources)
  - [Learning in Progress](#learning-in-progress)

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
  - **Now** any _[HTTP verb](https://en.wikipedia.org/wiki/HTTP_Verbs)_, not just `GET` and `POST`, can be used
    > learning-in-progress , is it really necessary to use these HTTP verbs?
  - Now any element, not just the entire window, can be the target for update by the request
    > kayak tadi `parent-div` tea

Note that: (very important) 
> when you are using `htmx`, on the server side you _typically respond with `HTML`_, **not `JSON`**. 
> 
> This keeps you firmly within the [original web programming model](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm), 

Mine:
> Ew, wtf reads that.

The rest of the note:
> using [Hypertext As The Engine Of Application State](https://en.wikipedia.org/wiki/HATEOAS) without even needing to really understand that concept.

Mine:
> Okay, y'know, kayak biasa aja bacot aneh-aneh gening, padahal simple conceptnya, kayak wtf is out of band coba.

## Source(s)

- [Django & HTMX by Bugbytes](https://www.youtube.com/playlist?list=PL-2EBeDYMIbRByZ8GXhcnQSuv2dog4JxY)

## Learning in Progress

From [this video](https://www.youtube.com/watch?v=Ula0c_rZ6gk&list=PL-2EBeDYMIbRByZ8GXhcnQSuv2dog4JxY&index=1&t=65s):

Note 1:
> What is AJAX requests?

Note 2:
Him:
> It can simplify your architecture instead using library such as React or Vue.js.

---
