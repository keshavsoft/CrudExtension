const fse = require('fs-extra');

const CommonNewRoute = "KS";
const CommonRouterSearch = "} from ";
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
    let LocalFindIndex = LocalLines.findIndex((element) => element.startsWith(CommonRouterSearch));
    const LocalToInsertLine = `\tGet${CommonNewRoute}Func as Get${CommonNewRoute}FuncRepo`;

    //first insert comma in last line
    LocalLines[LocalFindIndex - 1] = LocalLines[LocalFindIndex - 1] + ",";
    //then add our code
    LocalLines.splice(LocalFindIndex, 0, LocalToInsertLine);
    // LocalLines.splice(LocalFindIndex, 0, "");
};

const LocalFuncInsertFuncBody = ({ inLinesArray }) => {
    let LocalLines = inLinesArray;
    let LocalFindIndex = LocalLines.findIndex((element) => element.startsWith(CommonSearchForBody));

    const LocalToInsertArray = [
        `let Get${CommonNewRoute}Func = async (req, res) => {`,
        `\tlet LocalFromRepo = await Get${CommonNewRoute}FuncRepo();`,
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

const LocalFuncInsertToExport = ({ inLinesArray }) => {
    let LocalLines = inLinesArray;

    LocalLines[LocalLines.length - 2] += ",";
    LocalLines.splice(LocalLines.length - 1, 0, `\tGet${CommonNewRoute}Func`);
};

module.exports = { StartFunc };
