import { StartFunc as StartFuncFromSelectedColumns } from '../../kLowDb/readFromFile.js';

let postDefaultFunc = ({ inRequestBody }) => {
    let LocalFromLowDb = StartFuncFromSelectedColumns({ inRequestBody });

    if (LocalFromLowDb.KTF === false) {
        return false;
    };

    return LocalFromLowDb;
};

export {
    postDefaultFunc
};