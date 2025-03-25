const { StartFunc: StartFuncAsModule } = require("./AsModule/entryFile");
const { StartFunc: StartFuncFromToHtmlId } = require("./ToHtmlId/entryFile");

const StartFunc = () => {
    StartFuncAsModule();
    StartFuncFromToHtmlId();
};

module.exports = { StartFunc };
