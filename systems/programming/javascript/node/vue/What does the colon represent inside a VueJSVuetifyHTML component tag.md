Source(s):https://stackoverflow.com/questions/51541835/what-does-the-colon-represent-inside-a-vuejs-vuetify-html-component-tag

ThatOneGuy:
I am using Vuetify, so this could be either a VueJS, Vuetify or even HTML question, but my component looks like this : 
```html
<v-list-tile 
  v-for="item in menuItem.items" 
  :key="item.type" 
  :style="`background: ${item.colour}`" 
  :html="item.type">
</v-list-tile>
```
Take the :key for example, what does the colon (:) before the word key mean? And where can I find what values I can use ?

Answer:
Possible duplicate of [What does it mean when an html attribute is prefixed with a colon?](https://stackoverflow.com/questions/51541835/what-does-the-colon-represent-inside-a-vuejs-vuetify-html-component-tag) – 
thanksd

What does it mean when an html attribute is prefixed with a colon?
In a Vue template, a colon : prefixing an html attribute is shorthand for v-bind.
