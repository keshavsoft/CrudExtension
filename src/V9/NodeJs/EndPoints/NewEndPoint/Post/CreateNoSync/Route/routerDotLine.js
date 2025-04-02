const StartFunc = ({ inLinesArray, inNewRoute }) => {
    let LocalLines = inLinesArray;
    const LocalNewRoute = inNewRoute;

    const LocalToInsertLine = `router.post('/${LocalNewRoute}', Post${LocalNewRoute}Func);\r`;

    LocalLines.splice(LocalLines.length - 2, 0, LocalToInsertLine);
};

module.exports = { StartFunc };
