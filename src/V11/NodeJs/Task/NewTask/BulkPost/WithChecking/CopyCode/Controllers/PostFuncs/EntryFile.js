import {
    PostFunc as PostFuncRepo,
} from '../../Repos/PostFuncs/EntryFile.js';

let PostFunc = (req, res) => {
    let LocalBody = req.body;

    let LocalFromRepo = PostFuncRepo({ inArrayToInsert: LocalBody });

    if (LocalFromRepo.KTF === false) {
        res.status(500).send(LocalFromRepo.KReason);
        return;
    };

    res.status(200).send(LocalFromRepo.InsertedRows.toString());
};

export {
    PostFunc
};