# Source(s)

[Qt for Python](https://doc.qt.io/qtforpython/)

[Learn Python GUI Development for Desktop – PySide6 and Qt Tutorial](https://www.youtube.com/watch?v=Z1N9JzNax2k)

# Rangkuman

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

#### From doc

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
