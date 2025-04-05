import {
    postDefaultFunc as postDefaultFuncFromRepo
} from '../../repos/postFuncs/EntryFile.js';

let postFilterDataFromBodyFunc = async (req, res) => {
    let LocalRequestBody = req.body;
    const LocalGroupByColumn = req.params.GroupByColumn;

    let LocalFromRepo = await postDefaultFuncFromRepo({
        inRequestBody: LocalRequestBody,
        inGroupByColumn: LocalGroupByColumn
    });

    if (LocalFromRepo === false) {
        res.status(500).send(LocalFromRepo.KReason);
        return;
    };

    res.status(200).json(LocalFromRepo.JsonData);
};

export {
    postFilterDataFromBodyFunc
};