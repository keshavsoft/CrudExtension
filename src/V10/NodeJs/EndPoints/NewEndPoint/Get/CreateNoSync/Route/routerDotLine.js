const CommonMethod = "Get";

const StartFunc = ({ inLinesArray, inNewRoute }) => {
    let LocalLines = inLinesArray;
    const LocalNewRoute = inNewRoute;

    const LocalToInsertLine = `router.${CommonMethod.toLowerCase()}('/${LocalNewRoute}', ${CommonMethod}${LocalNewRoute}Func);\r`;

    LocalLines.splice(LocalLines.length - 2, 0, LocalToInsertLine);
};

module.exports = { StartFunc };
