import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import QtQuick.Controls.Material 2.15

Item {
    anchors.fill: parent
    ColumnLayout {
        anchors.fill: parent
        Row {
            Button {
                Layout.fillWidth: true
                text: " To cyan rect"
                onClicked: {
                    loader_.sourceComponent = cyan_rect;
                }
            }
            Button {
                Layout.fillWidth: true
                text: " To red rect"
                onClicked: {
                    loader_.sourceComponent = red_rect;
                }
            }
        }
    }
}
