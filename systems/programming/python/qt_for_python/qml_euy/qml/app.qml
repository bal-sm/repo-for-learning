import QtQuick
import QtQuick.Window
import QtQuick.Controls
import QtQuick.Controls.Material

ApplicationWindow{
    id: window
    width: 760
    height: 500
    visible: true
    title: qsTr("The app home")

    Material.theme: Material.Dark
    Material.accent: Material.LightBlue
}
