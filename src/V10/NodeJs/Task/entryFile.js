const { StartFunc: StartFuncFromNewTask } = require("./NewTask/entryFile");
const { StartFunc: StartFuncFromGroupByColumn } = require("./GroupByColumn/entryFile");

const StartFunc = () => {
    StartFuncFromNewTask();
    StartFuncFromGroupByColumn();
};

module.exports = { StartFunc };
