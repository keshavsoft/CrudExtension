const { StartFunc: StartFuncFromGet } = require("./Get/entryFile");

const StartFunc = () => {
    StartFuncFromGet();
};

module.exports = { StartFunc };
