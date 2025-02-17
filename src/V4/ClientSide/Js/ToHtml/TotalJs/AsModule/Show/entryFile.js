const { StartFunc: StartFuncFixedColumns } = require("./FixedColumns/entryFile");
const { StartFunc: StartFuncColumnsFromFetch } = require("./ColumnsFromFetch/entryFile");

const StartFunc = () => {
    StartFuncFixedColumns();
    StartFuncColumnsFromFetch();
};

module.exports = { StartFunc };
