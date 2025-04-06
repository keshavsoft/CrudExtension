import { StartFunc as BulkInsert } from '../../KLowDb/entryFile.js';

let PostFunc = ({ inArrayToInsert }) => {
    return BulkInsert({ inArrayFromRequest: inArrayToInsert });
};

export {
    PostFunc
};