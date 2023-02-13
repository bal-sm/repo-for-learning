from PySide6.QtCore import Qt, Signal, QUrl, QDate
from PySide6.QtWidgets import QWidget

class Button(QWidget):

    clicked = Signal(Qt.MouseButton)

    "something"

    def mousePressEvent(self, event):
        self.clicked.emit(event.button())

signal1 = Signal(int)  # Python types
signal2 = Signal(QUrl)  # Qt Types
signal3 = Signal(int, str, int)  # more than one type
signal4 = Signal((float,), (QDate,))  # optional types
