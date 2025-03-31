const vscode = require('vscode');
const fse = require('fs-extra');
const path = require('path');

const { getSelectedFolderPath } = require('../../../../../../../../../CommonFuncs/getSelectedFolderPath');
const CommonRegisterCommand = "ClientSide.Js.ToHtml.TotalJs.AsModule.Show.FixedColumns.UrlFromInput";

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

        const LocalEndPointNeeded = await vscode.window.showInputBox({ prompt: 'Enter the end point' });

        if (!LocalEndPointNeeded) throw new Error('Folder name was not provided.');

        // const LocalFromPath = path.join(__dirname, "copyCode");
        const LocalFromPath = path.join(__dirname, "..", "copyCode");
        const LocalToPath = path.join(selectedFolder, "Show");

        await fse.copy(LocalFromPath, LocalToPath);

        // Locate fetchFuncs.js in the copied directory
        const fetchFuncsPath = path.join(LocalToPath, "FormLoad", "AddListeners", "RefreshBSTableClass", "FetchAsGet", 'getUrl.json');

        if (!await fse.pathExists(fetchFuncsPath)) {
            throw new Error('fetchFuncs.js not found in the copied folder.');
        };

        LocalFuncUpdateGetUrlJson({ fetchFuncsPath, inEndPointNeeded: LocalEndPointNeeded });

        vscode.window.showInformationMessage(`Folder created and contents copied to: ${selectedFolder}`);
    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
    };
};

const LocalFuncUpdateGetUrlJson = ({ fetchFuncsPath, inEndPointNeeded }) => {
    const fetchFuncsContent = fse.readFileSync(fetchFuncsPath);
    let LocalFileDataAsJson = JSON.parse(fetchFuncsContent);
    LocalFileDataAsJson.GetEndPoint = inEndPointNeeded;

    fse.writeFileSync(fetchFuncsPath, JSON.stringify(LocalFileDataAsJson));
};

module.exports = { StartFunc };
