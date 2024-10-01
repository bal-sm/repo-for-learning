# `hx-sync`

Mine, intermezzo:
> `hx-sync="closest form:abort"`, aduh dia ngasal nih, masa main ketik terus kirim aja lagi, padahal lagi loading juga.

- The `hx-sync` attribute
  - allows you to synchronize AJAX requests
    - between multiple elements.

- The `hx-sync` attribute
  - consists of a CSS selector
    - > `#something`
    - to indicate the element
      - to synchronize on,
        - > `hx-sync="closest form:abort"`
        - followed optionally by a colon
          - > `form:abort`
        - and then by an optional syncing strategy.
          - > `abort`
          - The available strategies are:

- `drop`
  - drop (ignore) this request
    - if an existing request is in flight (the default)
- `abort`
  - drop (ignore) this request
    - if an existing request is in flight,
    - and, if that is not the case,
      - *abort* this request if another request occurs
      - while it is still in flight
- `replace`
  - abort the current request,
    - if any, and replace it with this request
- `queue`
  - place this request in the request queue
    - associated with the given element

- The `queue` modifier
  - can take an additional argument
    - indicating exactly how to queue:

- `queue first`
  - queue the first request to show up
    - while a request is in flight
- `queue last`
  - queue the last request to show up
    - while a request is in flight
- `queue all`
  - queue all requests that show up
    - while a request is in flight

...
