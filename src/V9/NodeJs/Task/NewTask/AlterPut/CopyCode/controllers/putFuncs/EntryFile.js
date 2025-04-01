import {
  PutAsIsFunc as PutAsIsFuncRepo
} from "../../repos/putFuncs/EntryFile.js";

let PutAsIsFunc = async (req, res) => {
  let LocalDataToUpdate = req.body;

  let LocalIfFromParam = req.params.id;

  let LocalFromRepo = await PutAsIsFuncRepo({
    inDataToUpdate: LocalDataToUpdate,
    inId: LocalIfFromParam,
  });

  if (LocalFromRepo.KTF === false) {
    res.status(500).send(LocalFromRepo.KReason);
    return;
  };

  res.json(LocalFromRepo);
};

export { PutAsIsFunc };
