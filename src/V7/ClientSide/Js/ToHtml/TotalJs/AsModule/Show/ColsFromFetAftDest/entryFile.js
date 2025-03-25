const { StartFunc: StartFuncUrlFromJson } = require("./UrlFromJson/entryFile");

const StartFunc = () => {
    StartFuncUrlFromJson();
};

module.exports = { StartFunc };
