import express from 'express';

var router = express.Router();

import {
    PostImageAndMailFunc
} from '../../controllers/postFuncs/EntryFile.js';

import {
    StartFunc as middlewareUsingMulter
} from '../../middlewares/postFuncs/UsingMulter.js';

router.post('/ImageAndMail', middlewareUsingMulter.single("image"), PostImageAndMailFunc);

export { router };
