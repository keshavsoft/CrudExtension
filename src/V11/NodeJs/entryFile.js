const { StartFunc: StartFuncEndPoints } = require("./EndPoints/entryFile");
const { StartFunc: StartFuncFromTask } = require("./Task/entryFile");
const { StartFunc: StartFuncFromSubRoute } = require("./SubRoute/entryFile");

const StartFunc = () => {
    StartFuncEndPoints();
    StartFuncFromTask();
    StartFuncFromSubRoute();
};

module.exports = { StartFunc };
