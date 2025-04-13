const { StartFunc: StartFuncFromAsArray } = require("./AsArray/entryFile");
const { StartFunc: StartFuncFromAsArrayAndRest } = require("./AsArrayAndRest/entryFile");

const StartFunc = () => {
    StartFuncFromAsArray();
    StartFuncFromAsArrayAndRest();
};

module.exports = { StartFunc };