const fse = require('fs-extra');

const CommonFileName = "EntryFile.js";

const StartFunc = ({ inEditorPath, inNewRoute }) => {
    try {
        const selectedFolder = inEditorPath;

        LocalFuncWriteFile({ inNewRoute, inEditorPath: selectedFolder });
    } catch (error) {
        return error.message;
    };
};

const LocalFuncWriteFile = ({ inNewRoute, inEditorPath }) => {
    const LocalNewRoute = inNewRoute;

    const LocalContentToWrite = `import express from 'express';

    var router = express.Router();
    
    import { router as RouterFor${LocalNewRoute} } from './${LocalNewRoute}/routes.js';
    
    router.use('/${LocalNewRoute}', RouterFor${LocalNewRoute});
    
    export { router };`;

    const LocalFileName = CommonFileName;

    const activeFileFolderPath = require('path').dirname(inEditorPath);

    fse.writeFileSync(`${activeFileFolderPath}/${LocalFileName}`, LocalContentToWrite, 'utf-8');
};

module.exports = { StartFunc };
