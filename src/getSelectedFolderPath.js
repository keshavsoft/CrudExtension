// src/getSelectedFolderPath.js
const vscode = require('vscode');
const fse = require('fs-extra');

const LocalFuncForFolder = async () => {
    // Try to get the currently selected folder in Explorer
    const selectedResources = await vscode.commands.executeCommand('copyFilePath');
    const clipboardText = await vscode.env.clipboard.readText();

    if (clipboardText && (await fse.pathExists(clipboardText)) && (await fse.lstat(clipboardText)).isDirectory()) {
        return clipboardText;
    };
    return null;
};

const LocalFuncForFile = async () => {
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

async function getSelectedFolderPath1() {
    try {
        // Try to get the currently selected folder in Explorer
        const selectedResources = await vscode.commands.executeCommand('copyFilePath');
        const clipboardText = await vscode.env.clipboard.readText();

        if (clipboardText && (await fse.pathExists(clipboardText)) && (await fse.lstat(clipboardText)).isDirectory()) {
            return clipboardText;
        }

        // If no folder is selected, fall back to the active file's folder
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor) {
            const activeFilePath = activeEditor.document.uri.fsPath;
            const activeFileFolderPath = require('path').dirname(activeFilePath);

            if (await fse.pathExists(activeFileFolderPath)) {
                return activeFileFolderPath;
            }
        };

        // If no folder or active file is found, return null
        return null;
    } catch (err) {
        vscode.window.showErrorMessage(`Error retrieving folder: ${err.message}`);
        return null;
    };
};

async function getSelectedFolderPath() {
    try {
        // Try to get the currently selected folder in Explorer
        const clipboardText = await LocalFuncForFolder();
        const activeEditor = await LocalFuncForFile();

        return (clipboardText === null ? activeEditor : clipboardText);
    } catch (err) {
        vscode.window.showErrorMessage(`Error retrieving folder: ${err.message}`);
        return null;
    };
};

module.exports = { getSelectedFolderPath };
// main code
