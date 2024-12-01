// createFolder.ts
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function createFolder() {
    vscode.window.showInputBox({ prompt: 'Enter folder name' }).then(folderName => {
        if (folderName) {
            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (workspaceFolders) {
                const folderPath = path.join(workspaceFolders[0].uri.fsPath, folderName);
                fs.mkdir(folderPath, (err) => {
                    if (err) {
                        vscode.window.showErrorMessage('Failed to create folder: ' + err.message);
                    } else {
                        vscode.window.showInformationMessage('Folder created: ' + folderPath);
                    };
                });
            }
        }
    });
};