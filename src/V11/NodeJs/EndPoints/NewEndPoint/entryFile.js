const { StartFunc: StartFuncCheck } = require("./Check/entryFile");
const { StartFunc: StartFuncFromPost } = require("./Post/entryFile");
const { StartFunc: StartFuncFromGet } = require("./Get/entryFile");

const StartFunc = () => {
    StartFuncCheck();
    StartFuncFromPost();
    StartFuncFromGet();
};

module.exports = { StartFunc };
