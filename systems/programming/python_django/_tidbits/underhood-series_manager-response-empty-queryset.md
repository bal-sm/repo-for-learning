# Underhood of Django series: Manager's Response for an empty QuerySet

What will ever Django do about it?

```python
articles_by_Tyler = Article.objects.filter(reporter__name="Tyler")
print(articles_by_Tyler)
# Output: <QuerySet []>
#
# Tyler Joseph:
# > I am a rock singer, not a reporter.
last_reporter_s_article = Article.objects.filter(reporter__name="Tyler").last()
# Me:
# > Whatever, I don't hear you.
print(last_reporter_s_article)
# Output: None
#
# Tyler Joseph:
# > Eh dibilangin.
```

TL;DR:
> Jadinya, keluarin `None`.
