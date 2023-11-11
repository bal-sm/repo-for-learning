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
