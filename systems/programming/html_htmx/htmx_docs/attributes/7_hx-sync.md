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

...
