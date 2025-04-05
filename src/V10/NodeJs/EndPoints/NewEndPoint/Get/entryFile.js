const { StartFunc: StartFuncFromCreateNoSync } = require("./CreateNoSync/entryFile");
const { StartFunc: StartFuncFromCreateAsync } = require("./CreateAsync/entryFile");

const StartFunc = () => {
    StartFuncFromCreateNoSync();
    StartFuncFromCreateAsync();
};

module.exports = { StartFunc };
