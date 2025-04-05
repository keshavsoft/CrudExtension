import {
    postDefaultFunc as postDefaultFuncFromDal,
} from '../../dals/postFuncs/EntryFile.js';

let postDefaultFunc = ({ inRequestBody }) => {
    return postDefaultFuncFromDal({ inRequestBody });
};

export {
    postDefaultFunc
};