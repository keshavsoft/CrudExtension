import express from 'express';

var router = express.Router();

import {
    PostFunc
} from '../../Controllers/PostFuncs/EntryFile.js';

import {
    MultiInsertWithCheck as MultiInsertWithCheckMiddleware
} from '../../Middlewares/PostFuncs/EntryFile.js';

router.post('/', MultiInsertWithCheckMiddleware, PostFunc);

export { router };