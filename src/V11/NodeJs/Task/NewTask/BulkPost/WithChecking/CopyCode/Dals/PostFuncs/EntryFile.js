import { StartFunc as BulkInsert } from '../../KLowDb/EntryFile.js';

let PostFunc = ({ inArrayToInsert }) => {
    return BulkInsert({ inArrayFromRequest: inArrayToInsert });
};

export {
    PostFunc
};