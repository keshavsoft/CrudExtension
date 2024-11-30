// createFile.ts
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function createFile() {
    vscode.window.showInputBox({ prompt: 'Enter file name' }).then(fileName => {
        if (fileName) {
            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (workspaceFolders) {
                const filePath = path.join(workspaceFolders[0].uri.fsPath, fileName);
                fs.writeFile(filePath, '', (err) => {
                    if (err) {
                        vscode.window.showErrorMessage('Failed to create file: ' + err.message);
                    } else {
                        vscode.window.showInformationMessage('File created: ' + filePath);
                    }
                });
            }
        }
    });
}