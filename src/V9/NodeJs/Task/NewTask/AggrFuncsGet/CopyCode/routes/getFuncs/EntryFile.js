import express from 'express';

var router = express.Router();

import {
    GetDataCountFunc
} from '../../controllers/getFuncs/EntryFile.js';

router.get('/Count', GetDataCountFunc);

export { router };