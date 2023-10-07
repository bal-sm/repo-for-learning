import sys

from pathlib import Path

from PySide6.QtCore import QUrl
from PySide6.QtWidgets import QApplication
from PySide6.QtQuick import QQuickView

if __name__ == "__main__":
    app = QApplication()
    view = QQuickView()

    qml_file = QUrl(str(Path(__file__).parent / "view.qml"))

    # view.setSource("view.qml")
    view.setSource(qml_file)
    view.show()
    sys.exit(app.exec())
