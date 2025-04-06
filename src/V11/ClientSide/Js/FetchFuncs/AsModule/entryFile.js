const { StartFunc: StartFuncShow } = require("./Show/entryFile");
const { StartFunc: StartFuncFromMethods } = require("./Methods/entryFile");

const StartFunc = () => {
    StartFuncShow();
    StartFuncFromMethods();
};

module.exports = { StartFunc };
