const vscode = require('vscode');
const fs = require('fs').promises;
const path = require('path');
const fse = require('fs-extra');
const { getSelectedFolderPath } = require('./getSelectedFolderPath');

async function createFolder() {
    try {
        const selectedFolder = await getSelectedFolderPath();

        if (!selectedFolder) throw new Error('No folder selected, and no active file found in the workspace.');

        const folderName = await vscode.window.showInputBox({ prompt: 'Enter the name of the folder to create:' });
        
        if (!folderName) throw new Error('Folder name was not provided.');

        const newFolderPath = path.join(selectedFolder, folderName);
        const copycodeSourcePath = path.join(__dirname, '..', 'content', 'copycode');

        await fs.mkdir(newFolderPath, { recursive: true });

        // Using fse.copy to copy everything from source to destination in one line
        await fse.copy(copycodeSourcePath, newFolderPath);

        vscode.window.showInformationMessage(`Folder created and contents copied to: ${newFolderPath}`);
    } catch (err) {
        vscode.window.showErrorMessage(`Error: ${err.message}`);
    };
};

module.exports = { createFolder };
