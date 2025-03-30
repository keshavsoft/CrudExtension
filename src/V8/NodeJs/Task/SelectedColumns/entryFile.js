const vscode = require('vscode');
const fse = require('fs-extra');
const path = require('path');
const fs = require('fs');

const { getSelectedFolderPath } = require('../../../../CommonFuncs/getSelectedFolderPath');

const CommonRegisterCommand = "NodeJs.Task.SelectedColumns";

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

        const LocalFromPath = path.join(__dirname, "copyCode");
        const LocalToPath = path.join(selectedFolder, "SelectedColumns");
        // vscode.window.showInformationMessage(LocalToPath);

        const exists = fs.existsSync(LocalToPath);

        if (exists) {
            vscode.window.showErrorMessage(`SelectedColumns Folder already present...`);
        } else {
            await fse.copy(LocalFromPath, LocalToPath);

            vscode.window.showInformationMessage(`Folder created and contents copied to: ${LocalToPath}`);
        };

        // vscode.window.showInformationMessage(`${exists}`);
        // try {
        //     if (!fse.existsSync(LocalToPath)) {
        //         await fse.copy(LocalFromPath, LocalToPath);

        //         vscode.window.showInformationMessage(`Folder created and contents copied to: ${LocalToPath}`);
        //     };
        // } catch (err) {
        //     vscode.window.showErrorMessage(`SelectedColumns Folder already present`);
        // };
    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
    };
};

module.exports = { StartFunc };
