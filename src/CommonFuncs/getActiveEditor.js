const vscode = require('vscode');

const FuncGetPath = async () => {
    // If no folder is selected, fall back to the active file's folder
    const activeEditor = vscode.window.activeTextEditor;

    if (activeEditor) {
        const activeFilePath = activeEditor.document.uri.fsPath;

        return activeFilePath;
    };

    // If no folder or active file is found, return null
    return null;
};

module.exports = { FuncGetPath };
