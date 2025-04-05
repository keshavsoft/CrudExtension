import {
    postDefaultFunc as postDefaultFuncFromDal,
} from '../../dals/postFuncs/EntryFile.js';

let postDefaultFunc = async ({ inRequestBody }) => {
    return postDefaultFuncFromDal({ inRequestBody });
};

export {
    postDefaultFunc
};