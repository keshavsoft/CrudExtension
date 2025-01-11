// createFolder.ts
import * as vscode from 'vscode';
import fs from 'fs-extra';
import * as path from 'path';

// import { fileURLToPath } from 'url';

export function copyFolders({ inRootPath }: { inRootPath: string }) {
    vscode.window.showInputBox({ prompt: 'Enter folder name' }).then(folderName => {
        if (folderName) {
            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (workspaceFolders) {
                const folderPath = path.join(workspaceFolders[0].uri.fsPath, folderName);

                vscode.window.showInformationMessage('Folder created: ' + folderPath);

                // const __filename = fileURLToPath(import.meta.url);
                // const __basedir = path.dirname(__filename);

                vscode.window.showInformationMessage('__basedir: ' + __dirname);

                // fs.copySync("./ToCopyCode", folderPath);
                fs.copySync(`${inRootPath}/ToCopyCode`, folderPath);
            };
        }
    });
};