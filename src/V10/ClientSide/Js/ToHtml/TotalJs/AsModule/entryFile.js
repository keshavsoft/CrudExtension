const { StartFunc: StartFuncShow } = require("./Show/entryFile");
const { StartFunc: StartFuncFromDelete } = require("./Delete/entryFile");

const StartFunc = () => {
    StartFuncShow();
    StartFuncFromDelete();
};

module.exports = { StartFunc };
