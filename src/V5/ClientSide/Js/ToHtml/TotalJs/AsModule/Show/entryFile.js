const { StartFunc: StartFuncFixedColumns } = require("./FixedColumns/entryFile");
const { StartFunc: StartFuncColumnsFromFetch } = require("./ColumnsFromFetch/entryFile");
const { StartFunc: StartFuncColsFromFetAftDest } = require("./ColsFromFetAftDest/entryFile");

const StartFunc = () => {
    StartFuncFixedColumns();
    StartFuncColumnsFromFetch();
    StartFuncColsFromFetAftDest();
};

module.exports = { StartFunc };
