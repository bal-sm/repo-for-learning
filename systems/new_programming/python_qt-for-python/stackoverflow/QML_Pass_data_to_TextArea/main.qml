import QtQuick 
import QtQuick.Window
import QtQuick.Controls 

Window {
    id: mainWindow
    visible: true

    TextArea{
         id: textArea
         anchors.fill: parent
         text: helper.text
    }
}
