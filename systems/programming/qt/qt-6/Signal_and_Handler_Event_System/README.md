# [Signal and Handler Event System](https://doc.qt.io/qt-6/qtqml-syntax-signals.html)

Application and user interface components _need to communicate with each other_.

- For example, a **button** needs to know _that the user has clicked on it_. 
  - The button may _change colors_ to _indicate its state_ or _perform some logic_. 
    - As well, application needs to know whether _the user is **clicking** the button_. 
  - The application may need to _relay this clicking event_ to other _applications_.

- QML has a signal and handler mechanism, where 
  - the signal is the **event** and 
  - the signal is _responded to through a signal handler_. 
    - When a signal is **emitted**, the corresponding signal handler is **invoked**. 
      > `invoke`:
      >
      > past tense: `invoked`; past participle: `invoked`
      >
      > General meaning:
      >
      > cite or appeal to (someone or something) as an authority for an action or in support of an argument.
      >
      >
      > In Computing:
      >
      > cause (a procedure) to be carried out.
      - **Placing `logic`** such as a script or other operations in the handler _allows the component to respond to the event_.

## Receiving _signals_ with _signal handlers_

- To receive a **notification** when _a particular signal is emitted_ for _a particular object_, 
  - the object definition should declare **a signal handler** named `on<Signal>`,
    - where `<Signal>` is **the name of the signal**, with the first letter _capitalized_. 
    - **The signal handler** should contain the JavaScript code to be executed when the signal handler is invoked.

> To be continued.
