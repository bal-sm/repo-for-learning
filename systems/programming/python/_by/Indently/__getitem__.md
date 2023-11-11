# `__getitem__` method

Mine:
> Thanks to Indently for the [video](https://youtu.be/XWhyAtB6RuU?si=5Gr08wDHxR9DeCh0)!

## Content

```python
class Book:
    def __init__(self, content):
        self.content = content

    def __getitem__(self, index):
        try:
            page = self.content[index]
        except IndexError:
            page = "404. Page not found."

        return page


book = Book(["Eggs", "Spam", "Ham"])
print("book[2] = " + book[2])

# output: book[2] = Ham

print("book[3] = " + book[3])  # at least, we're trying, high hope, high as hope.

# output: book[3] = 404. Page not found.
```

## Notes

Learning note:
> - Perbedaan dan maksud dari `self.content` dan `content` adalah sebagai berikut:
>   - `self.content`
>     - merupakan variabel yang dibentuk melalui `__init__`,
>       - _(lihat contoh di atas)_
>       - sehingga merupakan "komponen" suatu `class` itu sendiri,
>         - _(dalam hal ini `Book` class.)_
>   - sedangkan `content`
>     - merupakan parameter pada `__init__` method
>       - yang menerima argument pada _instantiation of_ `Book` class,
>         - > bikin lebih general, TODO.
>       - yang akhirnya apabila dibentuk _new instance_ of `Book` class, tidak lupa dengan `content` argument-nya
>         - maka, akan terdapat value saat memanggil `book.content`.
