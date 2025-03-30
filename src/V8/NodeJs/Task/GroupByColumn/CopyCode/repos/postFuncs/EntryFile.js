import {
    postDefaultFunc as postDefaultFuncFromDal,
} from '../../dals/postFuncs/EntryFile.js';

let postDefaultFunc = async ({ inRequestBody, inGroupByColumn }) => {
    return postDefaultFuncFromDal({ inRequestBody, inGroupByColumn });
};

export {
    postDefaultFunc
};