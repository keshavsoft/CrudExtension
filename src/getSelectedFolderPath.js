const vscode = require('vscode');
const fse = require('fs-extra');

const isValidFolder = async (folder) =>
    folder && (await fse.pathExists(folder)) && (await fse.lstat(folder)).isDirectory();

const getSelectedFolderPath = async () => {
    try {
        // Check if a folder is selected in the Explorer view.
        const selectedFolder = await vscode.commands
            .executeCommand('copyFilePath')
            .then(isValidFolder);

        // Check the folder of the currently active file in the editor.
        const activeFileFolder = vscode.window.activeTextEditor?.document.uri.fsPath &&
            require('path').dirname(vscode.window.activeTextEditor.document.uri.fsPath);

        // Return the selected folder or the active file's folder if valid, otherwise null.
        return selectedFolder || (await isValidFolder(activeFileFolder) ? activeFileFolder : null);
    } catch (err) {
        vscode.window.showErrorMessage(`Error retrieving folder: ${err.message}`);
        return null;
    }
};

module.exports = { getSelectedFolderPath };
