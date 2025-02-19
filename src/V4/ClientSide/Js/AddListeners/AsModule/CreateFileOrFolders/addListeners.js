const fs = require('fs');

const StartFunc = async ({ inCreatePath, inHtmlIdNeeded }) => {
    const LocalToCreatePath = inCreatePath;

    await fs.mkdirSync(`${LocalToCreatePath}/AddListeners`);
    await fs.mkdirSync(`${LocalToCreatePath}/AddListeners/${inHtmlIdNeeded}`);
    await LocalFuncForButtonClickFile({ inCreatePath, inHtmlIdNeeded });
    await LocalFuncForEntryFile({ inCreatePath, inHtmlIdNeeded });
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
