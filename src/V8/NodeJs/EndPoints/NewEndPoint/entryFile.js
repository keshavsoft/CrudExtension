const { StartFunc: StartFuncCreate } = require("./Create/entryFile");
const { StartFunc: StartFuncCheck } = require("./Check/entryFile");

const StartFunc = () => {
    StartFuncCreate();
    StartFuncCheck();
};

module.exports = { StartFunc };
