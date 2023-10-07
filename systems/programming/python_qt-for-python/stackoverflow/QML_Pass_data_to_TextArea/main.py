import os
import sys

from PySide6.QtCore import QObject, Signal, Property, QUrl
from PySide6.QtGui import QGuiApplication
from PySide6.QtQml import QQmlApplicationEngine


class Helper(QObject):
    textChanged = Signal()

    def __init__(self, parent=None):
        QObject.__init__(self, parent)
        self._text = ""

    @Property(str, notify=textChanged)
    def text(self):
        return self._text

    @text.setter
    def text(self, v):
        if self._text == v:
            return
        self._text = v
        self.textChanged.emit()

    def send_file(self, file_content):
        self.text = file_content


if __name__ == "__main__":
    app = QGuiApplication(sys.argv)

    engine = QQmlApplicationEngine()
    helper = Helper()
    engine.rootContext().setContextProperty("helper", helper)
    engine.load(os.path.join(os.path.dirname(__file__), "main.qml"))
    # engine.load(QUrl.fromLocalFile("main.qml"))
    if not engine.rootObjects():
        sys.exit(-1)

    helper.send_file(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare magna felis. Nulla justo ipsum, finibus eu nibh quis, iaculis malesuada lorem. Phasellus et lacus malesuada, aliquam enim condimentum, efficitur sapien. Sed ultricies egestas massa, nec sodales neque mattis et. Praesent euismod pretium hendrerit. Maecenas non porttitor velit, non scelerisque quam. Phasellus at diam vel enim venenatis vulputate sed a nisl. Sed erat nunc, maximus varius justo vitae, vehicula porttitor enim. Maecenas vitae sem odio. Nunc interdum sapien vitae magna tempus, nec laoreet elit placerat. Nullam cursus metus facilisis pulvinar auctor."
    )
    sys.exit(app.exec_())
