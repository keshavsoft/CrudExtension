const { getSelectedFolderPath } = require('../../../../../../../CommonFuncs/getSelectedFolderPath');

const StartFunc = async ({ inArrayToFill }) => {
    let LocalObjectToReturn = {};

    LocalObjectToReturn.command = "src/V1/ClientSide/Js/ToHtml/TotalJs/AsModule/Show";
    LocalObjectToReturn.title = "src/V1/ClientSide/Js/ToHtml/TotalJs/AsModule/Show";

    inArrayToFill.push(LocalObjectToReturn);

    return inArrayToFill;
};

const activateFunc = ({ inVsCode }) => {
    inVsCode.commands.registerCommand('src/V1/ClientSide/Js/ToHtml/TotalJs/AsModule/Show', async () => {
        LocalFuncToActivate({ inVsCode })
    });
};

const LocalFuncToActivate = async ({ inVsCode }) => {
    try {
        const selectedFolder = await getSelectedFolderPath({ inVsCode });

        if (!selectedFolder) throw new Error('No folder selected, and no active file found in the workspace.');

        inVsCode.window.showInformationMessage(`------------- folder: ${selectedFolder}`);
    } catch (error) {
        inVsCode.window.showErrorMessage(`Error: ${error.message}`);
    };
};

module.exports = { StartFunc, activateFunc };
