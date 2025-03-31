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
        LocalFuncCreateFile({ inCreatePath: LocalToCreatePath, inHtmlIdNeeded: LocalHtmlIdNeeded });
    };
};

const LocalFuncCreateFile = async ({ inCreatePath, inHtmlIdNeeded }) => {
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

const LocalFuncAlterFile = async ({ inCreatePath, inHtmlIdNeeded }) => {
    const LocalToCreatePath = inCreatePath;
    const LocalHtmlIdNeeded = inHtmlIdNeeded;
    const LocalPathNeeded = `${LocalToCreatePath}/AddListeners/entryFile.js`;

    const fetchFuncsContent = await fse.readFile(fetchFuncsPath, 'utf8');

    const LocalContentToInsert = [
        `import { StartFunc as StartFuncAddListeners } from './${LocalHtmlIdNeeded}/entryFile.js';`,
        "",
        "let StartFunc = () => {",
        `\tStartFuncAddListeners();`,
        "};",
        "",
        "export { StartFunc };"
    ];

    await fs.writeFileSync(LocalPathNeeded, LocalContentToInsert.join('\n'));
};

async function updateFetchFuncs(fetchFuncsPath, configJsonPath) {
    const fetchFuncsContent = await fse.readFile(fetchFuncsPath, 'utf8');
    const relativePath = path.relative(path.dirname(fetchFuncsPath), configJsonPath).replace(/\\/g, '/');

    const updatedContent = fetchFuncsContent.replace(
        /import ConfigJson from '.*Config\.json' with \{type: 'json'\};/,
        `import ConfigJson from '${relativePath}' with {type: 'json'};`
    );

    await fse.writeFile(fetchFuncsPath, updatedContent, 'utf8');
};

module.exports = { StartFunc };
