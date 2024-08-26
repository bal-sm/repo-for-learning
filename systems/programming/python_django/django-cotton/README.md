# Django Cotton

## Intro from [2]

Bringing component-based design to Django templates.

- Docs site + demos: [1] tea.

## Intro from [1]

Goodbye `{% extends %}` `{% block %}` `{% include %}` `{% custom_tag %}`

Hello `<c-component />`

Bringing component-based design to django templates

### Before: Strongly Coupled, Verbose

#### `view.html`

```html
{% extends "product_layout.html" %}

{% block img_url %}
icon.png
{% endblock %}

{% block header %}
Item Title
{% endblock %}

{% block content %}
    Description of the product

    {% block price %}
    $10
    {% endblock %}
{% endblock %}
```

#### `product_layout.html`

```html
<div id="container">
    <div id="header">
        <img src="{% block img_url %}{% endblock %}" />
        <h1>
            {% block title %}
            {% endblock %}
        </h1>
    </div>

    <div id="content">
        {% block content %}

            <div id="price">
                {% block price %}
                {% endblock %}
            </div>

        {% endblock %}
    </div>
</div>
```

### After: Decoupled, Clean & Re-usable

#### `view.html`

```html
<c-product img_url="icon.png"
    title="Item Title"
    price="$10">
    Description of the product
</c-product>
```

#### `product.html`

```html
<div id="container">
    <div id="header">
        <img src="{{ img_url }}" />
        <h1>{{ title }}</h1>
    </div>

    <div id="content">
        {{ slot }}

        {% if price %}
            <div id="price">
                {{ price }}
            </div>
        {% endif %}
    </div>
</div>
```

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

## Why cotton?, from [1]

- Rapid UI composition
  - Efficiently compose and reuse UI components.
  - Adopting a modular design system
    - streamlines workflow and boosts productivity.
- Harmonious with Tailwind CSS
  - Tailwind's utility-first approach
    - compliments component based design
      - isolating style in re-usable components,
        - enhancing maintainability
- Interoperable with Django Templates
  - Cotton enhances Django templates
    - without replacing them,
    - allowing progressive enhancement
      - while maintaining
        - full use of existing template features.
- Enhanced Productivity
  - Cotton's HTML tag-like syntax
    - allows code editors
      - > `vscode`.
      - to recognize its components as
        - HTML elements, enabling features like:
          - syntax highlighting
          - and automatic tag completion.
- Minimal Overhead
  - Cotton compiles
    - to native django components
    - and the compilation step is
      - automatically cached
      - and dynamically managed.
        - > by its `Loader`, `django_cotton.cotton_loader.Loader`.

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

## Quickstart, from [1]

### Install `cotton`

Run the following command:

```sh
pip install django-cotton
```

Then update your `settings.py`:

#### Automatic configuration

_Skipped aja, be technical, guys._

#### Customised configuration

Mine:
> screw the bolts, merek Em. make it a thing. a real and really exist in physical dimension, program thing.

- If your project requires
  - any non-default loaders
  - or you do not wish Cotton
    - to manage your settings,
  - you should instead
    - provide `django_cotton.apps.SimpleAppConfig`
      - in your `INSTALLED_APPS`:

`settings.py`:

```python
INSTALLED_APPS = [
    'django_cotton.apps.SimpleAppConfig',
]

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        ...
        "OPTIONS": {
            "loaders": [(
                "django.template.loaders.cached.Loader",
                [
                    "django_cotton.cotton_loader.Loader",
                    "django.template.loaders.filesystem.Loader",
                    "django.template.loaders.app_directories.Loader",
                ],
            )],
            "builtins": [
                "django_cotton.templatetags.cotton"
            ],
        }
    }
]
```

### Create a component

- Create a new directory
  - in your templates directory
    - called `cotton`.
  - Inside this directory
    - create a new file
      - called `card.html`
        - with the following content:

`templates/cotton/card.html`:

```html
<div class="bg-white shadow rounded border p-4">
    <h2>{{ title }}</h2>
    <p>{{ slot }}</p>
    <button href="{% url url %}">Read more</button>
</div>
```

### Include a component

#### `views.py`

```python
def dashboard_view(request):
    return render(request, "dashboard.html")
```

#### `templates/dashboard.html`

```html
<c-card title="Trees" url="trees">
    We have the best trees
</c-card>

<c-card title="Spades" url="spades">
    The best spades in the land
</c-card>
```

### Usage

#### Basics

- Cotton components should be placed in the `templates/cotton` folder

#### Naming

Cotton uses the following naming conventions:

- Component file names
  - are in `snake_case`:
    - `my_component.html`
- but are called
  - using `kebab-case`:
    - `<c-my-component />`

#### Subfolders

- Components in subfolders
  - can be defined
    - using dot notation
  - A component in
    - `sidebar/menu/link.html`
    - would be included as `<c-sidebar.menu.link />`

#### Tag Style

- Components can either:
  - be self-closing
    - `<c-my-component />`
  - or have a closing tag
    - `<c-my-component></c-my-component>`

## Walkthrough

### Components Intro, from [1], dupe makanya

- Components are
  - reusable pieces
    - of view template.
      - > me: `html`s, you know it.
  - They can contain
    - native Django template syntax
      - and can be used
        - inside standard Django templates.

Mine, just a reminder for myself:
> I NEED TO FUCKING DO IT. ieu heula. IDK. IH.

#### A minimal example

##### `cotton/my_component.html`

```html
{{ slot }}
```

##### `my_view.html`

```html
<c-my-component>
    <p>Some content</p>
</c-my-component>
```

##### Penjelasan

- The `{{ slot }}` variable
  - will contain
    - all of the content provided
      - between
        - the opening,
          - > `<c-my-component>`
        - and closing tag;
          - > `</c-my-component>`
        - of the current component
          - as defined in the parent.
            - > `<p>Some content</p>`
            - > me: asa rancu kalimat-nya.

### Your first component, from [2]

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

### Add attributes, from [2]

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

### Attributes, from [1]

- Components
  - are highly configurable.
  - One way to control
    - the content,
    - and behaviour;
    - of a component is
      - through attributes.

#### `cotton/weather.html`

```html
<p>It's {{ temperature }}<sup>{{ unit }}</sup> and the condition is {{ condition }}.</p>
```

#### `my_view.html`

```html
<c-weather temperature="23" unit="c" condition="windy"></c-weather>
```

### Named slots, from [2]

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

### Named slots, from [1]

- There are occasions
  - when you will need
    - to pass blocks of HTML
      - > customized. misalnya: `<input>` to `c-form`.
    - or dynamic content.
      - > ~~weather thing. di bawah.~~ mungkin lebih `htmx` attributes / 'Alpine.js' thing kali ya.
    - In these cases,
      - we can reach to _named slots_.

- Named slots
  - are *defined*
    - **with** the `<c-slot name="...">...</c-slot>` tag.
  - The content
    - is passed to the component
      - like a standard template variable.
  - > my opinion: `name` as a `c-slot` attributes? weird. We thought that it could go wrong, karena custom 'html' thing. Padahal mah tapi enggak, soalnya the `name` of `c-slot` tea, moal ever send to the browser.. Server thing only.

- They allow you to define
  - mixed markup,
  - 'HTML',
  - and Django native tags;
  - and the rendered block
    - will be provided
      - as a template variable
        - > regular `{{ custom_variable }}`
        - to the child component.
          - > rancu.

- Adopting the nested HTML approach here
  - keeps readability and integrates well
    - with how editors already treat
      - html-like tags
      - and patterns.

- After writing
  - a couple of components
    - like this,
      - `<c-thing some="thing" />`
    - you will notice the fluidity of this approach.

#### `cotton/weather_card.html`

```html
<div class="flex ...">
    <h2>{{ day }}:</h2> {{ icon }} {{ label }}
</div>
```

#### `view.html`

```html
<c-weather-card day="Tuesday">
    <c-slot name="icon">
        <svg>...</svg>
    </c-slot>

    <c-slot name="label">
        <h2 class="text-yellow-500">Sunny</h2>
    </c-slot>
</c-weather-card>
```

### Pass template variable as an attribute, from [2]

- To pass a template variable:
  - you prepend the attribute name
    - with a colon `:`.
      - > `:user="user"`
        - > or should I write like this:
          - > `:user-object-to-component="user_object_from_context"`
  - Consider a bio card component:

```html
<!-- in view -->
<c-bio-card :user-object-to-component="user_object_from_context" />
```

That has a component definition like:

```html
<!-- cotton/bio_card.html -->
<div class="...">
  <img src="{{ user-object-to-component.avatar }}" alt="...">
  {{ user-object-to-component.username }} {{ user-object-to-component.country_code }}
</div>
```

Mine, learning, maintenance:
> cobain dulu, kalo salah, ubah dong. terus emang bisa pake `-`?

### Passing template variables by reference, from [1]

- Sometimes you'll want to pass a variable
  - from the parent's `context`
    - 'as is'
      - for the child component
        - to perform what it wants.

To pass data by reference, prepend the attribute with a ` : `.

#### `view.html`

```html
<c-weather :today="today"></c-weather>
```

#### `cotton/weather.html`

```html
<p>It's {{ today.temperature }}<sup>{{ today.unit }}</sup> and the condition is {{ today.condition }}.</p>
```

### Template expressions inside attributes, from [2]

You can use template expression statements inside attributes.

```html
<c-weather icon="fa-{{ icon }}"
           unit="{{ unit|default:'c' }}"
           condition="very {% get_intensity %}"
/>
```

Mine:
> wow, valentine's day on the books.

### Boolean attributes, from [2]

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

### Passing Python data types, from [2]

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

### Increase Re-usability with `{{ attrs }}`, from [2]

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

### In-component Variables with `<c-vars>`, from [2]

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

#### 1. Using `<c-vars>` for default attributes, from [2]

- In this example
  - we have a button component
    - with a default `theme`
    - but it can be overridden.

```html
<!-- cotton/button.html -->
<c-vars theme="bg-purple-500" />

<a href="..." class="{{ theme }}">
    {{ slot }}
</a>
```

---

```html
<!-- in view -->
<c-button>I'm a purple button</c-button>
```

```html
<!-- html output -->
<a href="..." class="bg-purple-500">
    I'm a purple button
</a>
```

---

Now we have a default theme for our button, but it is overridable:

```html
<!-- in view -->
<c-button theme="bg-green-500">But I'm green</c-button>
```

```html
<!-- html output -->
<a href="..." class="bg-green-500">
    But I'm green
</a>
```

#### 2. Using `<c-vars>` to govern `{{ attrs }}`, from [2]

- Using `{{ attrs }}`
  - to pass all attributes
    - from parent scope
      - onto an element in the component,
  - you'll sometimes want
    - to provide additional properties
      - to the component
      - which are not intended to be an attributes.
  - In this case
    - you can declare them in `<c-vars />`
      - and it will prevent it from being in `{{ attrs }}`

---

- Take this example
  - where we want to provide any number of attributes
    - to an input
      - > to `{{ attrs }}`
    - but also an `icon` setting
      - which is not intened
        - to be an attribute on `<input>`:

```html
<!-- cotton/input.html -->
<c-vars icon />

<img src="icons/{{ icon }}.png" />

<input {{ attrs }} />
```

```html
<!-- in view -->
<c-input type="password" id="password" icon="padlock" />
```

Input will have all attributes provided apart from the `icon`:

```html
<img src="icons/padlock.png" />

<input type="password" id="password" />
```

### An example with `htmx` from [2]

- Cotton helps carve out re-usable components,
  - here we show
    - how to make a re-usable form,
      - reducing code repetition
      - and improving maintainability:

```html
<!-- cotton/form.html -->
<div id="result" class="..."></div>

<form {{ attrs }} hx-target="#result" hx-swap="outerHTML">
    {{ slot }}
    <button type="submit">Submit</button>
</form>
```

```html
<!-- in view -->
<c-form hx-post="/contact">
    <input type="text" name="name" placeholder="Name" />
    <input type="text" name="email" placeholder="Email" />
    <input type="checkbox" name="signup" />
</c-form>

<c-form hx-post="/buy">
    <input type="text" name="type" />
    <input type="text" name="quantity" />
</c-form>
```

Mine:
> wow. valentine's day on the books. gitu kan ya?

## Limitations in Django that Cotton overcomes, from [2]

- Whilst
  - you _can_ build frontends
    - with Django’s native tags,
  - there are
    - a few things
      - that hold us back
        - when we want to apply modern practices:

### `{% block %}` and `{% extends %}`

- This system strongly couples
  - child
  - and parent templates;
  - making it hard
    - to create a truly re-usable component
      - that can be used in places
        - without it having a related base template.

Mine:
> oh my fuckin' god. terus teh menciptakan kebiasaan untuk terus "refactor your base templates and ofc your child templates".

### What about `{% include %}` ?

- Modern libraries allow components
  - to be highly configurable,
    - whether
      - it’s by attributes,
      - passing variables,
      - passing HTML with
        - default
        - and named slots.
  - `{% include %}` tags,
    - whilst they have the ability
      - to pass simple variables
        - 'with context_on_template=context_variable'
      - and text,
        - 'with some_string="begini"'
    - they will not allow you
      - to easily send HTML blocks
        - with template expressions;
        - let alone other niceties
          - such as
            - boolean attributes,
            - named slots
            - etc.

Mine:
> sometimes makes me feel wrong lagi pake `{% include %}` daripada pake 'extends' and 'block' tea.

### What's with `{% with %}`?

- Whilst `{% with %}` tags
  - allow us
    - to provide
      - variables
      - and strings
      - it quickly:
        - busies up your code
        - and has the same limitations
          - about passing more complex types.

### Custom `{% templatetags %}`

- Cotton does essentially
  - compile down to 'templatetags'
  - but there is some extra work
    - it performs above it
      - to help with scoping,
      - and auto-managing keys;
      - which will be difficult
        - to manage manually
          - in complex nested structures.
            - > me: ari ieu kumaha ya udah we.

Them, a note, interesting:
> <a href="https://medium.com/@willabbott/introducing-django-cotton-revolutionizing-ui-composition-in-django-ea7fe06156b0" target="_blank">[Source article]</a>

## Native Django template tags vs Cotton

- In addition,
  - Cotton enables you
    - to navigate around some of the limitations
      - with Django's
        - native tags,
        - and template language:

### HTML in attributes

❌ **Django native:**

```html
{% my_component header="<h1>Header</h1>" %}
```

✅ **Cotton:**

```html
<c-my-component>
    <c-slot name="header">
        <h1>Header</h1>
    </c-slot>
</c-my-component>
```

### Template expressions in attributes

❌ **Django native:**

```html
{% my_component model="todos.{{ index }}.name" extra="{% get_extra %}" %}
```

✅ **Cotton:**

```html
<c-my-component model="todos.{{ index }}.name" extra="{% get_extra %} />
```

### Pass simple python types

❌ **Django native:**

```html
{% my_component default_options="['yes', 'no', 'maybe']" %}
{% my_component config="{'open': True}" %}
```

✅ **Cotton:**

```html
<c-my-component :default_options="['yes', 'no', 'maybe']" />
<c-my-component :config="{'open': True}" />
```

### Multi-line definitions

❌ **Django native:**

```html
{% my_component
    arg=1 %}
```

✅ **Cotton:**

```html
<c-my-component
    class="blue"
    x-data="{
        something: 1
    }" />
```

## Caching

- Cotton is optimal
  - when used with Django's `cached.Loader`.
  - If you use <a href="https://django-cotton.com/docs/quickstart">automatic configuration</a>
    - then the cached loader
      - will be automatically applied.
    - This feature has room for improvement, some desirables are:

- Integration with a cache backend
  - to survive runtime restarts / deployments.
- Cache warming

- For full docs and demos,
  - checkout <a href="https://django-cotton.com" target="_blank">django-cotton.com</a>

## ...

...

## Notes

Mine:
> Masih ada perbedaan antara docs di dua source tersebut, makanya diginiin aja dulu, [1] and [2].

## Source(s)

- [1]: [Django Cotton Official Documentation](https://django-cotton.com/)
- [2]: [`django-cotton`'s `README.md`](https://github.com/wrabit/django-cotton/blob/123191cb225c8c1b8b1aee64319fa72c440a416d/README.md)
  - > version `0.9.30`.
