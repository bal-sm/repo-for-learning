# Start Here - Mahmuda's version

Create a blank HTML file somewhere on your computer with a name like: `i-love-alpine.html`

Using a text editor, fill the file with these contents:

```html
<html>
<head>
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
</head>
<body>
    <h1 x-data="{ message: 'I ❤️ Alpine' }" x-text="message"></h1>
</body>
</html>
```

Open your file in a web browser, if you see `I ❤️ Alpine`, you're ready to rumble!

- Now that you're all set up to play around,
  - let's look at three practical examples
    - as a foundation for teaching you the basics of Alpine.
  - By the end of this exercise,
    - you should be more than equipped
      - to start building stuff on your own. Let's goooooo.

## Building a counter - Mahmuda's version

- Let's start with a simple "counter" component
  - to demonstrate the basics of
    - state
    - and event listening in Alpine,
    - two core features.

Insert the following into the `<body>` tag:

```html
<div x-data="{ count: 0 }">
    <button x-on:click="count++">Increment</button>

    <span x-text="count"></span>
</div>
```

Now, you can see with 3 bits of Alpine sprinkled into this HTML, we've created an interactive "counter" component.

Let's walk through what's happening briefly:

### Declaring data - Mahmuda's version

```html
<div x-data="{ count: 0 }">
```

- Everything in Alpine starts with an `x-data` directive.
  - Inside of `x-data`, in plain 'JavaScript',
    - you declare an object of data
      - that 'Alpine' will track.

- Every property inside this object
  - will be made available to other directives
    - inside this HTML element.
  - In addition, when one of these properties changes,
    - everything that relies on it will change as well.

---

[Read more about `x-data`](https://alpinejs.dev/directives/data)

Let's look at `x-on` and see how it can access and modify the `count` property from above:

### Listening for events - Mahmuda's version

```html
<button x-on:click="count++">Increment</button>
```

- `x-on` is a directive
  - you can use to listen
    - for any event on an element.
  - We're listening for a `click` event in this case,
    - so ours looks like:
      - > `x-on:click`.

- You can listen for other events as you'd imagine.
  - For example, listening for a `mouseenter` event
    - would look like this:
      - > `x-on:mouseenter`.

- When a `click` event happens,
  - Alpine will call the associated JavaScript expression,
    - > `count++`
    - in our case.
  - As you can see,
    - we have direct access to data
      - declared in the `x-data` expression.

`x-on` vs. `@`:
> You will often see `@` instead of `x-on:`. This is a shorter, friendlier syntax that many prefer. From now on, this documentation will likely use `@` instead of `x-on:`.

Mine:
> I still use `x-on` anyway.

[Read more about `x-on`](https://alpinejs.dev/directives/on)

...
