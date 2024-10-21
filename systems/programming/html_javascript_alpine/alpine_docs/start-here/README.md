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

### Reacting to changes - Mahmuda's version

```html
<span x-text="count"></span>
```

- `x-text` is an 'Alpine' directive
  - you can use to set the text content of an element
    - to the result of a 'JavaScript' expression.

- In this case, we're telling 'Alpine'
  - to always make sure that the contents of this `span` tag
    - reflect the value of the `count` property.

- In case it's not clear,
  - > `x-text`,
    - like most directives
      - accepts a plain JavaScript expression as an argument.
        - So for example, you could instead set its contents to:
          - `x-text="count * 2"`
          - and the text content of the `span`
            - will now always be 2 times the value of `count`.

[Read more about `x-text`](https://alpinejs.dev/directives/text)

## Building a dropdown - Mahmuda's version

- Now that we've seen some basic functionality,
  - let's keep going and look at an important directive in Alpine:
    - > `x-show`,
    - by building a contrived "dropdown" component.

Insert the following code into the `<body>` tag:

```html
<div x-data="{ open: false }">
    <button @click="open = ! open">Toggle</button>

    <div x-show="open" @click.outside="open = false">Contents...</div>
</div>
```

- If you load this component,
  - you should see that the "Contents..."
    - are hidden by default.
  - You can toggle showing them on the page
    - by clicking the "Toggle" button.

Them, skip:
> The `x-data` and `x-on` directives should be familiar to you from the previous example, so we'll skip those explanations.

### Toggling elements - Mahmuda's version

```html
<div x-show="open" ...>Contents...</div>
```

- `x-show` is an extremely powerful directive
  - in Alpine that can be used
    - to show and
    - hide a block of HTML on a page;
    - based on the result of a JavaScript expression,
      - > in our case: `open`.

Them:
> [→ Read more about `x-show`](/directives/show)

### Listening for a click outside - Mahmuda's version

```html
<div ... @click.outside="open = false">Contents...</div>
```

- You'll notice something new in this example: `.outside`.
  - Many directives in Alpine accept "modifiers"
    - that are chained
      - onto the end of the directive
      - and are separated by periods.

Them, important:
> - In this case, `.outside` tells Alpine
>   - to instead of
>     - listening for a click
>       - INSIDE the `<div>`,
>   - > plz just:
>     - to listen for the click only
>       - if it happens OUTSIDE the `<div>`.

- This is a convenience helper built into Alpine
  - because this is a common need
  - and implementing it by hand is
    - annoying
    - and complex.

[→ Read more about `x-on` modifiers](/directives/on#modifiers)

## Building a search input - Mahmuda's version

- Let's now build a more complex component
  - and introduce a handful of
    - other directives
      - > more `x`-es.
    - and patterns.

Insert the following code into the `<body>` tag:

```html
<div
    x-data="{
        search: '',

        items: ['foo', 'bar', 'baz'],

        get filteredItems() {
            return this.items.filter(
                i => i.startsWith(this.search)
            )
        }
    }"
>
    <input x-model="search" placeholder="Search...">

    <ul>
        <template x-for="item in filteredItems" :key="item">
            <li x-text="item"></li>
        </template>
    </ul>
</div>
```

```what-is-this
<!-- START_VERBATIM -->
<div class="demo">
    <div
        x-data="{
            search: '',

            items: ['foo', 'bar', 'baz'],

            get filteredItems() {
                return this.items.filter(
                    i => i.startsWith(this.search)
                )
            }
        }"
    >
        <input x-model="search" placeholder="Search...">

        <ul class="pl-6 pt-2">
            <template x-for="item in filteredItems" :key="item">
                <li x-text="item"></li>
            </template>
        </ul>
    </div>
</div>
<!-- END_VERBATIM -->
```

Mine:
> apa ya.

- By default,
  - all of the `items`:
    - (`foo`,
    - `bar`,
    - and `baz`);
    - will be shown on the page,
  - but you can filter them
    - by typing into the text input.
  - As you type, the list of items
    - will change
      - to reflect what you're searching for.

Them:
> Now there's quite a bit happening here, so let's go through this snippet piece by piece.

### Multi line formatting - Mahmuda's version

- The first thing I'd like to point out
  - is that `x-data` now
    - has a lot more going on in it
      - > than before.
  - To make it easier to write and read,
    - we've split it up into multiple lines in our HTML.
      - > me: wow.
    - This is completely optional
      - and we'll talk more in a bit
        - about how to avoid this problem altogether,
          - but for now, we'll keep all of this JavaScript directly in the HTML.

...

## Source(s)

- [1]: [`start-here.md`](https://github.com/bal-sm/alpine/blob/main/packages/docs/src/en/start-here.md)
- [2]: [Start Here](https://alpinejs.dev/start-here)
