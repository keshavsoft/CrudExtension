const fs = require('fs');
const vscode = require('vscode');

const StartFunc = async ({ inCreatePath, inHtmlIdNeeded }) => {
    const LocalToCreatePath = inCreatePath;
    const LocalHtmlIdNeeded = inHtmlIdNeeded;

    await LocalFuncCheckFile({
        inCreatePath: LocalToCreatePath,
        inHtmlIdNeeded: LocalHtmlIdNeeded
    });
};

const LocalFuncCheckFile = async ({ inCreatePath, inHtmlIdNeeded }) => {
    const LocalToCreatePath = inCreatePath;
    const LocalHtmlIdNeeded = inHtmlIdNeeded;
    const LocalPathNeeded = `${LocalToCreatePath}/AddListeners/entryFile.js`;

    try {
        fs.accessSync(LocalPathNeeded, fs.constants.F_OK);

        vscode.window.showInformationMessage(`${LocalPathNeeded} folder is already present!`);
    } catch (err) {
        LocalCreateFile({ inCreatePath: LocalToCreatePath, inHtmlIdNeeded: LocalHtmlIdNeeded });
    };
};

const LocalCreateFile = async ({ inCreatePath, inHtmlIdNeeded }) => {
    const LocalToCreatePath = inCreatePath;
    const LocalHtmlIdNeeded = inHtmlIdNeeded;

    const LocalContentToInsert = [
        `import { StartFunc as StartFuncAddListeners } from './${LocalHtmlIdNeeded}/entryFile.js';`,
        "",
        "let StartFunc = () => {",
        `\tStartFuncAddListeners();`,
        "};",
        "",
        "export { StartFunc };"
    ];

    await fs.writeFileSync(`${LocalToCreatePath}/AddListeners/entryFile.js`, LocalContentToInsert.join('\n'));
};

module.exports = { StartFunc };
