const fs = require('fs');

const StartFunc = async ({ inCreatePath, inHtmlIdNeeded }) => {
    const LocalToCreatePath = inCreatePath;

    const LocalContentToInsert = [
        `import { StartFunc as StartFuncFrom${inHtmlIdNeeded} } from './${inHtmlIdNeeded}/EntryFile.js';`,
        "",
        "const StartFunc = () => {",
        `\tStartFuncFrom${inHtmlIdNeeded}();`,
        "};",
        "",
        "export { StartFunc };"
    ];

    await fs.writeFileSync(LocalToCreatePath, LocalContentToInsert.join('\n'));
};

module.exports = { StartFunc };