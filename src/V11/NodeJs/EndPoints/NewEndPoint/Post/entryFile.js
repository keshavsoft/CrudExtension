const { StartFunc: StartFuncFromCreateNoSync } = require("./CreateNoSync/entryFile");

const StartFunc = () => {
    StartFuncFromCreateNoSync();
};

module.exports = { StartFunc };
