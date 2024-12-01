// extension.ts
import * as vscode from 'vscode';
import { helloWorld } from './helloworld';
import { createFolder } from './RegisterCommands/createFolder';
import { createFile } from './RegisterCommands/createFile';
import { replaceFolder } from './RegisterCommands/replaceFolder';

export function activate(context: vscode.ExtensionContext) {
    let disposableHello = vscode.commands.registerCommand('crudextension.helloWorld', helloWorld);
    let disposableCreateFolder = vscode.commands.registerCommand('KS-CreateFolder', createFolder);
    let disposableCreateFile = vscode.commands.registerCommand('KS-CreateFile', createFile);
    let disposableReplaceFolder = vscode.commands.registerCommand('KS-ReplaceFolder', replaceFolder);

    context.subscriptions.push(disposableHello);
    context.subscriptions.push(disposableCreateFolder);
    context.subscriptions.push(disposableCreateFile);
    context.subscriptions.push(disposableReplaceFolder);
};

export function deactivate() {}