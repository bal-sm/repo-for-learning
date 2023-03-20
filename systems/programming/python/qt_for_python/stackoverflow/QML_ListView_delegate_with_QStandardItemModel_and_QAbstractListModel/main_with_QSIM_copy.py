from PySide6 import QtCore, QtGui, QtWidgets, QtQuickWidgets

PathRole = QtCore.Qt.UserRole + 1

if __name__ == "__main__":
    import os
    import sys

    app = QtWidgets.QApplication(sys.argv)

    model = QtGui.QStandardItemModel()

    model.setItemRoleNames({PathRole: b"path"})

    w = QtQuickWidgets.QQuickWidget(
        resizeMode=QtQuickWidgets.QQuickWidget.SizeViewToRootObject
    )

    w.rootContext().setContextProperty("pathmodel", model)

    filename = os.path.join(os.path.dirname(os.path.realpath(__file__)), "main.qml")
    w.setSource(QtCore.QUrl.fromLocalFile(filename))

    # Path to something new, such as:
    # systems/programming/python/qt_for_python/qt_for_python_from_official_docs/07_styling_widget_app
    pictures_path = "../../qt_for_python_from_official_docs/07_styling_widget_app"

    formats = (
        "*{}".format(fmt.data().decode())
        for fmt in QtGui.QImageReader.supportedImageFormats()
    )

    for finfo in QtCore.QDir(pictures_path).entryInfoList(formats):
        it = QtGui.QStandardItem()
        it.setData(finfo.absoluteFilePath(), PathRole)
        model.appendRow(it)

    w.show()
    sys.exit(app.exec_())
