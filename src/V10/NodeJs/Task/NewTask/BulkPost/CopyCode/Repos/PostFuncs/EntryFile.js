import {
    PostFunc as PostFuncDal
} from '../../Dals/PostFuncs/EntryFile.js';

let PostFunc = ({ inArrayToInsert }) => {
    return PostFuncDal({ inArrayToInsert });
};

export {
    PostFunc
};