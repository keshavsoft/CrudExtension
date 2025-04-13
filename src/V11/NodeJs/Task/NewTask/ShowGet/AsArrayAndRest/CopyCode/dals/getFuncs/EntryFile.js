import { StartFunc as ReadFromFile } from '../../kLowDb/getFunc.js';

let GetFunc = () => {
    let LocalFromLowDb = ReadFromFile();

    return LocalFromLowDb;
};

export {
    GetFunc
};