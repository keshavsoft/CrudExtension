const vscode = require('vscode');
const fse = require('fs-extra');
const path = require('path');
const { StartFunc: CommonFromRestClient } = require('./restClient');

const { StartFunc: CommonGetActiveEditorPath } = require('../../../../../../CommonFuncs/getActiveEditorPath');

const CommonRegisterCommand = "NodeJs.Task.NewTask.ShowGet.AsArrayAndRest";

const StartFunc = () => {
    activateFunc();
};

const activateFunc = () => {
    vscode.commands.registerCommand(CommonRegisterCommand, LocalFuncToActivate);
};

const LocalFuncToActivate = async () => {
    try {
        const LocalActiveEditorPath = await CommonGetActiveEditorPath();

        if (!LocalActiveEditorPath) throw new Error('No folder selected, and no active file found in the workspace.');

        vscode.window.showInformationMessage(`3333333333 ${LocalActiveEditorPath}`);

        const LocalEndPointNeeded = await vscode.window.showInputBox({ prompt: 'Enter the Task Name' });

        if (!LocalEndPointNeeded) throw new Error('Task Name was not provided.');

        const LocalFromPath = path.join(__dirname, "copyCode");
        const LocalToPath = path.join(LocalActiveEditorPath, LocalEndPointNeeded);

        await fse.copy(LocalFromPath, LocalToPath);

        CommonFromRestClient({
            inActiveEditorPath: LocalActiveEditorPath,
            inToPath: LocalToPath
        });

        vscode.window.showInformationMessage(`Folder created and contents copied to: ${LocalToPath}`);
    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
    };
};


module.exports = { StartFunc };
