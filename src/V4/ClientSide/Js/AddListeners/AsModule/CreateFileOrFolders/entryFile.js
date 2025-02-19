const { StartFunc: StartFuncAddListeners } = require("./AddListeners/entryFile");
const { StartFunc: StartFuncToAddListenersFile } = require("./toAddListenersFile");

const StartFunc = async ({ inCreatePath, inHtmlIdNeeded }) => {
    await StartFuncAddListeners({ inCreatePath, inHtmlIdNeeded });
    await StartFuncToAddListenersFile({ inCreatePath, inHtmlIdNeeded });
};

module.exports = { StartFunc };
