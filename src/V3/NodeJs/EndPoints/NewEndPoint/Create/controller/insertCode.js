const fse = require('fs-extra');

const CommonNewRoute = "KS";
const CommonRouterSearch = "} from ";
const CommonSearchForBody = "export {";

const StartFunc = ({ inLinesArray, inEditorPath }) => {
    try {
        const selectedFolder = inEditorPath;
        let LocalLines = inLinesArray;

        LocalFuncInsertImportFunc({ inLinesArray: LocalLines });
        LocalFuncInsertFuncBody({ inLinesArray: LocalLines });
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
        "let GetBodyCheckFunc = async (req, res) => {",
        "\tlet LocalFromRepo = await GetBodyCheckFuncRepo();",
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
