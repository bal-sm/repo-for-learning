# [Signal and Handler Event System](https://doc.qt.io/qt-6/qtqml-syntax-signals.html)

_**Table of Contents**_
- [Signal and Handler Event System](#signal-and-handler-event-system)
  - [Receiving _signals_ with _signal handlers_](#receiving-signals-with-signal-handlers)
    - [Property change signal handlers](#property-change-signal-handlers)
    - [Signal parameters](#signal-parameters)
    - [Using the Connections type](#using-the-connections-type)
    - [Attached signal handlers](#attached-signal-handlers)
  - [Adding signals to custom QML types](#adding-signals-to-custom-qml-types)
  - [Connecting signals to methods and signals](#connecting-signals-to-methods-and-signals)

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

### Using the Connections type

- In some cases it may be desirable to _access a signal outside of the object that emits it_. 
  - For these purposes, the `QtQuick` module provides the [`Connections`](https://doc.qt.io/qt-6/qml-qtqml-connections.html) type 
    - for connecting to **signals** of _arbitrary objects_. 
    - A `Connections` object can receive any signal from its specified [target](https://doc.qt.io/qt-6/qml-qtqml-connections.html#target-prop).

For example:
- the `onClicked` handler in the earlier example could have been received by the root [`Rectangle`](https://doc.qt.io/qt-6/qml-qtquick-rectangle.html) instead,
  - by placing the `onClicked` handler in a `Connections` object 
    - that has its target set to the button:

    ```qml
    import QtQuick
    import QtQuick.Controls
    
    Rectangle {
        id: rect
        width: 250; height: 250
    
        Button {
            id: button
            anchors.bottom: parent.bottom
            anchors.horizontalCenter: parent.horizontalCenter
            text: "Change color!"
        }
    
        Connections {
            target: button
            function onClicked() {
                rect.color = Qt.rgba(Math.random(), Math.random(), Math.random(), 1);
            }
        }
    }
    ```

### Attached signal handlers

- An attached signal handler _receives a signal from an **`attaching type`**_ 
  - rather than _the object within which the handler is declared_.

For example:
- [`Component.onCompleted`](https://doc.qt.io/qt-6/qml-qtqml-component.html#completed-signal) is _an attached signal handler_. 
  - It is often used _to execute some JavaScript code_ 
    - when its _creation process is **complete**_. 

  Here is an example:

  ```qml
  import QtQuick

  Rectangle {
      width: 200; height: 200
      color: Qt.rgba(Qt.random(), Qt.random(), Qt.random(), 1)

      Component.onCompleted: {
          console.log("The rectangle's color is", color)
      }
  }
  ```

The `onCompleted` handler is not responding to a `completed` signal from the `Rectangle` type. 

- Instead, an object of the `Component` _attaching type_ with a `completed` signal 
  - _has automatically been attached_ to the `Rectangle` object by the QML engine. 
  - _The engine emits this signal_ when the `Rectangle` object is created, 
    - thus triggering the `Component.onCompleted` signal handler.

- **Attached signal handlers** _allow objects to be notified of particular signals_ 
  - that are significant to each individual object. 
  - If there was no `Component.onCompleted` attached signal handler, for example, 
    - an object **could not** receive this notification without _registering for some special signal_ from _some special object_. 
  - The _attached signal handler_ mechanism enables objects to receive particular signals without extra code.

Note:
> See [Attached properties and attached signal handlers](https://doc.qt.io/qt-6/qtqml-syntax-objectattributes.html#attached-properties-and-attached-signal-handlers) for more information on _attached_ signal handlers.

## Adding signals to custom QML types

Signals can be added to custom QML types through the `signal` keyword.

The syntax for defining a new signal is:

```qml
signal <name>[([<type> <parameter name>[, ...]])]
```

A signal is **emitted** by _invoking the signal as a method_.

For example:
- the code below is defined in a file named `SquareButton.qml`.
  - The root `Rectangle` object has an `activated` signal, 
    - which is **emitted** whenever the child `TapHandler` is tapped. 
- In this particular example the **activated signal** is emitted with _the x and y coordinates of the mouse click_:

  ```qml
  // SquareButton.qml
  import QtQuick

  Rectangle {
      id: root

      signal activated(real xPosition, real yPosition)
      property point mouseXY
      property int side: 100
      width: side; height: side

      TapHandler {
          id: handler
          onTapped: root.activated(root.mouseXY.x, root.mouseXY.y)
          onPressedChanged: root.mouseXY = handler.point.position
      }
  }
  ```

  > Let's revisit [`TapHandler`](https://doc.qt.io/qt-6/qml-qtquick-taphandler.html)

  - Now any objects of the `SquareButton` (_because the previous file named `SquareButton.qml`_) can connect to the `activated` signal 
    - using an `onActivated` signal handler:

    ```qml
    // myapplication.qml
    SquareButton {
        onActivated: (xPosition, yPosition)=> console.log("Activated at " + xPosition + "," + yPosition)
    }
    ```

> See [Signal Attributes](https://doc.qt.io/qt-6/qtqml-syntax-objectattributes.html#signal-attributes) for more details on writing signals for custom QML types.

## Connecting signals to methods and signals

- Signal objects have a `connect()` method to a connect a signal 
  - either to _a method_ or _another signal_.
  - When a signal is connected to a method, 
    - the method is _automatically invoked_ whenever the signal is emitted. 
      - This mechanism enables a signal to be _received by a method instead of a signal handler_.

Below, the `messageReceived` signal is connected to three methods using the `connect()` method:

```qml
import QtQuick

Rectangle {
    id: relay

    signal messageReceived(string person, string notice)

    Component.onCompleted: {
        relay.messageReceived.connect(sendToPost)
        relay.messageReceived.connect(sendToTelegraph)
        relay.messageReceived.connect(sendToEmail)
        relay.messageReceived("Tom", "Happy Birthday")
    }

    function sendToPost(person, notice) {
        console.log("Sending to post: " + person + ", " + notice)
    }
    function sendToTelegraph(person, notice) {
        console.log("Sending to telegraph: " + person + ", " + notice)
    }
    function sendToEmail(person, notice) {
        console.log("Sending to email: " + person + ", " + notice)
    }
}
```

- In many cases it is sufficient to receive signals through signal handlers 
  - rather than using the `connect()` function.

- However, using the `connect` method _allows a signal to be received by multiple methods_ as shown earlier, 
  - which would not be possible with signal handlers as they must be uniquely named.
  - Also, the `connect` method is useful when connecting signals to [dynamically created objects](https://doc.qt.io/qt-6/qtqml-javascript-dynamicobjectcreation.html).
    > I need to read that.

There is a corresponding `disconnect()` method _for removing connected signals_:

```qml
Rectangle {
    id: relay
    //...

    function removeTelegraphSignal() {
        relay.messageReceived.disconnect(sendToTelegraph)
    }
}
```

/// Signal to signal connect

> To be continued.
