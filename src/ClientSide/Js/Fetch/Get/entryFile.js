const vscode = require('vscode');
// const fs = require('fs').promises;
const path = require('path');
const fse = require('fs-extra');
const { getSelectedFolderPath } = require('../../../../CommonFuncs/getSelectedFolderPath');
const CommonCopyCodeSourcePath = path.join(__dirname, "..", '..', "..", "..", "..", 'content', "ClientSide", "Js", "Fetch", 'Get');

const StartFunc = async () => {
    try {
        const selectedFolder = await getSelectedFolderPath();

        if (!selectedFolder) throw new Error('No folder selected, and no active file found in the workspace.');

        const folderName = await vscode.window.showInputBox({ prompt: 'Enter the name of the folder to create:' });

        if (!folderName) throw new Error('Folder name was not provided.');

        const newFolderPath = path.join(selectedFolder, folderName);

        // await fs.mkdir(newFolderPath, { recursive: true });

        await fse.copy(CommonCopyCodeSourcePath, newFolderPath);

        vscode.window.showInformationMessage(`Folder created and contents copied to: ${newFolderPath}`);
    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
    };
};

module.exports = { StartFunc };
