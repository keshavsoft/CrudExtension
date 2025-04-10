const vscode = require('vscode');
const fse = require('fs-extra');
const readline = require('readline');

const CommonRegisterCommand = "NodeJs.SubRoute.CreateNew";

const { StartFunc: StartFuncFromRoute } = require("./Route/entryFile");

const StartFunc = () => {
    activateFunc();
};

const activateFunc = () => {
    vscode.commands.registerCommand(CommonRegisterCommand, LocalFuncToActivate);
};

const LocalFuncToActivate = async () => {
    try {
        const clipboardText = await LocalFuncForFolder();

        if (!clipboardText) throw new Error('No folder selected, and no active file found in the workspace.');

        const LocalEndPointNeeded = await vscode.window.showInputBox({ prompt: 'Enter the new end point' });

        if (!LocalEndPointNeeded) throw new Error('New end point was not provided.');

        // const LocalFindEndPoint = LocalFuncCheckOldEndPoints({
        //     inLinesArray: LocalLines,
        //     inNewRoute: LocalEndPointNeeded
        // });

        // if (LocalFindEndPoint) {
        //     vscode.window.showInformationMessage(`New end point: ${LocalEndPointNeeded} is already in the file.`);
        //     return false;
        // };

        StartFuncFromRoute({
            inEditorPath: clipboardText,
            inNewRoute: LocalEndPointNeeded
        });

        vscode.window.showInformationMessage(`Folder created and contents copied to: ${LocalEndPointNeeded}`);
    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
    };
};

const LocalFuncCheckOldEndPoints = ({ inLinesArray, inNewRoute }) => {
    let LocalLines = inLinesArray;
    const LocalNewRoute = inNewRoute;

    let LocalFilteredRows = LocalLines.filter((element) => element.startsWith("router.get("));
    let LocalFind = LocalFilteredRows.find((element) => element.indexOf(LocalNewRoute) >= 0);

    return LocalFind === undefined ? false : true;
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

const LocalFuncForFolder = async () => {
    // Try to get the currently selected folder in Explorer
    await vscode.commands.executeCommand('copyFilePath');

    const clipboardText = await vscode.env.clipboard.readText();

    if (clipboardText && (await fse.pathExists(clipboardText)) && (await fse.lstat(clipboardText)).isDirectory()) {
        return clipboardText;
    };

    return null;
};

module.exports = { StartFunc };
