const vscode = require('vscode');
const fse = require('fs-extra');
const path = require('path');

const { getSelectedFolderPath } = require('../../../../../CommonFuncs/getSelectedFolderPath');

const CommonRegisterCommand = "NodeJs.Task.NewTask.SelectedColumns";

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

        const LocalEndPointNeeded = await vscode.window.showInputBox({ prompt: 'Enter the Task Name' });

        if (!LocalEndPointNeeded) throw new Error('Task Name was not provided.');

        const LocalFromPath = path.join(__dirname, "copyCode");
        const LocalToPath = path.join(selectedFolder, LocalEndPointNeeded);

        await fse.copy(LocalFromPath, LocalToPath);

        vscode.window.showInformationMessage(`Folder created and contents copied to: ${LocalToPath}`);
    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
    };
};

module.exports = { StartFunc };
