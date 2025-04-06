const CommonSearchForBody = "export {";

const StartFunc = ({ inLinesArray, inNewRoute }) => {
    let LocalLines = inLinesArray;
    const LocalNewRoute = inNewRoute;

    let LocalFindIndex = LocalLines.findIndex((element) => element.startsWith(CommonSearchForBody));

    const LocalToInsertArray = [
        `let Post${LocalNewRoute}Func = () => {`,
        `\tlet LocalFromLowDb = StartFuncFromPost${LocalNewRoute}();`,
        "",
        `\treturn LocalFromLowDb;`,
        "};"
    ];

    LocalFuncHandleEmptyLines({
        inToInsertIndex: LocalFindIndex,
        inLinesArray: LocalLines
    });
    //then add our code
    LocalLines.splice(LocalFindIndex, 0, ...LocalToInsertArray);
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
