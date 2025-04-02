const CommonSearchForBody = "export {";
const CommonLevelName = "Dal";

const StartFunc = ({ inLinesArray, inNewRoute }) => {
    let LocalLines = inLinesArray;
    const LocalNewRoute = inNewRoute;

    let LocalFindIndex = LocalLines.findIndex((element) => element.startsWith(CommonSearchForBody));

    const LocalToInsertArray = [
        `let Get${LocalNewRoute}Func = () => {`,
        `\tlet LocalFrom${CommonLevelName} = Post${LocalNewRoute}Func${CommonLevelName}();`,
        "",
        `\treturn LocalFrom${CommonLevelName};`,
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
