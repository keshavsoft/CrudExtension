import {
    GetDataCountFunc as GetDataCountFuncRepo
} from '../../repos/getFuncs/EntryFile.js';

let GetDataCountFunc = async (req, res) => {
    let LocalFromRepo = await GetDataCountFuncRepo();

    if (LocalFromRepo.KTF === false) {
        res.status(500).send(LocalFromRepo.KReason);
        return;
    };

    res.status(200).json(LocalFromRepo.Count);
};

export {
    GetDataCountFunc
};