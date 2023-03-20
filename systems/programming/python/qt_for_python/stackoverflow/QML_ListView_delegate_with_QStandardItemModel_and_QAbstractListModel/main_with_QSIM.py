from PySide6 import QtCore, QtGui, QtWidgets, QtQuickWidgets

# For user roles, it is up to the developer to decide which types to use and
# ensure that components use the correct types when accessing and setting data.
# https://doc.qt.io/qtforpython/PySide6/QtCore/Qt.html#PySide6.QtCore.PySide6.QtCore.Qt.ItemDataRole
PathRole = QtCore.Qt.UserRole + 1

if __name__ == "__main__":
    import os
    import sys

    # A regular QApplication instantiation
    app = QtWidgets.QApplication(sys.argv)

    # The QStandardItemModel instantiation, v important
    model = QtGui.QStandardItemModel()

    # What, pokoknya buat nentuin aja gitu we lah intinya mah
    model.setItemRoleNames({PathRole: b"path"})

    # Let's see what PathRole contains.
    # https://doc.qt.io/qtforpython/PySide6/QtCore/Qt.html
    print(PathRole)

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

    # Path to OS Pictures location
    # In my case, /home/balsemanget/Pictures/
    pictures_path = QtCore.QStandardPaths.writableLocation(
        QtCore.QStandardPaths.PicturesLocation
    )

    # Specified every supported image formats (*.(png/jpg/gif)) as a Tuple instantiated to formats
    formats = (
        "*{}".format(fmt.data().decode())
        for fmt in QtGui.QImageReader.supportedImageFormats()
    )

    # Search pictures that are written with formats specified in a Tuple instantiated to formats
    # Then set the absolute file path and PathRole as a data then loop it for every pictures. Then appendRow.
    for finfo in QtCore.QDir(pictures_path).entryInfoList(formats):
        it = QtGui.QStandardItem()
        it.setData(finfo.absoluteFilePath(), PathRole)
        # Let's see what PathRole contains, again.
        print(PathRole)
        model.appendRow(it)

    # Let's see what PathRole contains, again, again.
    print(PathRole)

    # In conclusion (For PathRole), it must be the same for call methods in a whole set of data.

    w.show()
    sys.exit(app.exec_())
