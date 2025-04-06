const fse = require('fs-extra');

const CommonRouterSearch = "} from ";
const CommonFileName = "EntryFile.js";
const CommonLevelName = "Dal";
const CommonMethod = "Get";

const { StartFunc: StartFuncFromInsertFuncBody } = require("./InsertFuncBody");

const StartFunc = ({ inLinesArray, inEditorPath, inNewRoute }) => {
    try {
        const selectedFolder = inEditorPath;
        const LocalNewRoute = inNewRoute;

        let LocalLines = inLinesArray;

        LocalFuncInsertImportFunc({ inLinesArray: LocalLines, inNewRoute: LocalNewRoute });
        StartFuncFromInsertFuncBody({ inLinesArray: LocalLines, inNewRoute: LocalNewRoute });
        LocalFuncInsertToExport({ inLinesArray: LocalLines, inNewRoute: LocalNewRoute });

        LocalFuncWriteFile({ inLinesArray: LocalLines, inEditorPath: selectedFolder });
    } catch (error) {
        return error.message;
    };
};

const LocalFuncInsertImportFunc = ({ inLinesArray, inNewRoute }) => {
    let LocalLines = inLinesArray;
    const LocalNewRoute = inNewRoute;

    let LocalFindIndex = LocalLines.findIndex((element) => element.startsWith(CommonRouterSearch));
    const LocalToInsertLine = `\t${CommonMethod}${LocalNewRoute}Func as ${CommonMethod}${LocalNewRoute}Func${CommonLevelName}`;

    //first insert comma in last line
    LocalLines[LocalFindIndex - 1] = LocalLines[LocalFindIndex - 1] + ",";
    //then add our code
    LocalLines.splice(LocalFindIndex, 0, LocalToInsertLine);
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
    LocalLines.splice(LocalLines.length - 1, 0, `\t${CommonMethod}${LocalNewRoute}Func`);
};

module.exports = { StartFunc };
