# 5 Modern Features That Make CSS Easy

> A random thing that I watched this afternoon. Let's summarize!-

## 1. CSS Nesting

Mine:
> Let's get it done already.

Mine:
> Ngeunaheun ih free style commit which sebenernya satuin aja jadi satu commit/commit aja sekali langsung ke `develop` (sick).

Tuh dari gini (no nesting):

```css
form {
    display: flex;
}

form.disabled {
    display: none;
}

form label {
    font-size: 13px;
}

form label input {
    margin-top: 5px;
}
```

Jadi gini (with nesting):

```css
form {
    display: flex;

    &.disabled {
        display: none
    }

    label {
        font-size: 13px;
        
        input {
            margin-top: 5px;
        }
    }
}
```

Mine:
> nice.

my complain:
> masukin ya sayanggg, masalah ih css gitu ya, nanti- ya udah.

## 2. Custom properties / CSS Variables

```css
:root {
    --primary-color: #F19ED2;
    --secondary-color: #91DDCF;
    --font-size: 16px;
    --spacing: 24px;
    --border-radius: 8px;
}
```

Mine:
> inget gak sih aing overthink mikirin euleuh siah nulis ulang dari suatu video soalnya not copyable / easily findable source-nya, ke `rfl`, terus teh "omG this is wasting time", not really da sebenernya, there are many other factors to that productive quality (sic, "anying").

```css
/* lanjutan atas.. */

button {
    background-color: var(--primary-color);
    color: #fff;
    font-size: var(--font-size); /* tambahan */
    padding: calc(var(--spacing) / 2);
    border-radius: var(--border-radius);
}
```

## 3. Container Queries

```css
.container {
    container-type: inline-size;
}

.box {
    background-color: #FFF;
    text-align: center;
    transition: all 0.3s easel
}

@container (min-width: 500px) {
    .box {
        background-color: #000;
        color: white;
        font-size: 1.5rem;
    }
}
```

Mine:
> oh ngerti, sebenernya bukan `@container` nyambung sama `.container` (in a way, gening), `.container` is a convention (built-in class on css, bisa diubah, meureun nanti baca lagi we docs-nya.), `@container` juga (built-in "method" (kayak di Python) of css).

Mine:
> lepas itu, terus gini..

Mine:
> Sebenernya dulu ada `@media`..

```css
.box {
    flex: 1 1 100%;
}

@media (min-width: 600px) {
    .box {
        flex: 1 1 45%;
    }
}

@media (min-width: 992px) {
    .box {
        flex: 1 1 30%
    }
}
```

Mine, opinion:
> Ih apa itu teh persen persen gitu, ngeri. ~~Just another thing that really makes design coding is apa ya, clunky, bisalah, jadi harus reload terus, to get what design that you want. Persen loh ini teh.~~ Ada framework guys.

## 4. `has()` and `is()`, pseudo-classes
 
```css
form:has(input:disabled) {
    background: red;
    cursor: not-allowed;
}
```

Mine:
> tuh jadi kalo `input`-nya `disabled` (pada saat itu) di `form` class-nya.. properties-nya kayak gitu.

```css
:is(section, article, aside) :is(h1, h2, h3) {
    color: blue;
}

/* equivalent of: */
section h1, section h2, section h3,
article h1, article h2, article h3,
aside h1, aside h2, aside h3 {
    color: #blue;
}
```

## 5. CSS Grid / Grid Layout

v1 (level 1) cenah:

```css
.container {
    display: grid;
    grid-template-areas:
        'header header'
        'sidebar main'
        'footer footer';
    grid-template-columns: 1fr 3fr;
    grid-template-rows: auto 1fr auto;
}

.header {
    grid-area: header;
}

.sidebar {
    grid-area: sidebar;
}

.main {
    grid-area: main;
}

.footer {
    grid-area: footer;
}
```

v2 (level 2):

```css
.grid {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    grid-template-rows: repeat(4, minmax(100px, auto));
}

.item {
    display: grid;
    grid-column: 2 / 7;
    grid-row: 2 / 4;
    grid-template-columns: subgrid;
    grid-template-rows: repeat(3, 80px);
}

.subitem {
    grid-column: 3 / 6;
    grid-row: 1 / 3;
}
```

Mine:
> yang ini, enggak! soalnya simple number.

Mine:
> Beres deh!
