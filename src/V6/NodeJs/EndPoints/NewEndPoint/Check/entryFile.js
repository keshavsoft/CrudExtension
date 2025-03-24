const vscode = require('vscode');
const fse = require('fs-extra');
const readline = require('readline');

const CommonRegisterCommand = "NodeJs.EndPoints.NewEndPoint.Check";

const { StartFunc: StartFuncFromRoute } = require("./Route/entryFile");
const { StartFunc: StartFuncFromController } = require("./Controller/entryFile");

const StartFunc = () => {
    activateFunc();
};

const activateFunc = () => {
    vscode.commands.registerCommand(CommonRegisterCommand, LocalFuncToActivate);
};

const LocalFuncToActivate = async () => {
    try {
        const selectedFolder = await LocalFuncGetOpenEditorPath();

        if (!selectedFolder) throw new Error('No folder selected, and no active file found in the workspace.');

        const LocalEndPointNeeded = await vscode.window.showInputBox({ prompt: 'Enter the new end point' });

        if (!LocalEndPointNeeded) throw new Error('New end point was not provided.');

        let LocalLines = await processLineByLine({ inFileName: selectedFolder });

        const LocalFromRoute = StartFuncFromRoute({
            inLinesArray: LocalLines, inEditorPath: selectedFolder,
            inCheckRoute: LocalEndPointNeeded
        });

        if (LocalFromRoute === false) {
            return await false;
        };

        StartFuncFromController({
            inLinesArray: LocalLines, inEditorPath: selectedFolder,
            inCheckRoute: LocalEndPointNeeded
        });

        // StartFuncFromRepo({
        //     inLinesArray: LocalLines, inEditorPath: selectedFolder,
        //     inNewRoute: LocalEndPointNeeded
        // });

        // StartFuncFromDal({
        //     inLinesArray: LocalLines, inEditorPath: selectedFolder,
        //     inNewRoute: LocalEndPointNeeded
        // });

        vscode.window.showInformationMessage(`Your needed EndPoint ${LocalEndPointNeeded} is looking good in all levels.`);
    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
    };
};

const processLineByLine = async ({ inFileName }) => {
    try {
        const fileStream = fse.createReadStream(inFileName);
        let LocalLines = [];

        fileStream.on('error', (err) => {
            console.error(`Error reading file: ${err.message}`);
        });

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        for await (const line of rl) {
            // console.log(`Line: ${line}`);
            LocalLines.push(line);
            // vscode.window.showInformationMessage(`Error: ${line}`);
        };

        return LocalLines;
    } catch (err) {
        console.error(`Error processing file: ${err.message}`);
    }
};

const LocalFuncGetOpenEditorPath = async () => {
    // If no folder is selected, fall back to the active file's folder
    const activeEditor = vscode.window.activeTextEditor;

    if (activeEditor) {
        const activeFilePath = activeEditor.document.uri.fsPath;

        if (await fse.pathExists(activeFilePath)) {
            return activeFilePath;
        };
    };

    // If no folder or active file is found, return null
    return null;
};

module.exports = { StartFunc };
