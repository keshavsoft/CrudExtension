const { StartFunc: StartFuncUrlFromJson } = require("./UrlFromJson/entryFile");
const { StartFunc: StartFuncUrlFromInput } = require("./UrlFromInput/entryFile");

const StartFunc = () => {
    StartFuncUrlFromJson();
    StartFuncUrlFromInput();
};

module.exports = { StartFunc };
