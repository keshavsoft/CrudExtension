const { StartFunc: StartFuncFromRouterDotLine } = require("./routerDotLine");
const { StartFunc: StartFuncFromImportLine } = require("./importLine");

const StartFunc = ({ inLinesArray, inCheckRoute }) => {
    try {
        let LocalLines = inLinesArray;
        const LocalCheckRoute = inCheckRoute;

        const LocalFromImport = StartFuncFromImportLine({
            inLinesArray: LocalLines,
            inCheckRoute: LocalCheckRoute
        });

        const LocalFromDot = StartFuncFromRouterDotLine({
            inLinesArray: LocalLines,
            inCheckRoute: LocalCheckRoute
        });

        if (LocalFromImport === false || LocalFromDot === false) {
            return false;
        };
    } catch (error) {
        return error.message;
    };
};

module.exports = { StartFunc };
