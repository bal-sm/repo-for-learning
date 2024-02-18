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
*Bad*, harusnya pake `icontains`, cuman better dikit aja. Makanya next!

### A database’s more advanced comparison functions

...

### Document-based search

...

#### PostgreSQL support

...
