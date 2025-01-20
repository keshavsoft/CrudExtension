// extension.js
const vscode = require('vscode');
const { createFolder } = require('./src/createFolder');
const { StartFunc: StartFuncPost } = require('./src/ClientSide/Js/Fetch/Post/entryFile');
const { StartFuncDynamic: StartFuncPostDynamic } = require('./src/dynamicFile');
const { ConfigFunc: CopyConfig } = require('./src/configFile');

const activate = async (context) => {
    console.log('Congratulations, your extension "create-folder" is now active!');
    // command to create a folder
    const createFolderCommand = vscode.commands.registerCommand('create-folder.createFolder', createFolder);
    context.subscriptions.push(createFolderCommand);

    const clientJsFetchAsPost = vscode.commands.registerCommand('clientJs.FetchAsPost', StartFuncPost);
    context.subscriptions.push(clientJsFetchAsPost);

    const dynamicFetchAsPost = vscode.commands.registerCommand('dynamic.FetchAsPost', StartFuncPostDynamic);
    context.subscriptions.push(dynamicFetchAsPost);

    const configCopyConfigFile = vscode.commands.registerCommand('config.CopyConfigFile', CopyConfig);
    context.subscriptions.push(configCopyConfigFile);

    vscode.commands.registerCommand('extension.copyToClipboard', async () => {
        try {
            const text = "Hello, Clipboard!";
            await vscode.env.clipboard.writeText(text);
            console.log("Successfully copied:", text);
        } catch (error) {
            console.error("Clipboard operation failed:", error);
        }
    });
};

function deactivate() { };

module.exports = {
    activate,
    deactivate,
};