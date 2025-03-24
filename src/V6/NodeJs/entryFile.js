const { StartFunc: StartFuncEndPoints } = require("./EndPoints/entryFile");
const { StartFunc: StartFuncFromTask } = require("./Task/entryFile");

const StartFunc = () => {
    StartFuncEndPoints();
    StartFuncFromTask();
};

module.exports = { StartFunc };
