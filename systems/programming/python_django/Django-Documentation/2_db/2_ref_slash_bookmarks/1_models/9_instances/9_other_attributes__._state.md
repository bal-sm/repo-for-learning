# Other attributes

Taken from <https://docs.djangoproject.com/en/5.0/ref/models/instances/#django.db.models.Model._state>

## `_state`

`Model._state`

The `_state` attribute refers to a `ModelState` object that *tracks* **the lifecycle** of the model instance.

- The `ModelState` object has two attributes: 
  - `adding`, 
    - a flag which is `True` if the model has **not** **been saved** *to the database* _yet_, and 
  - `db`, 
    - a **string** referring *to the database* (alias) *the instance was loaded from or saved to*.

- **Newly** instantiated instances have:
  - `adding=True` and `db=None`, 
    - since they are yet to be saved. 
- Instances **fetched** from a QuerySet will have:
  - `adding=False` and `db` _set to the *alias* of the *associated* database_.
