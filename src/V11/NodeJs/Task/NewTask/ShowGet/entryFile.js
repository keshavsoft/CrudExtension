const { StartFunc: StartFuncFromAsArray } = require("./AsArray/entryFile");

const StartFunc = () => {
    StartFuncFromAsArray();
};

module.exports = { StartFunc };