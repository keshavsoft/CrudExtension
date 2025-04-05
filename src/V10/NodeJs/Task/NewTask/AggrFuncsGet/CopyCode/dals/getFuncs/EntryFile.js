import { StartFunc as getRowCountFunc } from '../../kLowDb/getRowCountFunc.js';

let GetDataCountFunc = () => {
    let LocalFromLowDb = getRowCountFunc();

    return LocalFromLowDb;
};

export {
    GetDataCountFunc
};