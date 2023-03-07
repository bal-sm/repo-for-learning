import QtQuick
import QtQuick.Window
import QtQuick.Controls
import QtQuick.Controls.Material

ApplicationWindow{
    id: window
    width: 400
    height: 500
    visible: true
    title: qsTr("Login Page") // Use qsTr() for all Literal User Interface Strings -> https://doc.qt.io/qt-6/qtquick-internationalization.html

    // should've been disabled maximize button cenah, but on my end don't, maybe KDE thing
    flags: Qt.WindowCloseButtonHint | Qt.WindowMinimizeButtonHint | Qt.CustomizeWindowHint | Qt.Dialog | Qt.WindowTitleHint

    Material.theme: Material.Dark
    Material.accent: Material.LightBlue

    // Top bar
    Rectangle{
        id: topBar // camelCase
        height: 40
        color: Material.color(Material.Blue)
        anchors{
            left: parent.left // parent teh window nya
            right: parent.right
            top: parent.top
            margins: 10
        }
        radius: 10

        Text{
            text: qsTr("LOGIN PAGE")
            anchors.verticalCenter: parent.verticalCenter
            horizontalAlignment: Text.AlignHCenter
            verticalAlignment: Text.AlignVCenter
            color: "#ffffff"
            anchors.horizontalCenter: parent.horizontalCenter
            font.pointSize: 12
        }
    }

    Image{
        id: image
        source: "../images/Qt_logo_2016.svg" // a good idea to use qrc than this
        width: 175
        height: 126

        anchors.horizontalCenter: parent.horizontalCenter
        anchors.top: topBar.bottom // id-nya Rectangle tea
        anchors.topMargin: 60
    }
