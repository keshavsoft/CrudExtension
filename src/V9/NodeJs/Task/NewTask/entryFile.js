const { StartFunc: StartFuncCreate } = require("./Create/entryFile");
const { StartFunc: StartFuncFromShowGet } = require("./ShowGet/entryFile");
const { StartFunc: StartFuncFromAlterPut } = require("./AlterPut/entryFile");

const StartFunc = () => {
    StartFuncCreate();
    StartFuncFromShowGet();
    StartFuncFromAlterPut();
};

module.exports = { StartFunc };
