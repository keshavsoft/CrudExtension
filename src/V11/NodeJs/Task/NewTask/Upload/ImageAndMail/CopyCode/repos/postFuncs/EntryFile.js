import {
    PostImageAndMailFunc as PostImageAndMailFuncDal,
} from '../../dals/postFuncs/EntryFile.js';

let PostImageAndMailFunc = async (inPostBody) => {
    const LocalFromDal = await PostImageAndMailFuncDal(inPostBody);

    return await LocalFromDal;
};

export {
    PostImageAndMailFunc
};
