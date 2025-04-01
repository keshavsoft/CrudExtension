import { StartFunc as ReadFromFile } from '../../kLowDb/ReadFromFile/getFunc.js';

let GetFunc = () => {
    let LocalFromLowDb = ReadFromFile();

    return LocalFromLowDb;
};

export {
    GetFunc
};