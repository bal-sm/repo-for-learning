# URL dispatcher

...

## Learning notes

Penggalan 1:
> ...`HttpRequest` object has a `urlconf` attribute (**set by middleware**)...

My Question 1:
> Which middleware?

_Not answered yet._

Penggalan 2 (Untranslated/not summarized yet):
> **`HttpRequest.path_info`** [2]
>
> Under some web server configurations, the portion of the URL after the host name is split up into a script prefix portion and a path info portion. The `path_info` attribute always contains the path info portion of the path, no matter what web server is being used. Using this instead of `path` can make your code easier to move between test and deployment servers.
>
> For example, if the `WSGIScriptAlias` for your application is set to "`/minfo`", then `path` might be "`/minfo/music/bands/the_beatles/`" and `path_info` would be "`/music/bands/the_beatles/`".

TL;DR 2:
> Jadi, baca we, males hehe.

## Source(s)

[1]: [URL dispatcher](https://docs.djangoproject.com/en/5.0/topics/http/urls/)
[2]: [`HttpRequest.path_info`](https://docs.djangoproject.com/en/5.0/ref/request-response/#django.http.HttpRequest.path_info)
