const { StartFunc: StartFuncFromAsIs } = require("./ImageAndMail/entryFile");

const StartFunc = () => {
    StartFuncFromAsIs();
};

module.exports = { StartFunc };
