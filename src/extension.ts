// extension.ts
import * as vscode from 'vscode';
import { helloWorld } from './helloworld';
import { createFolder } from './RegisterCommands/createFolder';
import { createFile } from './RegisterCommands/createFile';
import { replaceFolder } from './RegisterCommands/replaceFolder';
import { copyFolders } from './RegisterCommands/ClientSide/ClientJs/FetchAsModule/entryFile';

export function activate(context: vscode.ExtensionContext) {
    let disposableHello = vscode.commands.registerCommand('crudextension.helloWorld', helloWorld);
    let disposableCreateFolder = vscode.commands.registerCommand('KS-CreateFolder', createFolder);
    let disposableCreateFile = vscode.commands.registerCommand('KS-CreateFile', createFile);
    let disposableReplaceFolder = vscode.commands.registerCommand('KS-ReplaceFolder', replaceFolder);
    let LocalCopyFolders = vscode.commands.registerCommand('KS-CopyFolders', () => {
        copyFolders({ inRootPath: __dirname });
    });

    context.subscriptions.push(disposableHello);
    context.subscriptions.push(disposableCreateFolder);
    context.subscriptions.push(disposableCreateFile);
    context.subscriptions.push(disposableReplaceFolder);
    context.subscriptions.push(LocalCopyFolders);
};

export function deactivate() { }