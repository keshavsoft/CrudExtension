const { StartFunc: StartFuncAsModule } = require("./AsModule/entryFile");
const { StartFunc: StartFuncFromCommonConfig } = require("./CommonConfig/entryFile");

const StartFunc = () => {
    StartFuncAsModule();
    StartFuncFromCommonConfig();
};

module.exports = { StartFunc };
