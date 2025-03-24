const vscode = require('vscode');

const { FuncGetPath } = require('../../../../../CommonFuncs/getActiveEditor');
const { StartFunc: StartFuncCreateFileOrFolders } = require("./CreateFileOrFolders/entryFile");

const CommonRegisterCommand = "ClientSide.Js.AddListeners.ToHtmlId";

const StartFunc = () => {
    activateFunc();
};

const activateFunc = () => {
    vscode.commands.registerCommand(CommonRegisterCommand, LocalFuncToActivate);
};

const LocalFuncToActivate = async () => {
    try {
        const LocalActiveEditorPath = await FuncGetPath();

        if (!LocalActiveEditorPath) throw new Error('No active file found in the workspace.');

        const LocalHtmlIdNeeded = await vscode.window.showInputBox({ prompt: 'Enter the end point' });

        if (!LocalHtmlIdNeeded) throw new Error('Folder name was not provided.');

        StartFuncCreateFileOrFolders({
            inActiveEditorPath: LocalActiveEditorPath,
            inHtmlIdNeeded: LocalHtmlIdNeeded
        });
    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
    };
};

module.exports = { StartFunc };
