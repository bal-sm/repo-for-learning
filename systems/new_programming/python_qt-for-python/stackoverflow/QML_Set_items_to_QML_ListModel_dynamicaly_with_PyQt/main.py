import sys

from PySide6.QtCore import QUrl, QMetaObject, Q_ARG, QTimer, QDate, QMetaType
from PySide6.QtQuickWidgets import QQuickWidget
from PySide6.QtWidgets import QApplication

counter = 0


def onTimeout(obj):
    global counter  # make the variable scope is global
    value = {
        "lesson": str(counter),
        "subject": "PE",
        "day": QDate.fromString(str(1 + counter % 7), "dddd"),
    }
    QMetaObject.invokeMethod(obj, "append", Q_ARG(QMetaType.QStringList, value))
    # QMetaObject.invokeMethod(obj, "append", value)
    # RuntimeError: qArgDataFromPyType: Parameter should be a type or type string.
    counter += 1


if __name__ == "__main__":
    app = QApplication(sys.argv)
    w = QQuickWidget()
    w.setSource(QUrl("main.qml"))
    timer = QTimer()
    timer.timeout.connect(lambda: onTimeout(w.rootObject()))
    timer.start(1000)
    w.show()
    sys.exit(app.exec_())
