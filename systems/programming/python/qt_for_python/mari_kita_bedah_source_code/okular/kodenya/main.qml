/*
    SPDX-FileCopyrightText: 2012 Marco Martin <mart@kde.org>

    SPDX-License-Identifier: GPL-2.0-or-later
*/

// import QtQuick kayak biasa, engga ketang ini pake as
import QtQuick 2.15
import QtQuick.Controls 2.15 as QQC2
import QtQuick.Dialogs 1.3 as QQD

// custom code berarti bisa bikin code sendiri, cuman MANA DOCS buat Qt for Python
import org.kde.okular 2.0 as Okular
import org.kde.kirigami 2.17 as Kirigami
import org.kde.okular.app 2.0

// tuh contohnya dari Kirigami.ApplicationWindow katanya 
// tapi kenapa ya pake custom code gitu ga dari ApplicationWindow biasa
Kirigami.ApplicationWindow {
    id: fileBrowserRoot
    
    // Property declarations
    readonly property int columnWidth: Kirigami.Units.gridUnit * 13

    // Attached properties and signal handlers
    wideScreen: width > columnWidth * 5
    visible: true

    globalDrawer: Kirigami.GlobalDrawer {
        title: i18n("Okular")
        titleIcon: "okular"
        drawerOpen: false
        isMenu: true

        QQD.FileDialog {
            id: fileDialog
            nameFilters: Okular.Okular.nameFilters
            folder: "file://" + userPaths.documents
            onAccepted: {
                documentItem.url = fileDialog.fileUrl
            }
        }

        actions: [
            Kirigami.Action {
                id: openDocumentAction
                text: i18n("Open...")
                icon.name: "document-open"
                onTriggered: {
                    fileDialog.open()
                }
            },
            Kirigami.Action {
                text: i18n("About")
                icon.name: "help-about-symbolic"
                onTriggered: fileBrowserRoot.pageStack.layers.push(aboutPage);
                enabled: fileBrowserRoot.pageStack.layers.depth === 1
            }
        ]
    }
    contextDrawer: OkularDrawer {
        width: columnWidth
        contentItem.implicitWidth: columnWidth
        modal: !fileBrowserRoot.wideScreen
        onModalChanged: drawerOpen = !modal
        onEnabledChanged: drawerOpen = enabled && !modal
        enabled: documentItem.opened && pageStack.layers.depth < 2
        handleVisible: enabled && pageStack.layers.depth < 2
    }

    title: documentItem.windowTitleForDocument ? documentItem.windowTitleForDocument : i18n("Okular")
    Okular.DocumentItem {
        id: documentItem
        onUrlChanged: { currentPage = 0 }

        onNeedsPasswordChanged: {
            if (needsPassword) {
                passwordDialog.open();
            }
        }
    }

    pageStack.initialPage: MainView {
        id: pageArea
        document: documentItem
        Kirigami.ColumnView.preventStealing: true
    }

    Component {
        id: aboutPage
        Kirigami.AboutPage {
            aboutData: about
        }
    }

    //FIXME: this is due to global vars being binded after the parse is done, do the 2 steps parsing
    Timer {
        interval: 100
        running: true
        onTriggered: {
            if (uri) {
                documentItem.url = uri
            }
        }
    }

// tuh jadinya rapih kan dipanggil dulu gitu loh QQC2 nya baru Dialog
    QQC2.Dialog {
        id: passwordDialog
        focus: true
        anchors.centerIn: parent
        title: i18n("Password Needed")
        contentItem: Kirigami.PasswordField {
            id: pwdField
            onAccepted: passwordDialog.accept();
            focus: true
        }
        standardButtons: QQC2.Dialog.Ok | QQC2.Dialog.Cancel

        onAccepted: documentItem.setPassword(pwdField.text);
        onRejected: documentItem.url = "";
    }
}
