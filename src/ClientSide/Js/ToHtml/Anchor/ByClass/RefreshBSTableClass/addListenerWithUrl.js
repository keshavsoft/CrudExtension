const vscode = require('vscode');
// const fs = require('fs').promises;
const path = require('path');
const fse = require('fs-extra');
const { getSelectedFolderPath } = require('../../../../../../CommonFuncs/getSelectedFolderPath');
const CommonCopyCodeSourcePath = path.join(__dirname, "..", '..', "..", '..', "..", "..", "..", 'content', "ClientSide", "Js", "ToHtml", 'Anchor', "ByClass", "EndPointFromInput");

const StartFunc = async () => {
    try {
        const selectedFolder = await getSelectedFolderPath();

        if (!selectedFolder) throw new Error('No folder selected, and no active file found in the workspace.');

        const LocalEndPointNeeded = await vscode.window.showInputBox({ prompt: 'Enter the end point' });

        if (!LocalEndPointNeeded) throw new Error('Folder name was not provided.');

        const newFolderPath = path.join(selectedFolder, "RefreshBSTableClass");

        await fse.copy(CommonCopyCodeSourcePath, newFolderPath);

        // Locate fetchFuncs.js in the copied directory
        const fetchFuncsPath = path.join(newFolderPath, "FetchAsGet", 'getUrl.json');

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
