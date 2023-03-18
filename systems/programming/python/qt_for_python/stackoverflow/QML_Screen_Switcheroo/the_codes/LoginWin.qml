import QtQuick
import QtQuick.Controls
import QtQuick.Controls.Material 2.15

Item {
    id: root
    anchors.fill: parent
    signal loggedIn
    
    TextArea {
        id: input_
        placeholderText: "Enter password"
        anchors.centerIn: parent
    }
}
