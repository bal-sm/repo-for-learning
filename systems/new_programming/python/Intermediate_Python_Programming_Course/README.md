# Intermediate Python Programming Course

> This is another my personal learning

Important note:
> Bikin cheatsheet dari sini, sama dari `Python_Coba_coba_Code`, PAKE
> **JUPYTER NOTEBOOK**

## new things I learned in `lists`

Is apple on the list?

```python
mylist = ["banana", "orange", "pineapple"]

if "apple" in mylist:
    print("yes")
else:
    print("no")
```

Mine
> OmG kalo aing, dulu, pake cara for loop, terus ==, omG

Another mine
> Hm tulis gitu ya? Soalnya aku kayak bingung dan suka lupa masalah `pop`, `append`?

My answer:
> Tulis aja deh kayaknya lebar, nanti bikin cheatsheet sndiri ah.

### cheatsheets for list

```python
mylist = ["banana", "orange", "pineapple"]

print(len(mylist)) # to print the length of my list

mylist.append("lemon") # tambah sesuatu ke tuntung mylist

# jadinya mylist = ["banana", "orange", "pineapple", "lemon"]

mylist.insert(1, "blueberry")

# jadinya mylist = ["banana", "blueberry", "orange", "pineapple", "lemon"]

item = mylist.pop()

# jadinya mylist = ["banana", "blueberry", "orange", "pineapple"]

# jadinya item = "lemon"

mylist.remove("banana")

# jadinya mylist = ["blueberry", "orange", "pineapple"]

mylist.reverse()

# jadinya mylist = ["pineapple", "orange", "blueberry"]

mylist.clear()

# jadinya mylist = []

mylist.append("pineapple", "orange", "blueberry") # meureun IDK, gak ditest
# biar ada lagi aja

mylist.sort() # bisa buat list penuh dengan angka juga

# jadinya mylist = ["blueberry", "orange", "pineapple" ] which
# alphabetically sorted

new_list = sorted(mylist) # bikin list baru, yg tersortir, angka tapi di tutor mah
```

Numbers now:

```python
numbers1 = [1, -1, -43, 31, 12]

#bisa di sort

numbers2 = sorted(numbers1)

five_zeros = [0] * 5

# five_zeros = [0, 0, 0, 0, 0]

new_list = numbers1 + five_zeros

# new_list = [1, -1, -43, 31, 12, 0, 0, 0, 0, 0]
```

## Learning In Progress

> Udahlah mending di Jupyter Notebook Aja.

last position: 11:38 of [1]

## Source(s)

[1]: [1ntermediate Python Programming Course](https://www.youtube.com/watch?v=HGOBQPFzWKo)
