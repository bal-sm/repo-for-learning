# global-var must be local for performance

[YouTube](https://www.youtube.com/watch?v=uWEIaF0PNGg)

## Before - Unoptimized

```python
global_var = 10


def func():
    ans = 0
    for i in range(1000):
        ans += global_var * i
    return ans


print(func())
# 4995000
```

## After - Optimized

```python
global_var = 10


def func():
    ans = 0
    local_var = global_var # **Tuh**
    for i in range(1000):
        ans += local_var * i
    return ans


print(func())
# 4995000, anggeur
```

For Indonesian:
> Jadi lebih cepet soalnya variable nya ada di dalem function, dan interpreter gak usah nyari kemana-mana lagi.

Mine:
> Keliatan siah bedanya. Insert sayang di bawah ini.
