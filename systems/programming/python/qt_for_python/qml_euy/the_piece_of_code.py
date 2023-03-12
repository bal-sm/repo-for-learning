import sys
import os

from PySide6.QtGui import QGuiApplication
from PySide6.QtQml import QQmlApplicationEngine

# Kalau di run nya lewat file ini langsung
if __name__ == "__main__":
    # maka jalanin kode-kode di bawah ini
    # to start the app
    app = QGuiApplication(sys.argv)
    # QML app engine
    engine = QQmlApplicationEngine()
    # Load .qml file
    engine.load(os.path.join(os.path.dirname(__file__), "qml/main.qml"))

    # Check if not valid then
    if not engine.rootObjects():
        sys.exit(-1)
    # sys.exit(app.exec_())
    # .../the_piece_of_code.py:20: DeprecationWarning: 'exec_' will be removed in the future. Use 'exec' instead.
    sys.exit(app.exec())
