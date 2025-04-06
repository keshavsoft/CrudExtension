import { StartFunc as UpdateRowAsIs } from '../../kLowDb/putFunc.js';

let PutAsIsFunc = ({ inDataToUpdate, inId }) => {
    return UpdateRowAsIs({ inDataToUpdate, inId });
};

export {
    PutAsIsFunc
};