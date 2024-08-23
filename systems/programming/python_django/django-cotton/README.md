# Django Cotton

## Intro from [2]

Bringing component-based design to Django templates.

- Docs site + demos: [1] tea.

## Why Cotton? from [2]

- Cotton aims to overcome [certain limitations](#limitations-in-django-that-cotton-overcomes-from-2)
  - that exist in the django template system
    - > `{% include %}`
    - that hold us back when we want to apply modern practises
      - > `{{ name }}` to `{% include %}`, ~~how, gitu we lah~~.
        - > eh sebenernya bisa gini, `{% include option.template_name with widget=option %}`, oops, salah paham. hehe. tapi tetep aja ribet jadinya.
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

### Named slots

- Named slots
  - are a powerful concept.
  - They allow us to provide HTML
    - to appear in one or more areas
      - in the component.
  - Here we allow the button to optionally display an `svg` icon:

```html
<!-- cotton/button.html -->
<a href="{{ url }}" class="...">
    {{ slot }}

    {% if icon %}
        {{ icon }}
    {% endif %}
</a>
```

```html
<!-- in view -->
<c-button url="/contact">
    Contact
    <c-slot name="icon">
        <svg>...</svg>
    </c-slot>
</c-button>
```

Named slots can also contain any django native template logic:

```html
<!-- in view -->
<c-button url="/contact">
    <c-slot name="icon">
      {% if mode == 'edit' %}
          <svg id="pencil">...</svg>
      {% else %}
          <svg id="disk">...</svg>
      {% endif %}
    </c-slot>
</c-button>
```

Mine:
> `mode`-nya berarti gini aja ya:

```python
context = {
    "mode": "edit",
}
```

### Pass template variable as an attribute

- To pass a template variable:
  - you prepend the attribute name
    - with a colon `:`.
      - > `:user="user"`
  - Consider a bio card component:

```html
<!-- in view -->
<c-bio-card :user="user" />
```

That has a component definition like:

```html
<!-- cotton/bio_card.html -->
<div class="...">
  <img src="{{ user.avatar }}" alt="...">
  {{ user.username }} {{ user.country_code }}
</div>
```

### Template expressions inside attributes

You can use template expression statements inside attributes.

```html
<c-weather icon="fa-{{ icon }}"
           unit="{{ unit|default:'c' }}"
           condition="very {% get_intensity %}"
/>
```

Mine:
> wow, valentine's day on the books.

### Boolean attributes

- Boolean attributes reduce boilerplate
  - when we just want to indicate
    - a certain attribute should be
      - `True`
      - or not (`False`).

```html
<!-- in view -->
<c-button url="/contact" external>Contact</c-button>
```

- By passing just the attribute name
  - without a value,
  - it will automatically be provided to the component
    - as `True`
      - > just like Python.

```html
<!-- cotton/button.html -->
<a href="{{ url }}" {% if external %} target="_blank" {% endif %} class="...">
    {{ slot }}
</a>
```

### Passing Python data types

- Using the `:`
  - to prefix an attribute
    - tells Cotton we're passing a dynamic type down.
  - We already know we can use this
    - to send a variable,
    - **but** you can also send basic python types, namely:

- Integers and Floats
- `None`, `True` and `False`
- Lists
- Dictionaries

- This benefits a number of use-cases,
  - for example if you have a select component
    - that you want to provide the possible options from the parent:

```html
<!-- cotton/select.html -->
<select {{ attrs }}>
    {% for option in options %}
        <option value="{{ option }}">{{ option }}</option>
    {% endfor %}
</select>
```

```html
<c-select name="q1" :options="['yes', 'no', 'maybe']" />
```

Mine, simplified aja:
> atau, kasih objects dari Django's `Form` aja.. Pokoknya liat, part [ini](https://docs.djangoproject.com/en/5.1/ref/forms/widgets/#select), that's all I need looking for (sic), ubek-ubek guys.

```html
<!-- source code output -->
<select name="q1">
    <option value="yes">yes</option>
    <option value="no">no</option>
    <option value="maybe">maybe</option>
</select>
```

### Increase Re-usability with `{{ attrs }}`

- `{{ attrs }}` is a special variable
  - that contains
    - all the attributes passed to the component
      - in an `key="value"` format.
  - This is useful
    - when you want to pass all attributes
      - to a child element
      - without having to explicitly define them
        - in the component template.
  - For example, you have inputs that can have any number of attributes defined:

```html
<!-- cotton/input.html -->
<input type="text" class="..." {{ attrs }} />
```

```html
<!-- example usage -->
<c-input placeholder="Enter your name" />
<c-input name="country" id="country" value="Japan" required />
```

```html
<!-- html output -->
<input type="text" class="..." placeholder="Enter your name" />
<input type="text" class="..." name="country" id="country" value="Japan" required />
```

### In-component Variables with `<c-vars>`

- Django templates
  - adhere quite strictly to the 'MVC' model
  - and does not permit a lot of data manipulation
    - in views.
  - Fair enough,
    - **but** what if we want
      - to handle data
        - for the purpose of UI state only?
    - Having presentation related variables
      - > me: unable to specify default variable (I just want some buttons colored red, but everything else blue) without some complicated code in `views.py` which contains the component in the template.
      - defined in the *back*
        - > `views.py`
        - is overkill
      - and can quickly lead
        - to higher maintenance cost
        - and loses encapsulation of the component.
  - Cotton allows you define in-component variables
    - for the following reasons:

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
