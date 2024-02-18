# Database transactions

Taken from, [here](https://docs.djangoproject.com/en/5.0/topics/db/transactions/).

## TL;DR

- Pokoknya biasanya database itu, alurnya begini:
  1. Begin transaction
  2. Do some stuff
  3. Commit transaction
  - cuman kalo Django, factory setting nya gak gitu, tapi gini:
    - Each query is immediately committed to the database.

Makanya kalo enggak mau Django jalannya kayak gitu, pengen sesuai seperti database pada umumnya, maka ada kode-kode yang harus diterapin, nah adanya di page di official docs dong, [here](https://docs.djangoproject.com/en/5.0/topics/db/transactions/).

## Notes

Mine:
> Terlalu indie, this is really obscure thing to set, kecuali yang `transaction.atomic()`, makanya rangkumnya kapan-kapan aja, kalo misalnya butuh, langsung liat official docs nya.
