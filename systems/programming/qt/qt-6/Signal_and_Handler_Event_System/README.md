# [Signal and Handler Event System](https://doc.qt.io/qt-6/qtqml-syntax-signals.html)

_**Table of Contents**_
- [Signal and Handler Event System](#signal-and-handler-event-system)
  - [Receiving _signals_ with _signal handlers_](#receiving-signals-with-signal-handlers)
    - [Property change signal handlers](#property-change-signal-handlers)
    - [Signal parameters](#signal-parameters)
  - [Adding signals to custom QML types](#adding-signals-to-custom-qml-types)

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

For example: 
- the [`Button`](https://doc.qt.io/qt-6/qml-qtquick-controls2-button.html) type _from the [`Qt Quick Controls`](https://doc.qt.io/qt-6/qtquickcontrols-index.html) module_ has a `clicked` signal, 
  - which is _emitted_ whenever the button is _clicked_. 
  - In this case, the **signal handler** for receiving this signal should be `onClicked`. 

In the example below, whenever _the button is clicked_, the `onClicked` handler is **invoked**, applying a random color to the parent `Rectangle`:

```qml
import QtQuick
import QtQuick.Controls

Rectangle {
    id: rect
    width: 250; height: 250

    Button {
        anchors.bottom: parent.bottom
        anchors.horizontalCenter: parent.horizontalCenter
        text: "Change color!"
        onClicked: {
            rect.color = Qt.rgba(Math.random(), Math.random(), Math.random(), 1);
        }
    }
}
```

### Property change signal handlers

- A signal is automatically emitted when _the value of a QML property changes_. 
  - This type of **signal** is _a property change signal_
    - and **signal handlers** for _these signals are written in the form_ `on<Property>Changed`,
    - where `<Property>` is _the name of the property_,
      - with the first letter _capitalized_.

For example:
- the [`MouseArea`](https://doc.qt.io/qt-6/qml-qtquick-mousearea.html) type has a [_`pressed`_](https://doc.qt.io/qt-6/qml-qtquick-mousearea.html#pressed-signal) property. 
  - To _receive a notification whenever this property **changes**_,
    - write a signal handler named `onPressedChanged`:

```qml
import QtQuick

Rectangle {
    id: rect
    width: 100; height: 100

    TapHandler {
        onPressedChanged: console.log("taphandler pressed?", pressed)
    }
}
```

Even though the [`TapHandler`](https://doc.qt.io/qt-6/qml-qtquick-taphandler.html) documentation does not document a signal handler named `onPressedChanged`, the signal is _implicitly_ provided by the fact that _the pressed property exists_.

> Excuse me? Implicitly?

### Signal parameters

- Signals might have **parameters**.
  - To access those, you should _assign a **function**_ to the handler.
    - Both arrow functions and anonymous functions work.
      > [JavaScript Arrow Function](https://www.w3schools.com/js/js_arrow_function.asp)
      >
      > [JavaScript Function Definitions](https://www.w3schools.com/js/js_function_definition.asp)

For the following examples:
- consider a `Status` component with an **`errorOccurred`** signal 
  - _see [Adding signals to custom QML types](#adding-signals-to-custom-qml-types) for more information about how signals can be added to QML components._
  
  ```qml
  // Status.qml
  import QtQuick

  Item {
      id: myitem
      signal errorOccurred(message: string, line: int, column: int)
  }
  ```

  ```qml
  Status {
      onErrorOccurred: (mgs, line, col) => console.log(`${line}:${col}: ${msg}`)
  }
  ```

  Note:
  > _The names of the formal parameters in the function_ **do not have to** match _those in the signal_.
  
  - If you _do not need to handle all parameters_, it is possible to _**omit** trailing ones_:

    ```qml
    Status {
        onErrorOccurred: function (message) { console.log(message) }
    }
    ```

  - It is not possible to leave out leading parameters you are interested in, however you can use some placeholder name to indicate to readers that they are not important:

    ```qml
    Status {
        onErrorOccurred: (_, _, col) => console.log(`Error happened at column ${col}`)
    }
    ```

  Note:
  > Instead of using a function, it is possible, but discouraged, to use a plain code block. In that case all signal parameters get injected into the scope of the block. However, this can make code difficult to read as it's unclear where the parameters come from, and results in slower lookups in the QML engine. Injecting parameters in this way is deprecated, and will cause runtime warnings if the parameter is actually used.

  Mine for note above:
  > It's not necessary then.

## Adding signals to custom QML types

> To be continued.
