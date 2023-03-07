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

    TextField{ // https://doc.qt.io/qt-5/qml-qtquick-controls-textfield.html
        id: usernameField
        width: 300
        text: qsTr("")
        selectByMouse: true // This property determines if the user can select the text with the mouse.
        placeholderText: qsTr("Your username or email") // This property contains the text that is shown in the text field when the text field is empty.
        verticalAlignment: Text.AlignVCenter
        anchors.horizontalCenter: parent.horizontalCenter
        anchors.top: image.bottom
        anchors.topMargin: 60
    }

    TextField{ // https://doc.qt.io/qt-5/qml-qtquick-controls-textfield.html
        id: passwordField
        width: 300
        text: qsTr("")
        selectByMouse: true
        placeholderText: qsTr("Your password")
        verticalAlignment: Text.AlignVCenter
        anchors.horizontalCenter: parent.horizontalCenter
        anchors.top: usernameField.bottom
        anchors.topMargin: 10
        echoMode: TextInput.Password // Specifies how the text should be displayed in the TextField.
        // The possible modes are:
        //     TextInput.Normal - Displays the text as it is. (Default)
        //     TextInput.Password - Displays asterisks instead of characters.
        //     TextInput.NoEcho - Displays nothing.
        //     TextInput.PasswordEchoOnEdit - Displays characters as they are entered while editing, otherwise displays asterisks.
    }
}
