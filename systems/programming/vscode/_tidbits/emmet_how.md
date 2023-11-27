# Emmet - How to do this in Visual Studio Code

`1.`

```html
!
```

⬇️

`2.`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

</body>
</html>
```

⬇️

`3.`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <span></span> <!-- By just type `span` and enter -->
    <span></span> <!-- again -->
    <div></div> <!-- `div` and enter -->
    <a href=""></a> <!-- `a` and enter -->
    <button></button> <!-- `button` and enter -->
</body>
</html>
```

⬇️

`4.`

Restart.

⬇️

`5.`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <span class="purple"></span> <!-- By just type `span.purple` and enter -->
    <span id="id"></span> <!-- Type `span#id` and enter -->
    <div class="class-1 class-2" id="id"></div> <!-- `div.class-1.class-2#id` -->
    <div class="class"></div> <!-- `.class` and enter, it will assume that you want a pair `div` tags -->
    <div id="id"></div> <!-- `#id` -->
</body>
</html>
```

⬇️

`5.1.`

```html
<head>
...
<link rel="stylesheet" href=""> <!-- Type `link` and enter -->
</head>
```

⬇️

`6`

Restart.

⬇️

`7`

```html
...
<body>
    <button type="button"></button> <!-- `button[type="button"]` -->
    <div data-selected=""></div> <!-- `[data-selected]` -->
    <div data-selected="" class="active"></div> <!-- `[data-selected].active` -->
</body>
...
```

⬇️

`8.`

Restart.

⬇️

`9.`

`parent>child`

Example:
- `div.purple>span.cyan`

On `html`:

```html
...
<body>
    <div class="purple"><span class="cyan"></span></div>
</body>
...
```

Lanjutan:

```html
...
<body>
    <header>
        <nav>
            <ul></ul> <!-- header>nav>ul -->
        </nav>
    </header>
    <div ...>...</div>
</body>
...
```

> Abandon rustart restart tea.

⬇️

`10.`

`parent>child>morechild*n`

Example:
- `header>nav>ul>li*3`

On `html`:

```html
...
<body>
    <header>
        <nav>
            <ul>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </nav>
    </header>
</body>
...
```

⬇️

`11.`

`some_tag{add text inside the curly brackets}`

Example:

```html
...
<body>
    <header>
        <nav>
            <ul>
                <li>added text</li>
                <li>added text</li> <!-- `header>nav>ul>li*3{added text}` -->
                <li>added text</li>
            </ul>
        </nav>
    </header>
</body>
...
```

⬇️

`11.2`

`some_tag*n{List Item $}` <- `$` for label each entry

Jadinya:

```html
...
<body>
    <header>
        <nav>
            <ul>
                <li>List Item 1</li>
                <li>List Item 2</li> <!-- header>nav>ul>li*3{List Item $} -->
                <li>List Item 3</li>
            </ul>
        </nav>
    </header>
</body>
...
```

⬇️

`11.3`

> Kalau dua -> `$$`

```html
...
<body>
    <header>
        <nav>
            <ul>
                <li class="class-1">List Item 01</li>
                <li class="class-2">List Item 02</li> <!-- `header>nav>ul>li*3.class-${List Item $$}` -->
                <li class="class-3">List Item 03</li>
            </ul>
        </nav>
    </header>
</body>
...
```

⬇️

`12`

> Siblings.

`a+b+c`

Example:

```html
...
<body>
    <header></header>
    <main></main> <!-- `header+main+footer` -->
    <footer></footer>
</body>
...
```

⬇️

`12.1`

`^` = climb up

```html
...
<body> <!-- header>nav^main+footer -->
    <header>
        <nav></nav>
    </header>
    <main></main>
    <footer></footer>
</body>
...
```

⬇️

`12.2`

Better way tapi:

```html
...
<body> <!-- `(header>nav)+main+footer` -->
    <header>
        <nav></nav>
    </header>
    <main></main>
    <footer></footer>
</body>
...
```

⬇️

`13.`

```html
...
<body> <!-- (header>h2{Heading}+nav>ol>li*5>a{Link $})+main+footer -->
    <header>
        <h2>Heading</h2>
        <nav>
            <ol>
                <li><a href="">Link 1</a></li>
                <li><a href="">Link 2</a></li>
                <li><a href="">Link 3</a></li>
                <li><a href="">Link 4</a></li>
                <li><a href="">Link 5</a></li>
            </ol>
        </nav>
    </header>
    <main></main>
    <footer></footer>
</body>
...
```

⬇️

`14.`

> Make a form group.

```html
...
<body> <!-- `form:post>(.group>label+input:text)+(.group>label+input:number)` -->
    <form action="" method="post">
        <div class="group"><label for=""></label><input type="text" name="" id=""></div>
        <div class="group"><label for=""></label><input type="number" name="" id=""></div>
    </form>
</body>
...
```

⬇️

`15.`

> on `style` tag.

```html
...
<head>
    ...
    <style>
        .class {
            position: relative; /* cuman ketik `pos` */
            background-color: #fff; /* `bgc` */
            width: 10px; /* `w10` */
            height: 10px; /* `h10` */
        }
    </style>
</head>
...
```

## Notes

Learning note 1:
> will it help me write on large already made html?

Learning note 2:
> Ada auto complete buat jenis `form` sama `input`, pake `:` ajah.

Me on 2023-11-27, 17:02 PM:
> Nice VSCode, I love to tinker more engke.

Mine:
> Tapi sebenernya teh gini, Emmet itu suatu aplikasi, [read more](https://en.wikipedia.org/wiki/Emmet_(software)), tapi jadinya vscode plugin.
