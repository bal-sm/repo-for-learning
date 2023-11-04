# Sets: Remove dupes

[By b001](https://www.youtube.com/watch?v=32XIgqI3E0I)

```python
def merge_arrays(array_A, array_B):
    # 1. Merge `array_A` and `array_B`
    # 2. Remove duplicates
    # 3. Sort list in ascending order
    return sorted(set(array_A + array_B))


a = [1, 2, 3, 3, 4, 5, 6]
b = [4, 4, 5, 6, 7, 8, 9]
c = merge_arrays(a, b)
print(c)
```
