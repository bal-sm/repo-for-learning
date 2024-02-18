# Search - WIP

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

## Use Cases - WIP

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

### Document-based search

...

#### PostgreSQL support

...
