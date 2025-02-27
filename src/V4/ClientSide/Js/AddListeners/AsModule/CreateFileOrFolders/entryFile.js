const { StartFunc: StartFuncAddListeners } = require("./AddListeners/entryFile");
const { StartFunc: StartFuncToAddListenersFile } = require("./ToAddListenersFile/entryFile");

const StartFunc = async ({ inCreatePath, inHtmlIdNeeded }) => {
    await StartFuncAddListeners({ inCreatePath, inHtmlIdNeeded });
    await StartFuncToAddListenersFile({ inAlterPath: inCreatePath, inHtmlIdNeeded });
};

module.exports = { StartFunc };
