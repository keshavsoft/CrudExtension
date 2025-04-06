import {
    GetDataCountFunc as GetDataCountFuncDal
} from '../../dals/getFuncs/EntryFile.js';

let GetDataCountFunc = async () => {
    return GetDataCountFuncDal();
};

export {
    GetDataCountFunc
};