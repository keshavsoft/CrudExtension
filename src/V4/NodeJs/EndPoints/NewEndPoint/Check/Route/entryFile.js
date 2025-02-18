const { StartFunc: StartFuncFromRouterDotLine } = require("./routerDotLine");
const { StartFunc: StartFuncFromImportLine } = require("./importLine");

const StartFunc = ({ inLinesArray, inCheckRoute }) => {
    try {
        let LocalLines = inLinesArray;
        const LocalCheckRoute = inCheckRoute;

        StartFuncFromImportLine({
            inLinesArray: LocalLines,
            inCheckRoute: LocalCheckRoute
        });

        StartFuncFromRouterDotLine({
            inLinesArray: LocalLines,
            inCheckRoute: LocalCheckRoute
        });
    } catch (error) {
        return error.message;
    };
};

module.exports = { StartFunc };
