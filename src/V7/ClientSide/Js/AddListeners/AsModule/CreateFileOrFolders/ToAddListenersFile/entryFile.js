const fse = require('fs-extra');
const readline = require('readline');

const { StartFunc: StartFuncFromInsertCode } = require("./InsertCode/entryFile");

const StartFunc = async ({ inAlterPath, inHtmlIdNeeded }) => {
    const LocalAlterPath = inAlterPath;
    const LocalHtmlIdNeeded = inHtmlIdNeeded;

    let LocalLines = await processLineByLine({ inFileName: `${LocalAlterPath}/AddListeners/entryFile.js` });

    StartFuncFromInsertCode({
        inLinesArray: LocalLines, inFileName: LocalAlterPath,
        inHtmlIdNeeded: LocalHtmlIdNeeded
    });
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

module.exports = { StartFunc };