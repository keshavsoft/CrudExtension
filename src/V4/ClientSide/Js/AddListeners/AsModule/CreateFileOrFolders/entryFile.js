const fs = require('fs');

const { StartFunc: StartFuncAddListeners } = require("./addListeners");

const StartFunc = async ({ inCreatePath, inHtmlIdNeeded }) => {
    await StartFuncAddListeners({ inCreatePath, inHtmlIdNeeded });
    await LocalFuncForEntryFile({ inCreatePath, inHtmlIdNeeded });
};

const LocalFuncForEntryFile = async ({ inCreatePath, inHtmlIdNeeded }) => {
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
