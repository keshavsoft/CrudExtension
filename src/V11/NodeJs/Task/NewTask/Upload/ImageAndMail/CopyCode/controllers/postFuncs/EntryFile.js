import {
    PostImageAndMailFunc as PostImageAndMailFuncRepo,
} from '../../repos/postFuncs/EntryFile.js';

let PostImageAndMailFunc = async (req, res) => {
    if ("Uuid" in req.KeshavSoft === false) {
        res.status(500).send("Error from multer");
        return;
    };

    let LocalBody = req.body;
    var host = req.get('host');
    let protocol = req.protocol;
    let LocalDomainName = `${protocol}://${host}`;

    const LocalFromRepo = await PostImageAndMailFuncRepo({
        inDomainName: LocalDomainName,
        inDataToInsert: LocalBody,
        inpk: req.KeshavSoft.insertedPk,
        inImageName: req.KeshavSoft.Uuid
    });

    res.status(200).send(`${req.KeshavSoft.insertedPk}`);
};

export {
    PostImageAndMailFunc
};
