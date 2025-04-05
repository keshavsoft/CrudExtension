const fse = require('fs-extra');

const CommonFileName = "EntryFile.js";

const { StartFunc: StartFuncFromInsertImport } = require("./insertImport");
const { StartFunc: StartFuncFromInsertFuncBody } = require("./insertFuncBody");
const { StartFunc: StartFuncFromInsertToExport } = require("./insertToExport");

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

        StartFuncFromInsertToExport({
            inLinesArray: LocalLines,
            inNewRoute: LocalNewRoute
        });

        LocalFuncWriteFile({ inLinesArray: LocalLines, inEditorPath: selectedFolder });
    } catch (error) {
        return error.message;
    };
};

const LocalFuncWriteFile = ({ inLinesArray, inEditorPath }) => {
    let LocalLines = inLinesArray;

    const content = LocalLines.join('\n');

    const LocalFileName = CommonFileName;

    const activeFileFolderPath = require('path').dirname(inEditorPath);

    fse.writeFileSync(`${activeFileFolderPath}/${LocalFileName}`, content, 'utf-8');
};

module.exports = { StartFunc };
