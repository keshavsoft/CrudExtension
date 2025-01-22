// extension.js
const vscode = require('vscode');
const { createFolder } = require('./src/createFolder');
const { StartFunc: StartFuncPost } = require('./src/ClientSide/Js/Fetch/Post/entryFile');
const { StartFunc: StartFuncGet } = require('./src/ClientSide/Js/Fetch/Get/entryFile');
const { StartFunc: StartFuncGetConfigEndPoint } = require('./src/ClientSide/Js/Fetch/Get/configEndPoint');
const { StartFunc: StartFuncGetShowDataOnly } = require('./src/ClientSide/Js/Fetch/Get/showDataOnly');
const { StartFunc: StartFuncToHtml } = require('./src/ClientSide/Js/ToHtml/Anchor/ByClass/RefreshBSTableClass/addListener');
const { StartFunc: StartFuncToHtmladdListenerWithUrl } = require('./src/ClientSide/Js/ToHtml/Anchor/ByClass/RefreshBSTableClass/addListenerWithUrl');

const { StartFuncDynamic: StartFuncPostDynamic } = require('./src/dynamicFile');
const { ConfigFunc: CopyConfig } = require('./src/configFile');

const activate = async (context) => {
    console.log('Congratulations, your extension "create-folder" is now active!');
    // command to create a folder
    const createFolderCommand = vscode.commands.registerCommand('create-folder.createFolder', createFolder);
    context.subscriptions.push(createFolderCommand);

    const clientJsFetchAsPost = vscode.commands.registerCommand('clientJs.FetchAsPost', StartFuncPost);
    context.subscriptions.push(clientJsFetchAsPost);

    const clientJsFetchAsGet = vscode.commands.registerCommand('clientJs.FetchAsGet', StartFuncGet);
    context.subscriptions.push(clientJsFetchAsGet);

    const clientJsFetchAsGetConfigEndPoint = vscode.commands.registerCommand('clientJs.FetchAsGetConfigEndPoint', StartFuncGetConfigEndPoint);
    context.subscriptions.push(clientJsFetchAsGetConfigEndPoint);

    const clientJsFetchAsGetShowDataOnly = vscode.commands.registerCommand('clientJs.FetchAsGetShowDataOnly', StartFuncGetShowDataOnly);
    context.subscriptions.push(clientJsFetchAsGetShowDataOnly);

    const clientJsToHtmlAnchorByClassRefreshBSTableClass = vscode.commands.registerCommand('clientJs.ToHtml.Anchor.ByClass.RefreshBSTableClass', StartFuncToHtml);
    context.subscriptions.push(clientJsToHtmlAnchorByClassRefreshBSTableClass);

    const clientJsToHtmladdListenerWithUrl = vscode.commands.registerCommand('clientJs.ToHtml.Anchor.ByClass.RefreshBSTableClass.WithUrl', StartFuncToHtmladdListenerWithUrl);
    context.subscriptions.push(clientJsToHtmladdListenerWithUrl);

    

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

    vscode.commands.registerCommand('extension.Path', async () => {
        vscode.window.showInformationMessage(__dirname);
    });
};

function deactivate() { };

module.exports = {
    activate,
    deactivate,
};