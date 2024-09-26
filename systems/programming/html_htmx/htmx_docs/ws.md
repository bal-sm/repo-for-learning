# WebSockets extension for `htmx`

- The `WebSockets` extension enables
  - easy,
  - bi-directional communication
    - with [Web Sockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications)
      - servers directly from HTML.

```
- This replaces the experimental `hx-ws` attribute
  - built into previous versions of htmx.
  - For help migrating from older versions, see the [Migrating](#migrating-from-previous-versions) guide at the bottom of this page.
```

Use the following attributes to configure how WebSockets behave:
- `ws-connect="<url>"`
  - or `ws-connect="<prefix>:<url>"`
  - A URL to establish a `WebSocket` connection against.
- Prefixes `ws` or `wss` can optionally be specified.
  - If not specified,
  - HTMX defaults to adding
    - the location's scheme-type,
    - host
    - and port
    - to have browsers
      - send cookies
        - via websockets.
- `ws-send`
  - Sends a message to the nearest websocket
    - based on the trigger value
      - for the element (either the natural event
      - or the event specified by [`hx-trigger`])

Mine, learning note:
> This part not properly summarized.

...
