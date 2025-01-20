// src/configFile.js
const vscode = require('vscode');
const path = require('path');
const fse = require('fs-extra');
const { getSelectedFolderPath } = require('./CommonFuncs/getSelectedFolderPath');
const CommonCopyCodeSourcePath = path.join(__dirname, '..', 'content', "ClientSide", "Js", "Fetch", 'Post');

const ConfigFunc = async () => {
    try {
        const selectedFolder = await getSelectedFolderPath();

        if (!selectedFolder) {
            throw new Error('No folder selected, and no active file found in the workspace.');
        }

        const folderName = await vscode.window.showInputBox({ prompt: 'Enter the name of the folder to create:' });
        
        if (!folderName) {
            throw new Error('Folder name was not provided.');
        }

        const newFolderPath = path.join(selectedFolder, folderName);
        const configFilePath = path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, 'config.json');

        // Check if config.json exists in the user's workspace
        if (!(await fse.pathExists(configFilePath))) {
            throw new Error('config.json file not found in the workspace.');
        }

        // Create the target folder
        await fse.ensureDir(newFolderPath);

        // Copy the extension's internal files
        await fse.copy(CommonCopyCodeSourcePath, newFolderPath);

        // Copy the user's config.json file to the new folder
        const targetConfigPath = path.join(newFolderPath, 'config.json');
        await fse.copy(configFilePath, targetConfigPath);

        vscode.window.showInformationMessage(`Folder created and contents copied to: ${newFolderPath}`);
    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
    }
};

module.exports = { ConfigFunc };
