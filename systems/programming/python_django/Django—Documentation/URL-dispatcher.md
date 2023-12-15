# URL dispatcher

...

_Skipped_

## How Django processes a request

- When a user -_requests_-> a page from your Django-powered site,
  - **this** **is** **the** **algorithm** the system **follows** _to determine which Python code to execute_;
  1. Django determines _the root ~~URLconf~~ URL configuration module to use_.
     - Ordinarily, this is the value of the `ROOT_URLCONF` setting,
       - but if the incoming `HttpRequest` object has a `urlconf` attribute (_set by middleware_) [LN1], its value will be used in place of the `ROOT_URLCONF` setting.
  2. ...

## ...

...

## Learning notes

[LN1]: Penggalan 1:
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

Penggalan 3:
> **`HttpRequest.user`**
>
> - From the `AuthenticationMiddleware`: An instance of `AUTH_USER_MODEL` representing the currently logged-in user.
>   - If the user isn’t currently logged in, user will be set to an instance of `AnonymousUser`.
> ...

Realization on 3:
> Tuh makanya ada `request.user` pas di route melalui `urls.py`.

Masih bingung tapi:
> Kenapa dinamain `URLconf` kayak suatu objek atau apa gitu, padahal bukan, nama objects nya `urls.py` / `urlpatterns` / etc..

## Source(s)

[1]: [URL dispatcher](https://docs.djangoproject.com/en/5.0/topics/http/urls/)
[2]: [`HttpRequest.path_info`](https://docs.djangoproject.com/en/5.0/ref/request-response/#django.http.HttpRequest.path_info)
[3]: [`HttpRequest.user`](https://docs.djangoproject.com/en/5.0/ref/request-response/#django.http.HttpRequest.user)
