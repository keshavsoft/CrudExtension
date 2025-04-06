const CommonSearchForBody = "export {";
const CommonLevelName = "Repo";
const CommonMethod = "Get";

const StartFunc = ({ inLinesArray, inNewRoute }) => {
    let LocalLines = inLinesArray;
    const LocalNewRoute = inNewRoute;

    let LocalFindIndex = LocalLines.findIndex((element) => element.startsWith(CommonSearchForBody));

    const LocalToInsertArray = [
        `let ${CommonMethod}${LocalNewRoute}Func = (req, res) => {`,
        `\tlet LocalFromRepo = ${CommonMethod}${LocalNewRoute}Func${CommonLevelName}();`,
        "",
        "\tif (LocalFromRepo === false) {",
        "\t\tres.status(500).send(LocalFromRepo);",
        "\t\treturn;",
        "\t};",
        "",
        "\tres.status(200).send(JSON.stringify(LocalFromRepo.JsonData));",
        "};"
    ];

    LocalFuncHandleEmptyLines({
        inToInsertIndex: LocalFindIndex,
        inLinesArray: LocalLines
    });

    //then add our code
    LocalLines.splice(LocalFindIndex, 0, ...LocalToInsertArray);
    // LocalLines.splice(LocalFindIndex, 0, "");
};

const LocalFuncHandleEmptyLines = ({ inToInsertIndex, inLinesArray }) => {
    let LocalLines = inLinesArray;
    const LocalValueAtThatLine = LocalLines[inToInsertIndex];

    if (LocalValueAtThatLine === "" === false) {
        LocalLines.splice(inToInsertIndex, 0, "");
    };

    return true;
};

module.exports = { StartFunc };
