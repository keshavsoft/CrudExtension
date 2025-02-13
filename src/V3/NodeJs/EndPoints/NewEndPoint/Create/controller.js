const fse = require('fs-extra');
const path = require('path');
const readline = require('readline');

const CommonNewRoute = "KS";
const CommonRouterSearch = "} from ";

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

const StartFunc = async ({ inLinesArray, inEditorPath }) => {
    try {
        const activeFilePath = inEditorPath;
        // let LocalLines = inLinesArray;

        const activeFileFolderPath = path.dirname(activeFilePath);

        const newFolderPath = path.join(activeFileFolderPath, "..", "..", "controllers", "getFuncs", "EntryFile.js");
        let LocalLines = await processLineByLine({ inFileName: newFolderPath });

        // LocalFuncInsertImportFunc({ inLinesArray: LocalLines });
        // LocalFuncInsertRouterUse({ inLinesArray: LocalLines });
        // LocalFuncWriteFile({ inLinesArray: LocalLines, inEditorPath: selectedFolder });
    } catch (error) {
        console.log("aaaaaaa  : ", error.message);
        return error.message;
    };
};

const LocalFuncInsertImportFunc = ({ inLinesArray }) => {
    let LocalLines = inLinesArray;
    let LocalFindIndex = LocalLines.findIndex((element) => element.startsWith(CommonRouterSearch));
    const LocalToInsertLine = `\tGet${CommonNewRoute}Func`;

    LocalLines[LocalFindIndex - 1] = LocalLines[LocalFindIndex - 1] + ",";

    LocalLines.splice(LocalFindIndex, 0, LocalToInsertLine);
    // LocalLines.splice(LocalFindIndex, 0, "");
};

const LocalFuncWriteFile = ({ inLinesArray, inEditorPath }) => {
    let LocalLines = inLinesArray;

    const content = LocalLines.join('\n');

    const fp = 'output.js';

    const activeFileFolderPath = require('path').dirname(inEditorPath);

    fse.writeFileSync(`${activeFileFolderPath}/${fp}`, content, 'utf-8');
};

const LocalFuncInsertRouterUse = ({ inLinesArray }) => {
    let LocalLines = inLinesArray;

    const LocalToInsertLine = `router.get('/${CommonNewRoute}', Get${CommonNewRoute}Func);\r`;

    LocalLines.splice(LocalLines.length - 1, 0, LocalToInsertLine);
    LocalLines.splice(LocalLines.length - 1, 0, "");
};

module.exports = { StartFunc };
