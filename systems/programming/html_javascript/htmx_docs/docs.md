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
>     - **into** the browser window".

...
