# Importing necessary PySide6 classes and python sys module
import sys
from PySide6.QtWidgets import QApplication, QPushButton
from PySide6.QtCore import Slot

# Logs the message
@Slot()
def say_hello():
    print("Pick me please, after you come home")
# > The @Slot() is a decorator that identifies a function as a slot. It is not important to understand why for now, but use it always to avoid unexpected behavior.

# Create the Qt Application
app = QApplication(sys.argv)

# Create a button
button = QPushButton("Pick me")

# Before we show the button, we must connect it to the say_hello() function that we defined earlier.
# New style, more pythonic.
button.clicked.connect(say_hello)

# Show the button
button.show()
# Run the main Qt loop
app.exec()
