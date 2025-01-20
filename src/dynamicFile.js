const vscode = require('vscode');
// const fs = require('fs').promises;
const path = require('path');
const fse = require('fs-extra');
const { getSelectedFolderPath } = require('./CommonFuncs/getSelectedFolderPath');
const CommonCopyCodeSourcePath = path.join(__dirname, "..", 'content', "FetchAsPost");


async function findConfigJson(workspaceRoot) {
    const files = await fse.readdir(workspaceRoot, { withFileTypes: true });

    for (const file of files) {
        const filePath = path.join(workspaceRoot, file.name);
        if (file.isDirectory()) {
            const result = await findConfigJson(filePath);
            if (result) return result;
        } else if (file.name.toLowerCase() === 'config.json') {
            return filePath;
        }
    }
    return null;
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

const StartFuncDynamic = async () => {
    try {
        const selectedFolder = await getSelectedFolderPath();

        if (!selectedFolder) throw new Error('No folder selected, and no active file found in the workspace.');

        const folderName = await vscode.window.showInputBox({ prompt: 'Enter the name of the folder to create:' });

        if (!folderName) throw new Error('Folder name was not provided.');

        const newFolderPath = path.join(selectedFolder, folderName);

        // Copy FetchAsPost content
        await fse.copy(CommonCopyCodeSourcePath, newFolderPath);

        // Locate fetchFuncs.js in the copied directory
        const fetchFuncsPath = path.join(newFolderPath, 'fetchFuncs.js');
        if (!await fse.pathExists(fetchFuncsPath)) {
            throw new Error('fetchFuncs.js not found in the copied folder.');
        };

        // Locate config.json in the workspace
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            throw new Error('No workspace folder is open.');
        };

        const configJsonPath = await findConfigJson(workspaceFolders[0].uri.fsPath);
        if (!configJsonPath) {
            throw new Error('config.json not found in the workspace.');
        };

        // Update fetchFuncs.js with the correct config.json path
        await updateFetchFuncs(fetchFuncsPath, configJsonPath);

        vscode.window.showInformationMessage(`Folder created and contents copied to: ${newFolderPath}`);
    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
    };
};

module.exports = { StartFuncDynamic };