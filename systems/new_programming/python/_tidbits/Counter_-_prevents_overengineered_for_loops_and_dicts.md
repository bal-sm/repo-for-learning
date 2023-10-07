# Counter - prevents overengineered for loops and dicts

> Thanks to [Indently](https://www.youtube.com/watch?v=lPMymfirSi8).

```python
from collections import Counter

text = "yyyyeeyeeeeeeeeenyeeblondeandgone"

c = Counter(text)

print(c)

# Top three yang muncul di text
print(c.most_common(n=3))
```
