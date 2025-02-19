const vscode = require('vscode');
const fs = require('fs');

const { getSelectedFolderPath } = require('../../../../../CommonFuncs/getSelectedFolderPath');
const CommonRegisterCommand = "ClientSide.Js.AddListeners.AsModule";
const { StartFunc: StartFuncCreateFileOrFolders } = require("./CreateFileOrFolders/entryFile");

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

        // await LocalFuncInsertFiles({
        //     inCreatePath: selectedFolder,
        //     inHtmlIdNeeded: LocalHtmlIdNeeded
        // });
    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
    };
};

const LocalFuncInsertFiles = async ({ inCreatePath, inHtmlIdNeeded }) => {
    const LocalToCreatePath = inCreatePath;

    const LoccalContentToInsert = `let StartFunc = () => {
    };
    
    export { StartFunc };`;

    await fs.mkdirSync(`${LocalToCreatePath}/AddListeners`);
    await fs.mkdirSync(`${LocalToCreatePath}/AddListeners/${inHtmlIdNeeded}`);
    await fs.writeFileSync(`${LocalToCreatePath}/AddListeners/${inHtmlIdNeeded}/entryFile.js`, LoccalContentToInsert);

    ButtonClickFunc.js

    await fs.writeFileSync(`${LocalToCreatePath}/AddListeners/entryFile.js`, LoccalContentToInsert);

};

module.exports = { StartFunc };
