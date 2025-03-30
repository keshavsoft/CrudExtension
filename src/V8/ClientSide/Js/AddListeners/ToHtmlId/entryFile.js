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

        const LocalHtmlIdNeeded = await vscode.window.showInputBox({ prompt: 'Enter the HtmlId' });

        if (!LocalHtmlIdNeeded) throw new Error('HtmlId was not provided.');
        if (LocalHtmlIdNeeded.length > 20) throw new Error('HtmlId should be less than 20 characters.');

        StartFuncCreateFileOrFolders({
            inActiveEditorPath: LocalActiveEditorPath,
            inHtmlIdNeeded: LocalHtmlIdNeeded
        });
    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
    };
};

module.exports = { StartFunc };
