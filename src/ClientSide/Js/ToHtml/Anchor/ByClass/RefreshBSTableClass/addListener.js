const vscode = require('vscode');
// const fs = require('fs').promises;
const path = require('path');
const fse = require('fs-extra');
const { getSelectedFolderPath } = require('../../../../../../CommonFuncs/getSelectedFolderPath');
const CommonCopyCodeSourcePath = path.join(__dirname, "..", '..', "..", '..', "..", "..", "..", 'content', "ClientSide", "Js", "ToHtml", 'Anchor', "ByClass");

const StartFunc = async () => {
    try {
        const selectedFolder = await getSelectedFolderPath();

        if (!selectedFolder) throw new Error('No folder selected, and no active file found in the workspace.');

        await fse.copy(CommonCopyCodeSourcePath, selectedFolder);

        vscode.window.showInformationMessage(`Folder created and contents copied to: ${selectedFolder}`);
    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
    };
};

module.exports = { StartFunc };
