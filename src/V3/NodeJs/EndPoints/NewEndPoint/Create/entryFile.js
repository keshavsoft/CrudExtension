const vscode = require('vscode');
const fse = require('fs-extra');
const readline = require('readline');

const CommonRegisterCommand = "Keshav";

const { StartFunc: StartFuncFromRouter } = require("./router");
const { StartFunc: StartFuncFromController } = require("./controller/entryFile");

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

        let LocalLines = await processLineByLine({ inFileName: selectedFolder });

        StartFuncFromRouter({ inLinesArray: LocalLines, inEditorPath: selectedFolder });
        StartFuncFromController({ inLinesArray: LocalLines, inEditorPath: selectedFolder });

        vscode.window.showInformationMessage(`Folder created and contents copied to: ${LocalLines[LocalLines.length - 2]}`);
    } catch (error) {
        console.log("aaaaaaa  : ", error.message);

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
            console.log(`Line: ${line}`);
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
