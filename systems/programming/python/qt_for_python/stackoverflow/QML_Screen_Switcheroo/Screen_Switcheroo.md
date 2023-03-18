# [Efficient way to switch pyside6 qml screens](https://stackoverflow.com/questions/73010212/efficient-way-to-switch-pyside6-qml-screens)

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
   >
   > ...the object definition should declare a signal handler named `on<Signal>`, where `<Signal>` is the _name of the signal_, with the _first letter **capitalized**_. 
   
   Read more:
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
        
        Read more:
        > [Positioning with Anchors](https://doc.qt.io/qt-6/qtquick-positioning-anchors.html)

   - Added `TextArea`:

        > `anchors.centerIn` is another convenience anchor, and is the same as setting the `verticalCenter` and `horizontalCenter` anchors to the `verticalCenter` and `horizontalCenter` of the target item.

        My Question:
        > Apa bedanya sama `anchors.fill`?
        >
        > Ngerti da. Pokoknya kalo `anchors.fill` nyari tengah-tengah dari sekitar, kalo `anchors.centerIn` berarti ngambil dari tengah-tengah suatu benda. Gitu we lah. Semoga bener.

        ```qml
            TextArea {
                id: input_
                placeholderText: "Enter password"
                anchors.centerIn: parent
            }
        ```

   - Added `Button`:

        ```qml
            Button {
                text: "Login"

                anchors {
                    horizontalCenter: parent.horizontalCenter
                    top: input_.bottom
                }
        ```

        with `onClicked` handler JavaScript codes:

        ```qml
                onClicked: {
                    console.log(input_.text);
                    if (input_.text == "12345") {
                        root.loggedIn();
                    } else {
                        input_.text = "Wrong password";
                    }
                }
        ```

        > So, if the `Button` is clicked then _built-in_ signal clicked will be emitted then the `onClicked` handler code will be invoked then the text input will be checked, if it's "12345" then on to `loggedIn` signal.
        >
        > Let's test.
        >
        > It's working.

5. In `StackLayoutWin.qml`:

   - Anchored

        ```qml
        Item {
            id: root
            signal returnToLogginWin
            anchors.fill: parent
        }
        ```
        
        > Biasain untuk sementara, signal dulu baru anchors, nanti mau baca qml coding guide lagi kalo ada waktunya.
        
   - Added `Button`:
        
        > Buat kembali ke login page.

        ```qml
            Button {
                id: return_to_StackView
                x: parent.width - width
                y: tab_bar.y
                text: "return to login page"
                onClicked: {
                    root.returnToLogginWin();
                }
            }
        ```
        
        > Jadi si x nya pasti digigir kanan.
        My Question:
        > Is it the only way to make it responsive?
        >
        > Really need responsitivity for my Bless app.

   - Added `ColumnLayout`

        > Susahnya ngerangkumnya harus bikin manual aja biar ngerti gambarannya gimana
        >
        > Pokoknya kayak Bootstrap apa gitu. Pas urg ngerjain TA terus konsul sama si Daris. Jago desain.
        >
        > Read more:
        >
        > [`ColumnLayout` QML Type](https://doc.qt.io/qt-6/qml-qtquick-layouts-columnlayout.html)

        ```qml
            ColumnLayout {
                anchors.fill: parent
        ```

       - Added `TabBar`:
            
            > Allows the user to switch between _different views or subtasks_
            >
            > Provides a tab-based navigation model.
            > 
            > - `TabBar` is populated with `TabButton` controls,
            >   - and can be used together with any layout or container control 
            >   - that provides `currentIndex`-property, such as `StackLayout` _(di bawah)_ or `SwipeView`.

            Read more:
            > [TabBar QML Type](https://doc.qt.io/qt-6/qml-qtquick-controls2-tabbar.html)

            ```qml
                    TabBar {
                        id: tab_bar
                        TabButton {
                            width: 100
                            text: qsTr("foo")
                        }
                        TabButton {
                            width: 100
                            text: qsTr("bar")
                        }
                        TabButton {
                            width: 100
                            text: qsTr("Loader")
                        }
                    }
            ```

            > Dikirain pake signal handler lagi. Ternyata beda lagi.

       - Added `StackLayout`:

            ```qml
            StackLayout {
                id: stack_layout
                currentIndex: tab_bar.currentIndex
                // Screens to be added
            }
            ```

            Meanwhile, this is a screenshot of the application between this step and the next step:

            ![Added `StackLayout`](pics/step_5cb_on_StackLayout.png)

           - Added screens with `Rectangle`s

                ```qml
                        StackLayout {
                            id: stack_layout
                            currentIndex: tab_bar.currentIndex
                            Rectangle {
                                color: 'teal'
                                Label {
                                    anchors.centerIn: parent
                                    text: "Page " + stack_layout.currentIndex
                                }
                                implicitWidth: 200
                                implicitHeight: 200
                            }
                            Rectangle {
                                color: 'plum'
                                implicitWidth: 300
                                implicitHeight: 200
                                Label {
                                    anchors.centerIn: parent
                                    text: "Page " + stack_layout.currentIndex
                                }
                            }
                ```

                > Ribet listing nya kagok

6. In `JustALoader.qml`:

   - A usual `Item` QML Type:
    
    ```qml
    import QtQuick
    import QtQuick.Controls
    import QtQuick.Layouts
    import QtQuick.Controls.Material 2.15

    Item {
        anchors.fill: parent
    }
    ```

    Meanwhile, in `StackLayoutWin.qml`:

    ```qml
    ...
                JustALoader {
                }
            }
        }
    }
    ```

_To be continued._

> Thanks to nrbnlulu/ניר
