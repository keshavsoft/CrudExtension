const fse = require('fs-extra');

const { StartFunc: StartFuncCreateHtmlIdFolder } = require("./CreateHtmlIdFolder/entryFile");
const { StartFunc: StartFuncToActiveEditor } = require("./ToActiveEditor/entryFile");

const StartFunc = async ({ inActiveEditorPath, inHtmlIdNeeded }) => {
    const activeFileFolderPath = require('path').dirname(inActiveEditorPath);

    if (await fse.pathExists(activeFileFolderPath)) {
        await StartFuncCreateHtmlIdFolder({ inCreatePath: activeFileFolderPath, inHtmlIdNeeded });
    };

    await StartFuncToActiveEditor({ inActiveEditorPath, inHtmlIdNeeded });
};

module.exports = { StartFunc };
