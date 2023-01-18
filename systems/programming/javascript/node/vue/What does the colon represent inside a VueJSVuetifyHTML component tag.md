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

Example:
```html
<vue-select 
  class="vue-select1" 
  name="select1"
  :options="options1" 
  :model.sync="result1"
></vue-select>
```
What is the meaning the colon in front of :options and :model.sync here? I've searched all over the internet and can't find an answer anywhere.
