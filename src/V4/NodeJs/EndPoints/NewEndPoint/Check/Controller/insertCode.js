const fse = require('fs-extra');

const CommonNewRoute = "KS";
const CommonRouterSearch = "} from ";
const CommonSearchForBody = "export {";
const CommonFileName = "EntryFile.js";
const CommonLevelName = "Repo";

const StartFunc = ({ inLinesArray, inEditorPath, inNewRoute }) => {
    try {
        const selectedFolder = inEditorPath;
        let LocalLines = inLinesArray;
        const LocalNewRoute = inNewRoute;

        LocalFuncInsertImportFunc({ inLinesArray: LocalLines, inNewRoute: LocalNewRoute });
        LocalFuncInsertFuncBody({ inLinesArray: LocalLines, inNewRoute: LocalNewRoute });
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
    const LocalToInsertLine = `\tGet${LocalNewRoute}Func as Get${LocalNewRoute}Func${CommonLevelName}`;

    //first insert comma in last line
    LocalLines[LocalFindIndex - 1] = LocalLines[LocalFindIndex - 1] + ",";
    //then add our code
    LocalLines.splice(LocalFindIndex, 0, LocalToInsertLine);
    // LocalLines.splice(LocalFindIndex, 0, "");
};

const LocalFuncInsertFuncBody = ({ inLinesArray, inNewRoute }) => {
    let LocalLines = inLinesArray;
    const LocalNewRoute = inNewRoute;

    let LocalFindIndex = LocalLines.findIndex((element) => element.startsWith(CommonSearchForBody));

    const LocalToInsertArray = [
        `let Get${LocalNewRoute}Func = async (req, res) => {`,
        `\tlet LocalFromRepo = await Get${LocalNewRoute}Func${CommonLevelName}();`,
        "",
        "\tif (LocalFromRepo === false) {",
        "\t\tres.status(500).send(LocalFromRepo);",
        "\t\treturn;",
        "\t};",
        "",
        "\tres.status(200).send(JSON.stringify(LocalFromRepo));",
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

const LocalFuncInsertToExport = ({ inLinesArray, inNewRoute }) => {
    let LocalLines = inLinesArray;
    const LocalNewRoute = inNewRoute;

    LocalLines[LocalLines.length - 2] += ",";
    LocalLines.splice(LocalLines.length - 1, 0, `\tGet${LocalNewRoute}Func`);
};

module.exports = { StartFunc };
