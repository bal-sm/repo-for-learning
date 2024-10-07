# Tailwind CSS

## Getting Started

### Installation

_Skipped_

### Editor Setup

_Skipped_

### Using with Preprocessors

_Skipped_

Mine:
> JavaScript thing.

### Optimizing for Production

_Skipped_

Mine:
> I use `django-tailwind`.

### Browser Support

_Skipped_

### Upgrade Guide

_Skipped_

## Core Concepts

### Utility-First Fundamentals

Them, headline:
> Building complex components from a constrained set of primitive utilities.

Before Tailwind:

```html
<div class="chat-notification">
  <div class="chat-notification-logo-wrapper">
    <img class="chat-notification-logo" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div class="chat-notification-content">
    <h4 class="chat-notification-title">ChitChat</h4>
    <p class="chat-notification-message">You have a new message!</p>
  </div>
</div>

<style>
  .chat-notification {
    display: flex;
    align-items: center;
    max-width: 24rem;
    margin: 0 auto;
    padding: 1.5rem;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  .chat-notification-logo-wrapper {
    flex-shrink: 0;
  }
  .chat-notification-logo {
    height: 3rem;
    width: 3rem;
  }
  .chat-notification-content {
    margin-left: 1.5rem;
  }
  .chat-notification-title {
    color: #1a202c;
    font-size: 1.25rem;
    line-height: 1.25;
  }
  .chat-notification-message {
    color: #718096;
    font-size: 1rem;
    line-height: 1.5;
  }
</style>
```

After Tailwind:

```html
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
  <div class="shrink-0">
    <img class="size-12" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-slate-500">You have a new message!</p>
  </div>
</div>
```

In the example above, we've used:

- Tailwind's
  - [flexbox](/docs/display#flex)
  - and [padding](/docs/padding) utilities
  - > (`flex`,
    - > biar flex ke kanan ke kiri secara block-level, learning note.
  - > `shrink-0`, and
    - > Them: use `shrink-0` to prevent a flex item from shrinking.
  - > `p-6`);
    - > Padding = Creates space within an element.
  - to control the overall card layout
- The
  - [max-width](/docs/max-width)
  - and [margin](/docs/margin) utilities
  - > (`max-w-sm` and
    - > lebar.
  - > `mx-auto`);
    - > Margin = Creates space around an element.
  - to constrain the card width and center it horizontally
- The
  - [background color](/docs/background-color),
  - [border radius](/docs/border-radius),
  - and [box-shadow](/docs/box-shadow) utilities
  - (`bg-white`, `rounded-xl`, and `shadow-lg`) to style the card's appearance
- The [size](/docs/size) utilities (`size-12`) to set the width and height of the logo image
- The [space-between](/docs/space) utilities (`space-x-4`) to handle the spacing between the logo and the text
- The [font size](/docs/font-size), [text color](/docs/text-color), and [font-weight](/docs/font-weight) utilities (`text-xl`, `text-black`, `font-medium`, etc.) to style the card text

...
