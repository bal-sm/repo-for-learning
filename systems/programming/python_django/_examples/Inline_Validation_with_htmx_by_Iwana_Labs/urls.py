# from `components/urls.py`
from django.urls import path

from components.inline_validation.form import FormInlineValidationComponent

urlpatterns = [
    path(
        "",
        FormInlineValidationComponent.as_view(),
        name="form_inline_validation",
    ),
]

# * my opinion: just usual URLConf, tuh kan tapi pusing, menurutku yang bagus itu keliatan `htmx` path-nya.
#
# * terus, eror-eror CSRF, atau kalau malah jadi prone to unnoticed security bug? WADUH.
