const fse = require('fs-extra');
const path = require('path');
const readline = require('readline');

const { StartFunc: StartFuncFromInsertCode } = require("./InsertCode/entryFile");

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

const StartFunc = async ({ inEditorPath, inNewRoute }) => {
    try {
        const activeFilePath = inEditorPath;
        const LocalNewRoute = inNewRoute;
        // let LocalLines = inLinesArray;

        const activeFileFolderPath = path.dirname(activeFilePath);

        const newFolderPath = path.join(activeFileFolderPath, "..", "..", "dals", "getFuncs", "EntryFile.js");
        let LocalLines = await processLineByLine({ inFileName: newFolderPath });

        StartFuncFromInsertCode({
            inLinesArray: LocalLines, inEditorPath: newFolderPath,
            inNewRoute: LocalNewRoute
        });
    } catch (error) {
        return error.message;
    };
};

module.exports = { StartFunc };
