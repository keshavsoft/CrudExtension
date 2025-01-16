const vscode = require('vscode');
const fs = require('fs').promises;
const path = require('path');
const fse = require('fs-extra');
const { getSelectedFolderPath } = require('./getSelectedFolderPath');

async function createFolder() {
    try {
        // Get the currently selected folder
        const selectedFolder = await getSelectedFolderPath();

        if (!selectedFolder) {
            vscode.window.showErrorMessage('Please select a folder in the Explorer view to create a folder inside it.');
            return;
        };

        const folderName = await vscode.window.showInputBox({
            prompt: 'Enter the name of the folder to create:',
        });

        if (!folderName) {
            vscode.window.showErrorMessage('Folder name was not provided.');
            return;
        };

        const newFolderPath = path.join(selectedFolder, folderName);
        const copycodeSourcePath = path.join(__dirname, '..', 'content', 'copycode');

        // Create the new folder
        await fs.mkdir(newFolderPath, { recursive: true });

        // Read the contents of the `copycode` folder
        const items = await fse.readdir(copycodeSourcePath);
        for (const item of items) {
            const sourceItemPath = path.join(copycodeSourcePath, item);
            const targetItemPath = path.join(newFolderPath, item);

            if ((await fse.lstat(sourceItemPath)).isDirectory()) {
                // Copy directory
                await fse.copy(sourceItemPath, targetItemPath);
            } else {
                // Copy file
                await fse.copyFile(sourceItemPath, targetItemPath);
            }
        };

        vscode.window.showInformationMessage(`Folder created successfully: ${newFolderPath}`);
        vscode.window.showInformationMessage(`Contents of 'copycode' copied successfully into: ${newFolderPath}`);
    } catch (err) {
        vscode.window.showErrorMessage(`Error: ${err.message}`);
    };
};

module.exports = { createFolder };
