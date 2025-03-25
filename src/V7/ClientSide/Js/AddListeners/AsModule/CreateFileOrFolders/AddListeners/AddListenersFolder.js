const vscode = require('vscode');
const fs = require('fs');

const StartFunc = async ({ inCreatePath }) => {
    const LocalToCreatePath = inCreatePath;

    try {
        fs.accessSync(`${LocalToCreatePath}/AddListeners`, fs.constants.F_OK);

        vscode.window.showInformationMessage("AddListeners folder is already present");
    } catch (err) {
        await fs.mkdirSync(`${LocalToCreatePath}/AddListeners`);
    };
};

module.exports = { StartFunc };
