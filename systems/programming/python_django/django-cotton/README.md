# Django Cotton

## Intro from [2]

Bringing component-based design to Django templates.

- Docs site + demos: [1] tea.

## Why Cotton? from [2]

- Cotton aims to overcome [certain limitations](#limitations-in-django-that-cotton-overcomes-from-2)
  - that exist in the django template system
    - > `{% include %}`
    - that hold us back when we want to apply modern practises
      - > `{{ name }}` to `{% include %}`, how, gitu we lah.
      - to compose UIs in a modular and reusable way.

## Key Features from [2]

- Modern UI Composition
  - > `{{ name }}` to a `c-card` html's element.
  - Efficiently compose and reuse UI components.
- Interoperable with Django
  - > you can use `{% tag %}` and `{{ form|crispy }}`.
  - Cotton only enhances django's existing template system (no Jinja needed).
- HTML-like Syntax
  - > > liat aja hasil component element-nya.
  - Better code editor support and productivity as component tags are similar to html tags.
  - > bisa pake 'prettier' jadinya sebenernya cuman udah we ah.
- Minimal Overhead
  - > it's actually not that different with using Django's tags tea, jadi engine-nya juga light.
  - Compiles to native Django components with dynamic caching.
- Encapsulates UI
  - > separation concern tea.
  - Keep layout, design and interaction in one file (especially when paired with Tailwind and Alpine.js)
- Compliments HTMX
  - > `hx` attributes are compatible with this.
  - Create smart components, reducing repetition and enhancing maintainability.

## Usage Basics, from [2]

- Component Placement
  - Components should be placed
    - in the `templates/cotton` folder
    - (or define a [custom folder](https://django-cotton.com/docs/configuration)).
- Naming Conventions
  - Component filenames
    - use `snake`**`_`**`case`
    - `my_component.html`
  - Components are called
    - using `kebab`**`-`**`case`
    - and prefixed by `c-`
    - `<c-my-component />`

## Walkthrough, from [2]

### Your first component

```html
<!-- cotton/button.html -->
<a href="/" class="...">{{ slot }}</a>
```

```html
<!-- in view -->
<c-button>Contact</c-button>
```

```html
<!-- html output -->
<a href="/" class="...">Contact</a>
```

- Everything provided
  - between the opening and closing tag
    - is provided to the component as `{{ slot }}`.
    - It can contain
      - any content,
      - HTML or
      - Django template expression.
  - > terus teh bisa gini, `type={{ type }}`, gening, terus emang digituin cara kerja-nya. it's divine.
    - > ini teh misalnya, reimplement Django's `Form`, soalnya honestly terlalu kaku templating system-nya, teu puguh.

### Add attributes

```html
<!-- cotton/button.html -->
<a href="{{ url }}" class="...">
    {{ slot }}
</a>
```

```html
<!-- in view -->
<c-button url="/contact">Contact</c-button>
```

- > terus ini bisa
  - > pake `href="{{ url 'some_url_name' arg_1 arg_2 }}"`
  - > jangan lupa `href="{{ my_object.get_absolute_url }}"`

```html
<!-- html output -->
<a href="/contact" class="...">
    Contact
</a>
```

...

## ...

...

## Limitations in Django that Cotton overcomes, from [2]

..., TBA.

## ...

...

## Notes

Mine:
> Masih ada perbedaan antara docs di dua source tersebut, makanya diginiin aja dulu, [1] and [2].

## Source(s)

- [1]: [Django Cotton Official Documentation](https://django-cotton.com/)
- [2]: [`django-cotton`'s `README.md`](https://github.com/wrabit/django-cotton/blob/77feb610dd1cb7a4ad176300545ca3892cd926f2/README.md)
