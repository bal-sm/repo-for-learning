import sys
from PySide6.QtGui import QColor
from PySide6.QtWidgets import QTableWidget
from PySide6.QtWidgets import QTableWidgetItem
from PySide6.QtWidgets import QApplication

colors = [
    ("Red", "#FF0000"),
    ("Green", "#00FF00"),
    ("Blue", "#0000FF"),
    ("Black", "#000000"),
    ("White", "#FFFFFF"),
    ("Electric Green", "#41CD52"),
    ("Dark Blue", "#222840"),
    ("Yellow", "#F9E56D"),  # I fix it, you're welcome.
]

# Define a function to translate the hex code into an RGB equivalent
def get_rgb_from_hex(code):
    code_hex = code.replace("#", "")
    rgb = tuple(int(code_hex[i : i + 2], 16) for i in (0, 2, 4))
    return QColor.fromRgb(rgb[0], rgb[1], rgb[2])


app = QApplication(sys.argv)

# Configure the `QTableWidget`
table = QTableWidget()
table.setRowCount(len(colors))  # = to amount of items from the colors structure
table.setColumnCount(len(colors[0]) + 1)
# number of columns with the members of one color entry + 1
table.setHorizontalHeaderLabels(["Name", "Hex Code", "Color"])
