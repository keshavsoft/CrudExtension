const { StartFunc: StartFuncToHtml } = require("./ToHtml/entryFile");
const { StartFunc: StartFuncFetchFuncs } = require("./FetchFuncs/entryFile");

const StartFunc = () => {
    StartFuncToHtml();
    StartFuncFetchFuncs();
};

module.exports = { StartFunc };
