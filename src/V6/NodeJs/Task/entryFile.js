const { StartFunc: StartFuncFromNewTask } = require("./NewTask/entryFile");
const { StartFunc: StartFuncFromSelectedColumns } = require("./SelectedColumns/entryFile");

const StartFunc = () => {
    StartFuncFromNewTask();
    StartFuncFromSelectedColumns();
};

module.exports = { StartFunc };
