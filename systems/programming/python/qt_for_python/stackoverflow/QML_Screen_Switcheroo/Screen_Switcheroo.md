# Efficient way to switch pyside6 qml screens

## Question by lakkadaayush

I am working on a project where I have to make a multi-screen/window application. I am using QML and PySide6 for this purpose. The flow of my applications is like below:

login screen -> search screen (search for certain items) -> test screen (performs some operations) -> reports screen (displays results from test screen).

> _Skipped codes_. Thanks for asking!

## Answer by ניר

The following is a showcase of various approaches regarding to your question.

Although all the code here is coherent and **meant to be run together**, it shows _different approaches to navigate pages_ and you may adopt what you like.

![](PICTURE PLZ kalo sama)

[Original Codes](https://github.com/nrbnlulu/Qt-answers/tree/master/QtQuick/HandelingWindows)

### Setup

[main.py](method_1_stackview/main.py)

```python
import sys
from pathlib import Path
from PySide6.QtGui import QGuiApplication
from PySide6.QtQml import QQmlApplicationEngine


if __name__ == "__main__":
    app = QGuiApplication(sys.argv)
    engine = QQmlApplicationEngine()

    qml_file = Path(__file__).parent / "main.qml"
    engine.load(qml_file)

    if not engine.rootObjects():
        sys.exit(-1)

    sys.exit(app.exec())
```

> A regular QML engine then load the file

### The `qml`s

> Read the docs about [`StackView QML Type` here](https://doc.qt.io/qt-6/qml-qtquick-controls2-stackview.html).

1. Created `ApplicationWindow` in `main.qml`:
   
    ```qml
    import QtQuick
    import QtQuick.Controls
    import QtQuick.Controls.Material 2.15
    
    ApplicationWindow {
        id: mainFrame
        width: 640
        height: 480
        visible: true
        title: qsTr("Windows handeling in QML")
        Material.theme: Material.Dark
    ```

2. Created other `qml`s file that will be transitioned with:
   
   Also added with appropriate signaling.

   > Receiving signals with signal handlers
   > ...the object definition should declare a signal handler named `on<Signal>`, where `<Signal>` is the _name of the signal_, with the _first letter **capitalized**_. 
   > Read more:
   > [Signal and Handler Event System](https://doc.qt.io/qt-6/qtqml-syntax-signals.html)

    - In `LoginWin.qml`:
    
        ```qml
        import QtQuick
        import QtQuick.Controls
        import QtQuick.Controls.Material 2.15

        Item {
            id: root
            signal loggedIn
        }
        ```

        > - So, 
        >   - the name of the signal is `loggedIn` 
        >   - with the signal handler named `onLoggedIn`.
    
    - `StackLayoutWin.qml`:

        ```qml
        import QtQuick
        import QtQuick.Controls
        import QtQuick.Layouts
        import QtQuick.Controls.Material 2.15

        Item {
            id: root
            signal returnToLogginWin
        }
        ```

        > - So, 
        >   - the name of the signal is `returnToLogginWin` 
        >   - with the signal handler named `onReturnToLogginWin`.

3. Created `StackView` in `main.qml`:

    ```qml
        StackView{id: stack_view
            initialItem: logginWin
            anchors.fill: parent;
            Component{id: logginWin
                LoginWin{
                    onLoggedIn: {
                        stack_view.push(stack_le)
                        console.log("logged In")
                    }
                }
            }
    ```

    > So, `onLoggedIn` handler that contains some JavaScript codes can be invoked. The button signal code is TBA.

    ```qml
            Component{id: stack_le
                StackLayoutWin{
                    onReturnToLogginWin:{
                        stack_view.pop()
                    }
                }
            }
        }
    }
    ```

    > same as above but, `onReturnToLogginWin`.

4. In `LoginWin.qml`:
   - Anchored

        ```qml
        Item {
            id: root
            anchors.fill: parent
            signal loggedIn
        }
        ```

        > `anchors.fill` is a convenience that is the same as setting the left,right,top and bottom anchors to the left,right,top and bottom of the target item. 
        > Read more:
        > [Positioning with Anchors](https://doc.qt.io/qt-6/qtquick-positioning-anchors.html)

   - Added `TextArea`:

        > `anchors.centerIn` is another convenience anchor, and is the same as setting the `verticalCenter` and `horizontalCenter` anchors to the `verticalCenter` and `horizontalCenter` of the target item.
        
        My Question:
        > Apa bedanya sama `anchors.fill`?
        > Ngerti da. Pokoknya kalo `anchors.fill` nyari tengah-tengah dari sekitar, kalo `anchors.centerIn` berarti ngambil dari tengah-tengah suatu benda. Gitu we lah. Semoga bener.
        
        ```qml
            TextArea {
                id: input_
                placeholderText: "Enter password"
                anchors.centerIn: parent
            }
        ```

_To be continued._

> Thanks to nrbnlulu/ניר
