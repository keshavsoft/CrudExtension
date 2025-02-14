const fse = require('fs-extra');

const CommonNewRoute = "KS";
const CommonRouterSearch = "} from ";
const CommonFileName = "EntryFile.js";

const StartFunc = ({ inLinesArray, inEditorPath }) => {
    try {
        const selectedFolder = inEditorPath;
        let LocalLines = inLinesArray;

        LocalFuncInsertImportFunc({ inLinesArray: LocalLines });
        LocalFuncInsertRouterUse({ inLinesArray: LocalLines });
        LocalFuncWriteFile({ inLinesArray: LocalLines, inEditorPath: selectedFolder });
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

    const LocalFileName = CommonFileName;

    const activeFileFolderPath = require('path').dirname(inEditorPath);

    fse.writeFileSync(`${activeFileFolderPath}/${LocalFileName}`, content, 'utf-8');
};

const LocalFuncInsertRouterUse = ({ inLinesArray }) => {
    let LocalLines = inLinesArray;

    const LocalToInsertLine = `router.get('/${CommonNewRoute}', Get${CommonNewRoute}Func);\r`;

    LocalLines.splice(LocalLines.length - 1, 0, LocalToInsertLine);
    LocalLines.splice(LocalLines.length - 1, 0, "");
};

module.exports = { StartFunc };
