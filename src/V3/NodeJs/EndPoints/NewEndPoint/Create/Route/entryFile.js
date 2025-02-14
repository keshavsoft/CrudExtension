const fse = require('fs-extra');

const CommonRouterSearch = "} from ";
const CommonFileName = "EntryFile.js";

const { StartFunc: StartFuncFromRouterDotLine } = require("./routerDotLine");
const { StartFunc: StartFuncFromImportLine } = require("./importLine");

const StartFunc = ({ inLinesArray, inEditorPath, inNewRoute }) => {
    try {
        const selectedFolder = inEditorPath;
        let LocalLines = inLinesArray;

        StartFuncFromImportLine({ inLinesArray: LocalLines, inNewRoute });
        StartFuncFromRouterDotLine({ inLinesArray: LocalLines, inNewRoute });

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

module.exports = { StartFunc };
