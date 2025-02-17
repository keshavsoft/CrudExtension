const { StartFunc: StartFuncFromRouterDotLine } = require("./routerDotLine");
const { StartFunc: StartFuncFromImportLine } = require("./importLine");

const StartFunc = ({ inLinesArray, inNewRoute }) => {
    try {
        let LocalLines = inLinesArray;

        StartFuncFromImportLine({ inLinesArray: LocalLines, inNewRoute });
        StartFuncFromRouterDotLine({ inLinesArray: LocalLines, inNewRoute });
    } catch (error) {
        return error.message;
    };
};

module.exports = { StartFunc };
