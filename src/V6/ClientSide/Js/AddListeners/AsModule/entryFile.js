const vscode = require('vscode');

const { getSelectedFolderPath } = require('../../../../../CommonFuncs/getSelectedFolderPath');
const { StartFunc: StartFuncCreateFileOrFolders } = require("./CreateFileOrFolders/entryFile");

const CommonRegisterCommand = "ClientSide.Js.AddListeners.AsModule";

const StartFunc = () => {
    activateFunc();
};

const activateFunc = () => {
    vscode.commands.registerCommand(CommonRegisterCommand, LocalFuncToActivate);
};

const LocalFuncToActivate = async () => {
    try {
        const selectedFolder = await getSelectedFolderPath();

        if (!selectedFolder) throw new Error('No folder selected, and no active file found in the workspace.');

        const LocalHtmlIdNeeded = await vscode.window.showInputBox({ prompt: 'Enter the end point' });

        if (!LocalHtmlIdNeeded) throw new Error('Folder name was not provided.');

        StartFuncCreateFileOrFolders({
            inCreatePath: selectedFolder,
            inHtmlIdNeeded: LocalHtmlIdNeeded
        });
    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
    };
};

module.exports = { StartFunc };
