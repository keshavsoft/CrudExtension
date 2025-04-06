import {
    postDefaultFunc as postDefaultFuncFromRepo
} from '../../repos/postFuncs/EntryFile.js';

let postFilterDataFromBodyFunc = (req, res) => {
    let LocalRequestBody = req.body;

    let LocalFromRepo = postDefaultFuncFromRepo({ inRequestBody: LocalRequestBody });

    if (LocalFromRepo === false) {
        res.status(500).send(LocalFromRepo.KReason);
        return;
    };

    res.status(200).json(LocalFromRepo.JsonData);
};

export {
    postFilterDataFromBodyFunc
};