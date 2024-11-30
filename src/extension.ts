// extension.ts
import * as vscode from 'vscode';
import { helloWorld } from './helloworld';
import { createFolder } from './createFolder';
import { createFile } from './createFile';
import { replaceFolder } from './replaceFolder';

export function activate(context: vscode.ExtensionContext) {
    let disposableHello = vscode.commands.registerCommand('crudextension.helloWorld', helloWorld);
    let disposableCreateFolder = vscode.commands.registerCommand('crudextension.createFolder', createFolder);
    let disposableCreateFile = vscode.commands.registerCommand('crudextension.createFile', createFile);
    let disposableReplaceFolder = vscode.commands.registerCommand('crudextension.replaceFolder', replaceFolder);

    context.subscriptions.push(disposableHello);
    context.subscriptions.push(disposableCreateFolder);
    context.subscriptions.push(disposableCreateFile);
    context.subscriptions.push(disposableReplaceFolder);
}

export function deactivate() {}