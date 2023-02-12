# Qt for Python

## QT/QML

### From doc

These modules has a specific functionality, and among this modules, there is one called QtDeclarative, in which you can find the implementation of the QML declarative language. This language is similar to CSS and JSON, and it was created to design UI applications declaratively, allowing JavaScript to take care of some imperative sections, and enabling other components to extend and connect the code with C++.

The elements that you can find in QML/Quick applications are focused on providing a more dynamic application infrastructure which different properties based in certain behaviors.
Even though QML has the motivation to provide interfaces with mobile devices, you can use it for Desktop applications, too.

> udah QML aja berarti

### From Wikipedia

Qt Quick is used for mobile applications where touch input, fluid animations and user experience are crucial. QML is also used with Qt3D to describe a 3D scene and a "frame graph" rendering methodology.

A QML document describes a hierarchical object tree.

QML modules shipped with Qt include primitive graphical building blocks (e.g., Rectangle, Image), modeling components (e.g., FolderListModel, XmlListModel), behavioral components (e.g., TapHandler, DragHandler, State, Transition, Animation), and more complex controls (e.g., Button, Slider, Drawer, Menu).

These elements can be combined to build components ranging in complexity from simple buttons and sliders, to complete internet-enabled programs.

QML elements can be augmented by standard JavaScript both inline and via included .js files. Elements can also be seamlessly integrated and extended by C++ components using the Qt framework.

> Why python hasn't been developed for mobile apps? I will do it then

## File Types

There are many different file types that you will encounter while developing Qt for Python applications, ui, qrc, qml, pyproject, etc. Here you can find a simple explanation for each of them.

### .py

main file is .py

It is important to note that you can write applications only with Python files, without the need of .ui, .qrc, or .qml files, however using other formats will facilitate some processes, and enable new functionality to your applications.

> enable new functionality (kayaknya buat tajwid nya) (.ui, .qrc, or .qml)

### .ui

User Interface Definition File .ui

The pyside6-uic tool generates Python code from these .ui files, which you can import from your main files, so it is not necessary for you to include the .ui files in your deployed application.

> BASICALLY ada compiler buat .ui jadi .py file

### .qrc

List of binary files (XML file)

```html
<!DOCTYPE RCC><RCC version="1.0">
<qresource>
    <file>images/quit.png</file>
    <file>font/myfont.ttf</file>
</qresource>
</RCC>
```

pyside6-rcc tool generates Python code from these .qrc files. compiler, so qrc file doesn't to be in deployed app

> asyik

### .qml

Qt Modeling Language File

Graphical QML applications  (=/=) are not related to  Qt Widgets applications

usual setup of QML project is a Python file that loads the QML file

and optionally, elements defined in Python that are exposed to QML to be used.

QML Designer that is embedded in Qt Creator. (to write .qml file)

> Qml tools

there are commercial tools like Qt Design Studio that allow you to load designs from other design applications.

## Distributing Your Application to Other Systems/Platforms

The deployment process for Python applications is called, “freezing”, which is distributing your virtual environment content to other users.

> is it necessary to use poetry hook for exporting `requirements.txt`?

### Reproducible deployment

A common approach is to only provide a `requirements.txt` file,

### Freezing Your Application

This is the most common approach to distribute their applications and even though the code is still available for the end user, it is a bit more difficult to retrieve it.

### Compiling Python

Even though Python does not natively support to be compiled,

there are complementary tools that let you to achieve this.

You can check the Nuitka project to learn more.

> for what though?

## Why Qt for Python?

### Lowering the Qt Barrier

_Veteran C++ developers will have no problem with setting up a Qt application from scratch, or even manage to understand a different code base written with Qt. In addition, many teams are multidisciplinary, and other project/company developers might not be fluent in C++._

_Python has been luring people into programming, and for the same reason it’s not uncommon that even people with a different background are able to write code, meaning that different teams are enabled to speak “the same language”._

Creating Qt applications in Python requires only a few lines of code,

and not much configuration is required to execute it.

Some Python code example of a simple hello world application:

```python
import sys
from pyside6.QtWidgets import (QApplication, QMainWindow,
                               QPushButton)

class MainWindow(QMainWindow):
    def __init__(self, parent=None):
        QMainWindow.__init__(self, parent)
        self.button = QPushButton("My Button", self)
        self.button.clicked.connect(self.handleButton)

    def handleButton(self):
        self.button.setText("Ready")

if __name__ == "__main__":
    app = QApplication([])
    mainWindow = MainWindow()
    mainWindow.show()
    sys.exit(app.exec())
```

It’s fair to say that most of the boilerplate code is provided by many good IDEs, like QtCreator, but using external tools certainly requires some practice to use them and get familiarized.

> That is informative.

### Shiboken

Together with the bindings, Qt for Python provides our binding generator, Shiboken

_Generating bindings between two languages it nothing new, but it has always been a non-trivial task, mainly for being as-compatible-as-possible when using external modules/libraries in your project._

Shiboken’s main use case is to extend Qt/C++ project’s functionality, making them scriptable.

What does it mean for an application to be scriptable?

- enables a interpreted language to interact directly with the Qt/C++ application,

- provide the option to modify and create components/elements of the application from Python,

- possibility to create a plugins/add-ons system for the application.

- complement a process with external Python functionality.

Shiboken excels at Qt-dependent binding generation, meaning that any Qt/C++ project can be easily exposed to Python.

_In addition, Shiboken has proven its support for C++ projects (without Qt), as shown on event talks and blog posts._

_Adding Python support to well known solutions/projects is a pattern we keep seeing in the industry, on a broad range of devices. This is why we are working every day to improve the Qt for Python offering._

We believe both Qt and Python will benefit from this interaction.

> Wow, my power

## Your First QtWidgets Application

A hello world app in PySide6:

```html
import sys
from PySide6.QtWidgets import QApplication, QLabel

app = QApplication(sys.argv)
label = QLabel("Hello World!")
label.show()
app.exec()
```

For a widget application using PySide6, you must start by importing _the appropriate_ class from the `PySide6.QtWidgets` module.

After the imports, you create a `QApplication` instance.

_As Qt can receive arguments from command line, you may pass any argument to the QApplication object._

_Usually, you don’t need to pass any arguments so you can leave it as is,_

or use the following approach:

```python
app = QApplication([])
```

After the creation of the application object, we have created a `QLabel` object.

A `QLabel` is a widget that can present text (simple or rich, like html), and images:

```python
# This HTML approach will be valid too!
label = QLabel("&lt;font color=red size=40&gt;Hello World!&lt;/font&gt;")
```

Note:
> After creating the label, we call `show()` on it.

Finally, we call `app.exec()` to enter the Qt main loop and start to execute the Qt code.

In reality, it is only here where the label is shown, but this can be ignored for now.

## Signals and Slots (handling) / Using a Simple Button

How to handle Signals and Slots

- Signals and slots is a Qt feature:
  - lets your graphical widgets communicate with:
    - other graphical widgets
    - your python code.
- Button that logs, when clicked:
  
    > Button clicked, Hello!_

    The code:

    ```python
    # Importing necessary PySide6 classes and python sys module
    import sys
    from PySide6.QtWidgets import QApplication, QPushButton
    from PySide6.QtCore import Slot
    
    # Logs the message 
    @Slot()
    def say_hello():
        print("Button clicked, hello!")
    # > The @Slot() is a decorator that identifies a function as a slot. It is not important to understand why for now, but use it always to avoid unexpected behavior.

    # Create the Qt Application
    app = QApplication(sys.argv)

    # Create a button
    button = QPushButton("Click me")

    # Before we show the button, we must connect it to the say_hello() function that we defined earlier.
    # New style, more pythonic.
    button.clicked.connect(say_hello)

    # Show the button
    button.show()
    # Run the main Qt loop
    app.exec()
    ```

## Signals and Slots (comprehensive)

- Qt thing, `QObject`s (_`QApplication, QMainWindow, QPushButton,` etc_) require a way to communicate
  - That’s the reason for this mechanism to be a central feature of Qt.

- Signal and Slots is similar with lights interaction:
  - _Move_ the light switch (_signal_).
  - The result: light bulbs are switched _on/off_ (_slot_).

Note:
> If you have experience with other frameworks or toolkits, it’s likely that you read a concept called ‘callback’. Leaving the implementation details aside, _a callback will be related to a notification function, passing a pointer to a function in case it’s required due to the events that happen in your program._ This approach might sound similar, but there are essential differences that make it an _unintuitive approach_, like _ensuring the type correctness of callback arguments, and some others_.

- All classes that inherit from `QObject` or _one of its subclasses_, like `QWidget` can contain _signals and slots_.
  - **Signals** are emitted by objects, when _they change their state_ in a way _that may be interesting to other objects._
  - This is all the object does to communicate.

  - **Slots** can be used for receiving signals.
  - A slot does not know if it has any signals connected to it.

  - You can connect _as many signals as you want to a single slot_, and _a signal can be connected to as many slots_ as you need.
  
  - Qt’s widgets have many predefined signals and slots, e.g.:
    - `QAbstractButton` (_base class of buttons in Qt_) has a `clicked()` signal
    - `QLineEdit` (_single line input field_) has a slot named `clear()`.

So, a text input field with a button to clear the text could be implemented by:
Placing a `QToolButton` to the right of the `QLineEdit` and connecting its `clicked()` signal to the slot `clear()`. This is done using the `connect()` method of the signal:

```python
# signals_and_slots_part2.py
# Importing necessary PySide6 classes and python sys module
import sys
from PySide6.QtWidgets import QApplication, QToolButton, QLineEdit
from PySide6.QtCore import Slot

# Create the Qt Application
app = QApplication(sys.argv)

button = QToolButton()
line_edit = QLineEdit()
line_edit.show()
button.clicked.connect(line_edit.clear)

# Show the button
button.show()
# Run the main Qt loop
app.exec()
```

`connect()` returns a `QMetaObject.Connection` object, which can be used with the `disconnect()` method to sever the connection.

## Source(s)

[Qt for Python](https://doc.qt.io/qtforpython/)

[Learn Python GUI Development for Desktop – PySide6 and Qt Tutorial](https://www.youtube.com/watch?v=Z1N9JzNax2k)
