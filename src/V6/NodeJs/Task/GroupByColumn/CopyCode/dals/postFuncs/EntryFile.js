import { StartFunc as StartFuncFromSelectedColumns } from '../../kLowDb/readFromFile.js';

let postDefaultFunc = ({ inRequestBody, inGroupByColumn }) => {
    let LocalFromLowDb = StartFuncFromSelectedColumns({ inRequestBody, inGroupByColumn });

    if (LocalFromLowDb.KTF === false) {
        return false;
    };

    return LocalFromLowDb;
};

export {
    postDefaultFunc
};