const CommonMethod = "Get";

const StartFunc = ({ inLinesArray, inNewRoute }) => {
    let LocalLines = inLinesArray;
    const LocalNewRoute = inNewRoute;

    LocalLines[LocalLines.length - 2] += ",";
    LocalLines.splice(LocalLines.length - 1, 0, `\t${CommonMethod}${LocalNewRoute}Func`);
};

module.exports = { StartFunc };
