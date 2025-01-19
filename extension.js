// extension.js
const vscode = require('vscode');
const { createFolder } = require('./src/createFolder');

const activate = async  (context) => {
    console.log('Congratulations, your extension "create-folder" is now active!');
    // command to create a folder
    const createFolderCommand = vscode.commands.registerCommand('create-folder.createFolder', createFolder);
    context.subscriptions.push(createFolderCommand);

    const clientJsFetchAsPost = vscode.commands.registerCommand('clientJs.FetchAsPost', createFolder);
    context.subscriptions.push(clientJsFetchAsPost);
};

function deactivate() {};

module.exports = {
    activate,
    deactivate,
};