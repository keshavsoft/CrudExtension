import {
  PutAsIsFunc as PutAsIsFuncDal
} from '../../dals/putFuncs/EntryFile.js';

let PutAsIsFunc = async ({ inDataToUpdate, inId }) => {
  return PutAsIsFuncDal({ inDataToUpdate, inId });
};

export { PutAsIsFunc };