const { StartFunc: StartFuncCreate } = require("./Create/entryFile");
const { StartFunc: StartFuncCheck } = require("./Check/entryFile");
const { StartFunc: StartFuncFromCreateNoSync } = require("./CreateNoSync/entryFile");
const { StartFunc: StartFuncFromPost } = require("./Post/entryFile");

const StartFunc = () => {
    StartFuncCreate();
    StartFuncCheck();
    StartFuncFromCreateNoSync();
    StartFuncFromPost();
};

module.exports = { StartFunc };
