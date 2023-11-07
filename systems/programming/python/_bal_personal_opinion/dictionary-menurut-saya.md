# Dictionary, menurut saya

Example, kayak gini kan? :

```python
SPORT_CHOICES = {  # Using a mapping instead of a list of 2-tuples.
    "Martial Arts": {"judo": "Judo", "karate": "Karate"},
    "Racket": {"badminton": "Badminton", "tennis": "Tennis"},
    "unknown": "Unknown",
}
```

> taken [from](https://docs.djangoproject.com/en/dev/releases/5.0/).

Nah coba kita pikir kayak gini:

1. Misal Kelas 1 sama Kelas 2 gening, kita bikin aja kayak `list`:

```python
murid_murid: list = [["Asep Koswari", "Lisna Surayati", "Yuli Nuranti Arifin", "Jejeng Jerengjeng", "Julian Magnus"],["Hidayat", "Rizky Rofiqi", "Wadi Sitompul", "Elisa Lailasari", "Kartika Melani"]]

# Ceritana ieu teh aya seleksi heula, da sakolana di antar 2 kota, jadi teu di desa-desa teuing.
# Nah meh administrasi engke jang reuni akbar na gampang, matakna di tes aptitude.
# Ieu jalma kota atawa desa.

# Si Yuli kesel.

# It's really not working out for Kelas 1 and Yuli Nuranti Arifin.
```

kan get the value nya gini ya:

```python
print(murid_murid[0][2])

# output: Yuli Nuranti Arifin

# Di Kota Bandung guys, ketika dia naik jabatan terus pindah ke Jakarta, mau ganti nama.

# Yuli Nur Anti, aja. ~~Soalna sabenerna Arifin teh sanes nama dinasti kitu.~~

# "Tong bebeja nya bu masalah ~~REDACTED~~."
```

2. Nah berarti sebenernya gini juga:

```python
from pprint import pprint

murid_murid: list = {
    0: {
        0: "Asep Koswari",
        1: "Lisna Surayati",
        2: "Yuli Nuranti Arifin",
        3: "Jejeng Jerengjeng",
        4: "Julian Magnus",
    },
    1: {
        0: "Hidayat",
        1: "Rizky Rofiqi",
        2: "Wadi Sitompul",
        3: "Elisa Lailasari",
        4: "Kartika Melani",
    },
}
```

Tuh tetep geura get the value nya gini:

```python
print(murid_murid[0][2])

# output: Yuli Nuranti Arifin

# acan, acan.
```
