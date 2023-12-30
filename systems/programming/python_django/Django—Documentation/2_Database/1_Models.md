# Models

Mine:
> Taken from, [Models, from official docs](https://docs.djangoproject.com/en/5.0/topics/db/models/).

## ...

...

## Notes

Mine lagi:
> I really remember this section ih, di Pangandaran lagi. One of good and calm memories.

VERY IMPORTANT NOTE, FOR UPCOMING `Multi-table inheritance` section:
> DON'T EVER USE THIS, REALLY NOT WORTH IT, BETTER OFF USE REGULAR `OneToOneField`!!! WHY TF THESE STILL NOT DEPRECATED IN THE LATEST VERSION???

Mine, learning note:
> - Taken from [Retrieving objects](https://docs.djangoproject.com/en/5.0/topics/db/queries/#retrieving-objects):
>   - `Managers` -> `objects` -are-accessible-only-via-> _model classes_
>     - _(rather than from model instances)_, 
>     - to enforce a separation between:
>       - **“table-level” operations** _-> `objects` things_ and
>       - **“record-level” operations** _-> object / model instance things_.
> ---
> Maintenance note -> pindahin ke sini dan [`2_Making-queries.md`](2_Making-queries.md)
