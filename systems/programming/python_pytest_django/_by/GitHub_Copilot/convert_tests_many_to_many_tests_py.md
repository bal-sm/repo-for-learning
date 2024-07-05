# Convert [`tests/many_to_many/tests.py`](https://github.com/bal-sm/django/blob/cac94dd8aa2fb49cd2e06b5b37cf039257284bb0/tests/many_to_many/tests.py) to `pytest` tests

## Question

aku tanya GitHub Copilot buat convert code [ini](https://github.com/bal-sm/django/blob/cac94dd8aa2fb49cd2e06b5b37cf039257284bb0/tests/many_to_many/tests.py):.

- ...,
  - > masukkin code before-nya, maintenance.

## Answer

Jadinya gini:

```python
import pytest

@pytest.fixture
def publications():
    p1 = Publication.objects.create(title="The Python Journal")
    p2 = Publication.objects.create(title="Science News")
    p3 = Publication.objects.create(title="Science Weekly")
    p4 = Publication.objects.create(title="Highlights for Children")
    return p1, p2, p3, p4

@pytest.fixture
def articles(publications):
    p1, p2, p3, p4 = publications
    a1 = Article.objects.create(headline="Django lets you build web apps easily")
    a1.publications.add(p1)
    a2 = Article.objects.create(headline="NASA uses Python")
    a2.publications.add(p1, p2, p3, p4)
    a3 = Article.objects.create(headline="NASA finds intelligent life on Earth")
    a3.publications.add(p2)
    a4 = Article.objects.create(headline="Oxygen-free diet works wonders")
    a4.publications.add(p2)
    return a1, a2, a3, a4

def test_add(articles, publications):
    a1, a2, a3, a4 = articles
    p1, p2, p3, p4 = publications

    a5 = Article(headline="Django lets you create web apps easily")
    with pytest.raises(ValueError) as e:
        getattr(a5, "publications")
    assert str(e.value) == '"<Article: Django lets you create web apps easily>" needs to have a value for field "id" before this many-to-many relationship can be used.'
    a5.save()
    a5.publications.add(p1)
    assert list(a5.publications.all()) == [p1]

    a6 = Article(headline="ESA uses Python")
    a6.save()
    a6.publications.add(p1, p2)
    a6.publications.add(p3)
    a6.publications.add(p3)
    assert list(a6.publications.all()) == [p2, p3, p1]

    with pytest.raises(TypeError) as e:
        with transaction.atomic():
            a6.publications.add(a5)
    assert str(e.value) == "'Publication' instance expected, got <Article: Django lets you create web apps easily>"

    p5 = a6.publications.create(title="Highlights for Adults")
    assert list(a6.publications.all()) == [p5, p2, p3, p1]

def test_add_remove_set_by_pk(articles, publications):
    a5, _, _, _ = articles
    p1, _, _, _ = publications

    a5.publications.add(p1.pk)
    assert list(a5.publications.all()) == [p1]
    a5.publications.set([p2.pk])
    assert list(a5.publications.all()) == [p2]
    a5.publications.remove(p2.pk)
    assert list(a5.publications.all()) == []

def test_add_remove_set_by_to_field(articles):
    user_1 = User.objects.create(username="Jean")
    user_2 = User.objects.create(username="Joe")
    a5, _, _, _ = articles

    a5.authors.add(user_1.username)
    assert list(a5.authors.all()) == [user_1]
    a5.authors.set([user_2.username])
    assert list(a5.authors.all()) == [user_2]
    a5.authors.remove(user_2.username)
    assert list(a5.authors.all()) == []

def test_related_manager_refresh(articles):
    user_1 = User.objects.create(username="Jean")
    user_2 = User.objects.create(username="Joe")
    a3, a4 = articles[2], articles[3]

    a3.authors.add(user_1.username)
    assert list(user_1.article_set.all()) == [a3]

    user_1_from_db = User.objects.get(pk=user_1.pk)
    assert list(user_1_from_db.article_set.all()) == [a3]
    user_1_from_db.username = "Paul"
    a3.authors.set([user_2.username])
    user_1_from_db.save()

    a4.authors.add(user_1_from_db.username)
    assert list(user_1_from_db.article_set.all()) == [a4]

    user_1.refresh_from_db()
    assert user_1.username == "Paul"
    assert list(user_1.article_set.all()) == [a4]

def test_add_remove_invalid_type(articles):
    a1, _, _, _ = articles

    msg = "Field 'id' expected a number but got 'invalid'."
    for method in ["add", "remove"]:
        with pytest.raises(ValueError) as e:
            getattr(a1.publications, method)("invalid")
        assert str(e.value) == msg

def test_reverse_add(articles):
    a3, a2, a4 = articles[2], articles[1], articles[3]
    p2 = a2.publications.first()

    a5 = Article(headline="NASA finds intelligent life on Mars")
    a5.save()
    p2.article_set.add(a5)
    assert list(p2.article_set.all()) == [a3, a5, a2, a4]
    assert list(a5.publications.all()) == [p2]

    a6 = p2.article_set.create(headline="Carbon-free diet works wonders")
    assert list(p2.article_set.all()) == [a6, a3, a5, a2, a4]
    a6 = p2.article_set.all()[3]
    assert list(a6.publications.all()) == [p4, p2, p3, p1]

@pytest.mark.skipif(not supports_ignore_conflicts, reason="Database backend does not support ignore conflicts")
def test_fast_add_ignore_conflicts(articles):
    a1, _, _, _ = articles

    with pytest.assert_num_queries(1):
        a1.publications.add(p1, p2)

@pytest.mark.skipif(supports_ignore_conflicts, reason="Database backend supports ignore conflicts")
def test_add_existing_different_type(articles):
    a1, _, _, _ = articles

    with pytest.assert_num_queries(1):
        a1.publications.add(str(p1.pk))
    assert a1.publications.get() == p1

@pytest.mark.skipif(not supports_ignore_conflicts, reason="Database backend does not support ignore conflicts")
def test_slow_add_ignore_conflicts(articles):
    a1, _, _, _ = articles
    manager_cls = a1.publications.__class__
    missing_target_ids = {p1.id}
    add_plan = (True, False, False)

    with mock.patch.object(manager_cls, "_get_missing_target_ids", return_value=missing_target_ids) as mocked:
        with mock.patch.object(manager_cls, "_get_add_plan", return_value=add_plan):
            a1.publications.add(p1)
    mocked.assert_called_once()

def test_related_sets(articles):
    a1, a2, _, _ = articles

    assert list(a1.publications.all()) == [p1]
    assert list(a2.publications.all()) == [p4, p2, p3, p1]
    assert list(p2.article_set.all()) == [a3, a2, a4]
    assert list(p1.article_set.all()) == [a1, a2]
    assert list(Publication.objects.get(id=p4.id).article_set.all()) == [a2]

def test_selects(articles):
    a1, a2, a3, a4 = articles

    assert list(Article.objects.filter(publications__id__exact=p1.id)) == [a1, a2]
    assert list(Article.objects.filter(publications__pk=p1.id)) == [a1, a2]
    assert list(Article.objects.filter(publications=p1.id)) == [a1, a2]
    assert list(Article.objects.filter(publications=p1)) == [a1, a2]
    assert list(Article.objects.filter(publications__title__startswith="Science")) == [a3, a2, a2, a4]
    assert list(Article.objects.filter(publications__title__startswith="Science").distinct()) == [a3, a2, a4]
    assert Article.objects.filter(publications__title__startswith="Science").count() == 4
    assert Article.objects.filter(publications__title__startswith="Science").distinct().count() == 3

# ...
```

Mine:
> Cuman ada tests yang gak diconvert ini teh.
