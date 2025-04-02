const { StartFunc: StartFuncCreate } = require("./Create/entryFile");
const { StartFunc: StartFuncCheck } = require("./Check/entryFile");
const { StartFunc: StartFuncFromCreateNoSync } = require("./CreateNoSync/entryFile");

const StartFunc = () => {
    StartFuncCreate();
    StartFuncCheck();
    StartFuncFromCreateNoSync();
};

module.exports = { StartFunc };
