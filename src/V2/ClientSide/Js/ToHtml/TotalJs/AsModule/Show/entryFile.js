const vscode = require('vscode');
const fse = require('fs-extra');
const path = require('path');

const { getSelectedFolderPath } = require('../../../../../../../CommonFuncs/getSelectedFolderPath');
const CommonRegisterCommand = "ClientSide.Js.ToHtml.TotalJs.AsModule";

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

        vscode.window.showInformationMessage(`------------- folder: ${__dirname}`);

        const LocalFromPath = path.join(__dirname, "copyCode");
        const LocalToPath = path.join(selectedFolder, "Show");

        await fse.copy(LocalFromPath, LocalToPath);

    } catch (error) {
        console.log("aaaaaaa  : ", error.message);

        vscode.window.showErrorMessage(`Error: ${error.message}`);
    };
};

module.exports = { StartFunc };
