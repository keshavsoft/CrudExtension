const { StartFunc: StartFuncToHtml } = require("./ToHtml/entryFile");
const { StartFunc: StartFuncFetchFuncs } = require("./FetchFuncs/entryFile");
const { StartFunc: StartFuncAddListeners } = require("./AddListeners/entryFile");

const StartFunc = () => {
    StartFuncToHtml();
    StartFuncFetchFuncs();
    StartFuncAddListeners();
};

module.exports = { StartFunc };
