const vscode = require('vscode');
const fs = require('fs');

const StartFunc = async ({ inCreatePath, inHtmlIdNeeded }) => {
    const LocalToCreatePath = inCreatePath;
    const LocalHtmlIdNeeded = inHtmlIdNeeded;
    const LocalPathNeeded = `${LocalToCreatePath}/AddListeners/${LocalHtmlIdNeeded}`;

    try {
        fs.accessSync(LocalPathNeeded, fs.constants.F_OK);

        vscode.window.showInformationMessage(`${LocalPathNeeded} folder is already present!`);
    } catch (err) {
        await fs.mkdirSync(LocalPathNeeded);
        await LocalFuncForButtonClickFile({
            inCreatePath: LocalToCreatePath,
            inHtmlIdNeeded: LocalHtmlIdNeeded
        });

        // await LocalFuncForAddListenersAndHtmlNeededEntryFile({
        //     inCreatePath: LocalToCreatePath,
        //     inHtmlIdNeeded: LocalHtmlIdNeeded
        // });

        // await LocalFuncForEntryFile({ inCreatePath, inHtmlIdNeeded });
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

    await fs.writeFileSync(`${LocalToCreatePath}/AddListeners/${inHtmlIdNeeded}/ButtonClickFunc.js`, LocalContentToInsert.join('\n'));
};

const LocalFuncForEntryFile = async ({ inCreatePath, inHtmlIdNeeded }) => {
    const LocalToCreatePath = inCreatePath;
    const LocalHtmlIdNeeded = inHtmlIdNeeded;

    const LocalContentToInsert = [
        "import { StartFunc as StartFuncFromButtonClickFunc } from './ButtonClickFunc.js';",
        "",
        "let StartFunc = () => {",
        `\tconst jVarLocalHtmlId = '${LocalHtmlIdNeeded}';`,
        "\tconst button = document.getElementById(jVarLocalHtmlId);",
        "",
        "\tbutton.addEventListener('click', StartFuncFromButtonClickFunc);",
        "};",
        "",
        "export { StartFunc };"
    ];

    await fs.writeFileSync(`${LocalToCreatePath}/AddListeners/${LocalHtmlIdNeeded}/entryFile.js`, LocalContentToInsert.join('\n'));
};

module.exports = { StartFunc };
