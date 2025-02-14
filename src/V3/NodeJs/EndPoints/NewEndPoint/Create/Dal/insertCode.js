const fse = require('fs-extra');

const CommonNewRoute = "KS";
const CommonRouterSearch = "import {";
const CommonSearchForBody = "export {";
const CommonFileName = "EntryFile.js";

const StartFunc = ({ inLinesArray, inEditorPath }) => {
    try {
        const selectedFolder = inEditorPath;
        let LocalLines = inLinesArray;

        LocalFuncInsertImportFunc({ inLinesArray: LocalLines });
        LocalFuncInsertFuncBody({ inLinesArray: LocalLines });
        LocalFuncInsertToExport({ inLinesArray: LocalLines });

        LocalFuncWriteFile({ inLinesArray: LocalLines, inEditorPath: selectedFolder });
    } catch (error) {
        console.log("aaaaaaa  : ", error.message);
        return error.message;
    };
};

const LocalFuncInsertImportFunc = ({ inLinesArray }) => {
    let LocalLines = inLinesArray;
    let LocalFindIndex = LocalLines.findLastIndex((element) => element.startsWith(CommonRouterSearch));
    const LocalToInsertLine = `import { StartFunc as StartFuncFromGet${CommonNewRoute} } from '../../kLowDb/ReadFromFile/Get${CommonNewRoute}Func.js';`

    //then add our code
    LocalLines.splice(LocalFindIndex + 1, 0, LocalToInsertLine);
    // LocalLines.splice(LocalFindIndex, 0, "");
};

const LocalFuncInsertFuncBody = ({ inLinesArray }) => {
    let LocalLines = inLinesArray;
    let LocalFindIndex = LocalLines.findIndex((element) => element.startsWith(CommonSearchForBody));

    const LocalToInsertArray = [
        "",
        `let Get${CommonNewRoute}Func = async () => {`,
        `\tlet LocalFromLowDb = await StartFuncFromGet${CommonNewRoute}();`,
        "",
        `\treturn await LocalFromLowDb;`,
        "};"
    ];

    //then add our code
    LocalLines.splice(LocalFindIndex, 0, ...LocalToInsertArray);
    // LocalLines.splice(LocalFindIndex, 0, "");
};

const LocalFuncWriteFile = ({ inLinesArray, inEditorPath }) => {
    let LocalLines = inLinesArray;

    const content = LocalLines.join('\n');

    const LocalFileName = CommonFileName;

    const activeFileFolderPath = require('path').dirname(inEditorPath);

    fse.writeFileSync(`${activeFileFolderPath}/${LocalFileName}`, content, 'utf-8');
};

const LocalFuncInsertToExport = ({ inLinesArray }) => {
    let LocalLines = inLinesArray;

    LocalLines[LocalLines.length - 2] += ",";
    LocalLines.splice(LocalLines.length - 1, 0, `\tGet${CommonNewRoute}Func`);
};

module.exports = { StartFunc };
