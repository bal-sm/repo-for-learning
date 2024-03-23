# Search - Mahmuda's version

- A common task for web applications is to *search* *some* **data**
  - _(in the database with user input)_.
  - In a simple case, this could be
    - filtering a list of objects by a category. 
  - A more complex use case might require searching with
    - weighting, 
    - categorization, 
    - highlighting, 
    - multiple languages, 
    - and so on. 
  - This document explains some of the possible use cases and the tools you can use.

We’ll refer to the same models used in [Making queries](./2_queries.md#models-used-as-reference).

## Use Cases - Mahmuda's version

### Standard textual queries - Mahmuda's version

```python
>>> Author.objects.filter(name__contains="Terry")
[<Author: Terry Gilliam>, <Author: Terry Jones>]
```

Mine:
> *Bad* and *fragile*, harusnya pake `icontains`, cuman better dikit aja. Makanya next!

### A database’s more advanced comparison functions - Mahmuda's version

Mine:
> Mari pake `unaccent` untuk cari nama `Author` yang non-English.

```python
>>> Author.objects.filter(name__unaccent__icontains="Helen")
[<Author: Helen Mirren>, <Author: Helena Bonham Carter>, <Author: Hélène Joy>]
```

Mine:
> - masih BAD soalnya:
>   - `name__unaccent__icontains="Helen"`
>     - Helen ✔️
>     - Helena ✔️
>     - Hélène ✔️
>   - `name__unaccent__icontains="Hélène"`
>     - Helen ❌
>     - Helena ❌
>     - Hélène ✔️
>
> Makanya mari pake `trigram_similar` which compares sequences of letters cenah:

```python
>>> Author.objects.filter(name__unaccent__lower__trigram_similar="Hélène")
[<Author: Helen Mirren>, <Author: Hélène Joy>]
```

Mine:
> Nah masalahnya, entri:
> - "Helena Bonham Carter" ❌ (gak bakal muncul)

Them, soalnya cenah:
> Trigram searches consider all combinations of three letters, and compares how many appear in both search and source strings. For the longer name, there are more combinations that don’t appear in the source string, so it is no longer considered a close match.
>
> The correct choice of comparison functions here depends on your particular data set, for example the language(s) used and the type of text being searched. All of the examples we’ve seen are on short strings where the user is likely to enter something close (by varying definitions) to the source data.

Mine, kepikirannya nulis gini sekarang:
> Makanya skip aja ini, terus baca yang selanjutnya.

### Document-based search - Mahmuda's version - Light intro mod

Them, baca aja:
> Standard database operations stop being a useful approach when you start considering large blocks of text. Whereas the examples above can be thought of as operations on a string of characters, full text search looks at the actual words. Depending on the system used, it’s likely to use some of the following ideas:
>
> - Ignoring “stop words” such as “a”, “the”, “and”.
> - Stemming words, so that “pony” and “ponies” are considered similar.
> - Weighting words based on different criteria such as how frequently they appear in the text, or the importance of the fields, such as the title or keywords, that they appear in.
>
> There are many alternatives for using searching software, some of the most prominent are [Elastic](https://www.elastic.co/) and [Solr](https://solr.apache.org/). These are full document-based search solutions. To use them with data from Django models, you’ll need a layer which translates your data into a textual document, including back-references to the database ids. When a search using the engine returns a certain document, you can then look it up in the database. There are a variety of third-party libraries which are designed to help with this process.

#### PostgreSQL support - Mahmuda's version

Them, baca aja:
> PostgreSQL has its own full text search implementation built-in. While not as powerful as some other search engines, it has the advantage of being inside your database and so can easily be combined with other relational queries such as categorization.
>
> The [`django.contrib.postgres`](https://docs.djangoproject.com/en/5.0/ref/contrib/postgres/#module-django.contrib.postgres) module provides some helpers to make these queries. 

For example, a query might select all the blog entries which mention “cheese”:

```python
>>> Entry.objects.filter(body_text__search="cheese")
[<Entry: Cheese on Toast recipes>, <Entry: Pizza recipes>]
```

You can also filter on a combination of fields and on related models:

```python
>>> Entry.objects.annotate(
...     search=SearchVector("blog__tagline", "body_text"),
... ).filter(search="cheese")
[
    <Entry: Cheese on Toast recipes>,
    <Entry: Pizza Recipes>,
    <Entry: Dairy farming in Argentina>,
]
```

Them, delete kalo udah bawah:
> See the `contrib.postgres` [Full text search](...) document for complete details.

Mine, maintenance + learning note:
> Rangkumin [Full text search](https://docs.djangoproject.com/en/5.0/ref/contrib/postgres/search/), dan masukin di sini aja.
