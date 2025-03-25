const fse = require('fs-extra');

const CommonRouterSearch = "import {";
const CommonFileName = "EntryFile.js";

const { StartFunc: StartFuncFromInsertImport } = require("./insertImport");
const { StartFunc: StartFuncFromInsertFuncBody } = require("./insertFuncBody");

const StartFunc = ({ inLinesArray, inEditorPath, inNewRoute }) => {
    try {
        const selectedFolder = inEditorPath;
        const LocalNewRoute = inNewRoute;

        let LocalLines = inLinesArray;

        StartFuncFromInsertImport({
            inLinesArray: LocalLines,
            inNewRoute: LocalNewRoute
        });

        StartFuncFromInsertFuncBody({
            inLinesArray: LocalLines,
            inNewRoute: LocalNewRoute
        });

        LocalFuncInsertToExport({
            inLinesArray: LocalLines,
            inNewRoute: LocalNewRoute
        });

        LocalFuncWriteFile({ inLinesArray: LocalLines, inEditorPath: selectedFolder });
    } catch (error) {
        return error.message;
    };
};

const LocalFuncInsertImportFunc = ({ inLinesArray, inNewRoute }) => {
    let LocalLines = inLinesArray;
    const LocalNewRoute = inNewRoute;

    let LocalFindIndex = LocalLines.findLastIndex((element) => element.startsWith(CommonRouterSearch));
    const LocalToInsertLine = `import { StartFunc as StartFuncFromGet${LocalNewRoute} } from '../../kLowDb/ReadFromFile/${LocalNewRoute}.js';`

    //then add our code
    LocalLines.splice(LocalFindIndex + 1, 0, LocalToInsertLine);
    // LocalLines.splice(LocalFindIndex, 0, "");
};

const LocalFuncWriteFile = ({ inLinesArray, inEditorPath }) => {
    let LocalLines = inLinesArray;

    const content = LocalLines.join('\n');

    const LocalFileName = CommonFileName;

    const activeFileFolderPath = require('path').dirname(inEditorPath);

    fse.writeFileSync(`${activeFileFolderPath}/${LocalFileName}`, content, 'utf-8');
};

const LocalFuncInsertToExport = ({ inLinesArray, inNewRoute }) => {
    let LocalLines = inLinesArray;
    const LocalNewRoute = inNewRoute;

    LocalLines[LocalLines.length - 2] += ",";
    LocalLines.splice(LocalLines.length - 1, 0, `\tGet${LocalNewRoute}Func`);
};

module.exports = { StartFunc };
