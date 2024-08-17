# 🌟 Replacing React with htmx: A Modern UI Experiment 💻

Mine:
> this is a really bad written tidbit, really needs an overhaul, tapi aku commit anyway soalnya lebar pake `www.turbolearn.ai`

## Breaking Misbeliefs about Front-end Development

> "For a rich UX on the web, you need to go the React way... probably not."

Rich UX on the web is about making users forget they're looking at a web browser. This involves:

- Making the user interface respond to changes in application state without reloading the full page
- Having beautiful, smooth, reliable, and accessible UI elements, like those on mobile devices

## htmx: An Alternative to JavaScript Application Frameworks

- htmxAjax: listens to JavaScript events, fires AJAX calls, gets HTML fragments, and inserts them into the DOM. That's it!
- Web Components: isolated, reusable components consisting of HTML, CSS, and JavaScript code, working together to create beautiful UI elements.
  - In the context of Django, web components can be achieved on the server-side using a library that allows web components within Django templating.

## 📊 Demo Time!

### UI Features

- Navigation timeline with beautiful animation and smooth reloading
- Text rendering with quick rendering and splitting into articles
- Marking articles as favorites without client-side application state management
- Filtering and searching list of items related to the text
- Sophisticated application state management without client-side JavaScript code

#### Feature 1: Filter and Counter

Use case: updating the counter when an article is marked as favorite/unfavorite

| HTML Template	| HTTP Response |
| --- | --- |
| Empty div with htmx attributes | Post method with HTTP header understood by htmx client-side |
| ظف | _counter updated without client-side code |

Mine:
> what.

#### Feature 2: Rich UI Elements

Use case: custom dropdown facet filter

- Component
  - Description

- Faceit Template
  - Regular Django template taking input values
- Faceit CSS
  - Styles for the UI element
- Faceit JavaScript
  - Handles internal search and user interaction
- Jungle Component
  - Brings together template, CSS, and JavaScript

Jungle Components allow for:
- Declaring components that bring together template, CSS, and JavaScript
- Passing data into components
- Achieving reusable, isolated, and testable web components on the server-side

### What's Next?

Stay tuned for more on our experience with replacing React with htmx at Context! 🤔## The Evolution of a Project 🚀

In 2017, a project was started with a small team on the front-end side. The team was advised to go the React way, building an API, binding a Single-Page Application (SPA), and achieving client-side application state management.

### The Initial Approach

- Separation of concerns between backend and frontend
- Web components
- Modern way to go

However, the UI was very slow due to:

- Non-optimal API contract
- Deep DOM tree
- Low team velocity
- No code quality on the frontend side

## The Turning Point

When hearing about Phoenix Live View in the Elixir world, Hotwired in the Ruby world, and htmx, a proof of concept was created. The UI was duplicated with rendered Django templates and a bit of htmx in one month of work. The code was ugly, but the proof was there, and it was working.

### The Benefits of htmx

- Good performances
- Code quality
- Tests
- No negative consequences on UX
- Opening new possibilities and opportunities

### Comparison with React

| Scenario | React | htmx |
| Time to Interactive (first load) | Slow | Fast |
| Time to Interactive (second load) | Fast | Fast |
| Memory usage on client side | High | Low|

## The Impact on the Team

- The JavaScript developer left due to no longer being needed
- The team members were able to become full-stack developers
- Collaboration with designers was enabled
- New project management methods were explored

### The Code Base

> "We deleted 15,000 lines of code" 💻

## The Decision to Use htmx

When deciding whether to use htmx, consider the following:

- Do you need product agility?
- What is front-end development to you?
- Do you want a separated code base or a full-stack approach?

### Key Takeaways

- htmx works on a real project, a real product
- For a small team like us on a B2B SaaS product, it makes us very happy
- With htmx and Jungle components, you can make your own choice about what architecture to implement for your frontend

## Sources

- [DjangoCon 2022 | From React to htmx on a real-world SaaS product: we did it, and it's awesome!](https://www.youtube.com/watch?v=3GObi93tjZI)

## Notes

Mine:
> I wouldn't surprise kalo misalnya karena free.

Mine:
> - Udah we pokoknya dia pake Bootstrap + htmx + no client sided scripting (??) + django-components + django
>   - they really use Bootstrap for such customized UI.. weird.
>     - bener gak sih?

Mine:
> sayanggg.
