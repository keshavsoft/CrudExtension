const vscode = require('vscode');
const fse = require('fs-extra');

const StartFunc = async () => {
    // If no folder is selected, fall back to the active file's folder
    const activeEditor = vscode.window.activeTextEditor;

    if (activeEditor) {
        const activeFilePath = activeEditor.document.uri.fsPath;
        const activeFileFolderPath = require('path').dirname(activeFilePath);

        if (await fse.pathExists(activeFileFolderPath)) {
            return activeFileFolderPath;
        };
    };

    // If no folder or active file is found, return null
    return null;
};

module.exports = { StartFunc };
