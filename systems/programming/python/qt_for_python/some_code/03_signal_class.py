from PySide6.QtCore import Qt, Signal
from PySide6.QtWidgets import QWidget

class Button(QWidget):

    clicked = Signal(Qt.MouseButton)

    "something"

    def mousePressEvent(self, event):
        self.clicked.emit(event.button())
