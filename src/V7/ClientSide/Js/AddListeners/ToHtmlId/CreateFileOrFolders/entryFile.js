const fse = require('fs-extra');

const { StartFunc: StartFuncCreateHtmlIdFolder } = require("./CreateHtmlIdFolder/entryFile");
const { StartFunc: StartFuncToActiveEditor } = require("./ToActiveEditor/entryFile");

const StartFunc = async ({ inActiveEditorPath, inHtmlIdNeeded }) => {
    const LocalFromActiveEditor = await StartFuncToActiveEditor({ inActiveEditorPath, inHtmlIdNeeded });

    if (LocalFromActiveEditor === false) {

    } else {
        const activeFileFolderPath = require('path').dirname(inActiveEditorPath);

        if (await fse.pathExists(activeFileFolderPath)) {
            await StartFuncCreateHtmlIdFolder({ inCreatePath: activeFileFolderPath, inHtmlIdNeeded });
        };
    };
};

module.exports = { StartFunc };
