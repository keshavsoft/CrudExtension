const { StartFunc: StartFuncCreate } = require("./Create/entryFile");
const { StartFunc: StartFuncFromShowGet } = require("./ShowGet/entryFile");
const { StartFunc: StartFuncFromAlterPut } = require("./AlterPut/entryFile");
const { StartFunc: StartFuncFromAggrFuncsGet } = require("./AggrFuncsGet/entryFile");
const { StartFunc: StartFuncFromSelectedColumns } = require("./SelectedColumns/entryFile");
const { StartFunc: StartFuncFromBulkPost } = require("./BulkPost/entryFile");

const StartFunc = () => {
    StartFuncCreate();
    StartFuncFromShowGet();
    StartFuncFromAlterPut();
    StartFuncFromAggrFuncsGet();
    StartFuncFromSelectedColumns();
    StartFuncFromBulkPost();
};

module.exports = { StartFunc };
