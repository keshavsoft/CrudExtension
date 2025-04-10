const { StartFunc: StartFuncFromStaticColumns } = require("./StaticColumns/entryFile");

const StartFunc = () => {
    StartFuncFromStaticColumns();
};

module.exports = { StartFunc };
