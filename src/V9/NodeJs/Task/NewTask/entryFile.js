const { StartFunc: StartFuncCreate } = require("./Create/entryFile");
const { StartFunc: StartFuncFromShowGet } = require("./ShowGet/entryFile");

const StartFunc = () => {
    StartFuncCreate();
    StartFuncFromShowGet();
};

module.exports = { StartFunc };
