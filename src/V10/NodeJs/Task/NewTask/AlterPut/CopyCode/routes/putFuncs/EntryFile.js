import express from 'express';

var router = express.Router();

import {
    PutAsIsFunc
} from '../../controllers/putFuncs/EntryFile.js';

router.put('/AsIs/:id', PutAsIsFunc);

export { router };