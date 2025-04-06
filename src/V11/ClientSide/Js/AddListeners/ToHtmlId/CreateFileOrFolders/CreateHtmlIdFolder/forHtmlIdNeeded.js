const vscode = require('vscode');
const fs = require('fs');

const StartFunc = async ({ inCreatePath, inHtmlIdNeeded }) => {
    const LocalToCreatePath = inCreatePath;
    const LocalHtmlIdNeeded = inHtmlIdNeeded;
    const LocalPathNeeded = `${LocalToCreatePath}/${LocalHtmlIdNeeded}`;

    try {
        fs.accessSync(LocalPathNeeded, fs.constants.F_OK);

        vscode.window.showInformationMessage(`${LocalPathNeeded} folder is already present!`);
    } catch (err) {
        await fs.mkdirSync(LocalPathNeeded);
        
        await LocalFuncForButtonClickFile({
            inCreatePath: LocalToCreatePath,
            inHtmlIdNeeded: LocalHtmlIdNeeded
        });

        await LocalFuncForEntryFile({
            inCreatePath: LocalToCreatePath,
            inHtmlIdNeeded: LocalHtmlIdNeeded
        });
    };
};

const LocalFuncForButtonClickFile = async ({ inCreatePath, inHtmlIdNeeded }) => {
    const LocalToCreatePath = inCreatePath;

    const LocalContentToInsert = [
        "let StartFunc = () => {",
        "};",
        "",
        "export { StartFunc };"
    ];

    await fs.writeFileSync(`${LocalToCreatePath}/${inHtmlIdNeeded}/ButtonClickFunc.js`, LocalContentToInsert.join('\n'));
};

const LocalFuncForEntryFile = async ({ inCreatePath, inHtmlIdNeeded }) => {
    const LocalToCreatePath = inCreatePath;

    const LocalContentToInsert = [
        "import { StartFunc as StartFuncButtonClickFunc } from './ButtonClickFunc.js';",
        "",
        "let StartFunc = () => {",
        `\tlet jVarLocalHtmlId = document.getElementById('${inHtmlIdNeeded}');`,
        "",
        "\tif (jVarLocalHtmlId === null === false) {",
        "\t\tjVarLocalHtmlId.addEventListener('click', StartFuncButtonClickFunc);",
        "\t};",
        "};",
        "",
        "export { StartFunc };"
    ];

    await fs.writeFileSync(`${LocalToCreatePath}/${inHtmlIdNeeded}/entryFile.js`, LocalContentToInsert.join('\n'));
};

module.exports = { StartFunc };
