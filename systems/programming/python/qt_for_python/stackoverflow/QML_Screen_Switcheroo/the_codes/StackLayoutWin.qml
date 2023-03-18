import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import QtQuick.Controls.Material 2.15

Item {
    id: root
    signal returnToLogginWin
    anchors.fill: parent

    Button {
        id: return_to_StackView
        x: parent.width - width
        y: tab_bar.y
        text: "return to login page"
        onClicked: {
            root.returnToLogginWin();
        }
    }
    ColumnLayout {
        anchors.fill: parent
    }
}
