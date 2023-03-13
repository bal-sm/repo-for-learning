# Efficient way to switch pyside6 qml screens

## Question by lakkadaayush

I am working on a project where I have to make a multi-screen/window application. I am using QML and PySide6 for this purpose. The flow of my applications is like below:

login screen -> search screen (search for certain items) -> test screen (performs some operations) -> reports screen (displays results from test screen).

> _Skipped codes_. Thanks for asking!

## Answer by ניר

The following is a showcase of various approaches regarding to your question.

Although all the code here is coherent and **meant to be run together**, it shows _different approaches to navigate pages_ and you may adopt what you like.

![](PICTURE PLZ kalo sama)

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

### Method 1: Use a StackView

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

3

_To be continued._
