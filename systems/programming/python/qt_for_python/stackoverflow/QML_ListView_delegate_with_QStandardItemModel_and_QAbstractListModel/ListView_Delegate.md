# [Assign Delegates for `ListView`](https://stackoverflow.com/questions/56024135/get-delegate-objectname-from-qml-to-python)

## Table of Contents

- [Assign Delegates for `ListView`](#assign-delegates-for-listview)
  - [Table of Contents](#table-of-contents)
  - [Question by dima tronciu](#question-by-dima-tronciu)
  - [Answer](#answer)
    - [With `QStandardItemModel`](#with-qstandarditemmodel)
      - [The `main.qml`](#the-mainqml)
      - [The `main_with_QSIM.py`](#the-main_with_qsimpy)
    - [With `QAbstractListModel`](#with-qabstractlistmodel)
      - [The (same) `main.qml`](#the-same-mainqml)
      - [The Python codes](#the-python-codes)

## Question by dima tronciu

> Basically, how to delegate objects (and for loop-ing them) through ListView

## Answer

### With `QStandardItemModel`

#### The `main.qml`

```qml
import QtQuick 2.12

Rectangle{
    width: 640
    height: 480

    ListView { 
        anchors.fill: parent
        model: pathmodel
        delegate: Rectangle {
            width: 100
            height: 100
            Image {
                anchors.fill: parent
                source: Qt.resolvedUrl(model.path)
            }
        }
    }
}
```

#### The `main_with_QSIM.py`

1. Add imports:

    ```python
    from PySide6 import QtCore, QtGui, QtWidgets, QtQuickWidgets
    ```

    > Django-styled. Di gabung aja biar ga ribet satu-satu ditulis cuman jadinya ga kekontrol class/function mana aja yang udah dimasukkin. Dilema.

2. Add `PathRole` variable:

    > For user roles, it is up to the developer to decide which types to use and ensure that components use the correct types when accessing and setting data.
    Read more:
    > [Qt, ItemDataRole, UserRole (scroll down)](https://doc.qt.io/qtforpython/PySide6/QtCore/Qt.html#PySide6.QtCore.PySide6.QtCore.Qt.ItemDataRole)

    ```python
    # For user roles, it is up to the developer to decide which types to use and
    # ensure that components use the correct types when accessing and setting data.
    # https://doc.qt.io/qtforpython/PySide6/QtCore/Qt.html#PySide6.QtCore.PySide6.QtCore.Qt.ItemDataRole
    PathRole = QtCore.Qt.UserRole + 1
    ```

3. Add another imports:

    ```python
    if __name__ == "__main__":
        import os
        import sys
    ```

4. Add `QApplication` instantiation:

    ```python
        # A regular QApplication instantiation
        app = QtWidgets.QApplication(sys.argv)
    ```

5. Add `QStandardItemModel` instantiation, this is very important because this will be a container for items such as pictures (tutored in this guide), strings, etc:

    ```python
        # The QStandardItemModel instantiation, v important
        model = QtGui.QStandardItemModel()

        # What, pokoknya buat nentuin aja gitu we lah intinya mah
        model.setItemRoleNames({PathRole: b"path"})
    ```

6. A placeholder code:

    ```python
        # Let's see what PathRole contains.
        # https://doc.qt.io/qtforpython/PySide6/QtCore/Qt.html
        print(PathRole)
    ```

7. Instantiate `QQuickWidget` to show the `main.qml` and set resize mode to `SizeViewToRootObject`:

    ```python
        # Use QQuickWidget to show the main.qml
        # And also set resizeMode
        w = QtQuickWidgets.QQuickWidget(
            resizeMode=QtQuickWidgets.QQuickWidget.SizeViewToRootObject
        )

        # setContextProperty
        w.rootContext().setContextProperty("pathmodel", model)

        # Set "main.qml" from this folder as source
        filename = os.path.join(os.path.dirname(os.path.realpath(__file__)), "main.qml")
        w.setSource(QtCore.QUrl.fromLocalFile(filename))
    ```

8. Add pictures_path which points to (OS-driven) Pictures location.
   e.g.: `/home/balsemanget/Pictures/` (for Linux/Unix OS-es)

   Here's the code:

    ```python
        # Path to OS Pictures location
        # In my case, /home/balsemanget/Pictures/
        pictures_path = QtCore.QStandardPaths.writableLocation(
            QtCore.QStandardPaths.PicturesLocation
        )
    ```

9. Specified every supported image formats, such as `.png`/`.jpg`/`.gif` as a `Tuple` instantiated to `formats` variable:

    ```python
        # Specified every supported image formats (*.(png/jpg/gif)) as a Tuple instantiated to formats
        formats = (
            "*{}".format(fmt.data().decode())
            for fmt in QtGui.QImageReader.supportedImageFormats()
        )
    ```

10. Search pictures that are written with formats specified in a `Tuple` instantiated to `formats`. Then set the absolute file path and `PathRole` as a data then loop it for every pictures. Then call `appendRow` method from model which instatiate `QStandardItemModel`:

    ```python
        # Search pictures that are written with formats specified in a Tuple instantiated to formats
        # Then set the absolute file path and PathRole as a data then loop it for every pictures. Then appendRow.
        for finfo in QtCore.QDir(pictures_path).entryInfoList(formats):
            it = QtGui.QStandardItem()
            it.setData(finfo.absoluteFilePath(), PathRole)
            # Let's see what PathRole contains, again.
            print(PathRole)
            model.appendRow(it)
    ```

11. Another placeholder code:

    ```python
        # Let's see what PathRole contains, again, again.
        print(PathRole)
    ```

12. In conclusion (`PathRole`), it must be the same for all call methods in a whole set of data.

    ```python
        w.show()
        sys.exit(app.exec_())
    ```

### With `QAbstractListModel`

> More complex.
>
> Maybe I'll need it for future versions of Bless. Because there is per word translations, etc.

#### The (same) `main.qml`

> Same as [above](#the-mainqml)

#### The Python codes

> _To be added._
