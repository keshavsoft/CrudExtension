const { StartFunc: StartClientSide } = require("./ClientSide/entryFile");
const { StartFunc: StartFuncNodeJs } = require("./NodeJs/entryFile");

const StartFunc = () => {
    StartClientSide();
    StartFuncNodeJs();
};

module.exports = { StartFunc };
