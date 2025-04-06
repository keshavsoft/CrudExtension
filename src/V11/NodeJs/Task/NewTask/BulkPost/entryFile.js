const { StartFunc: StartFuncFromWithChecking } = require("./WithChecking/entryFile");
const { StartFunc: StartFuncFromAsIs } = require("./AsIs/entryFile");

const StartFunc = () => {
    StartFuncFromWithChecking();
    StartFuncFromAsIs();
};

module.exports = { StartFunc };
