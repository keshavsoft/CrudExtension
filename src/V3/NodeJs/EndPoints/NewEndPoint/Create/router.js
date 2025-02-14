const fse = require('fs-extra');

const CommonRouterSearch = "} from ";
const CommonFileName = "EntryFile.js";

const StartFunc = ({ inLinesArray, inEditorPath, inNewRoute }) => {
    try {
        const selectedFolder = inEditorPath;
        let LocalLines = inLinesArray;

        LocalFuncInsertImportFunc({ inLinesArray: LocalLines, inNewRoute });
        LocalFuncInsertRouterUse({ inLinesArray: LocalLines, inNewRoute });
        LocalFuncWriteFile({ inLinesArray: LocalLines, inEditorPath: selectedFolder });
    } catch (error) {
        console.log("aaaaaaa  : ", error.message);
        return error.message;
    };
};

const LocalFuncInsertImportFunc = ({ inLinesArray, inNewRoute }) => {
    let LocalLines = inLinesArray;
    const LocalNewRoute = inNewRoute;

    let LocalFindIndex = LocalLines.findIndex((element) => element.startsWith(CommonRouterSearch));
    const LocalToInsertLine = `\tGet${LocalNewRoute}Func`;

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

const LocalFuncInsertRouterUse = ({ inLinesArray, inNewRoute }) => {
    let LocalLines = inLinesArray;
    const LocalNewRoute = inNewRoute;

    const LocalToInsertLine = `router.get('/${LocalNewRoute}', Get${LocalNewRoute}Func);\r`;

    LocalLines.splice(LocalLines.length - 1, 0, LocalToInsertLine);
    LocalLines.splice(LocalLines.length - 1, 0, "");
};

module.exports = { StartFunc };
