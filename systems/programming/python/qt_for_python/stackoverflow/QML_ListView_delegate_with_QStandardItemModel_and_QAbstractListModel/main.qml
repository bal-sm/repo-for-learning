import QtQuick 2.12

Rectangle{
    width: 640
    height: 480

    ListView { 
        anchors.fill: parent
        model: pathmodel
        delegate: Rectangle {
            width: 100
            height: 100
            Image {
                anchors.fill: parent
                source: Qt.resolvedUrl(model.path)
            }
        }
    }
}
