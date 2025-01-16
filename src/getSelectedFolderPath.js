// src/getSelectedFolderPath.js
const vscode = require('vscode');
const fse = require('fs-extra');

/**
 * Utility function to get the currently selected folder in Explorer
 */
async function getSelectedFolderPath() {
    try {
        const selectedResources = await vscode.commands.executeCommand('copyFilePath');

        // This command copies the selected file/folder paths into the clipboard
        const clipboardText = await vscode.env.clipboard.readText();

        if (clipboardText && (await fse.pathExists(clipboardText)) && (await fse.lstat(clipboardText)).isDirectory()) {
            return clipboardText;
        }

        return null;
    } catch (err) {
        vscode.window.showErrorMessage(`Error retrieving selected folder: ${err.message}`);
        return null;
    }
}

module.exports = { getSelectedFolderPath };
