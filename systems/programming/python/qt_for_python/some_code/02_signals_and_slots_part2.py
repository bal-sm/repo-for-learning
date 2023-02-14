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
