const { StartFunc: StartFuncFromNewTask } = require("./NewTask/entryFile");
const { StartFunc: StartFuncFromSelectedColumns } = require("./SelectedColumns/entryFile");
const { StartFunc: StartFuncFromGroupByColumn } = require("./GroupByColumn/entryFile");

const StartFunc = () => {
    StartFuncFromNewTask();
    StartFuncFromSelectedColumns();
    StartFuncFromGroupByColumn();
};

module.exports = { StartFunc };
