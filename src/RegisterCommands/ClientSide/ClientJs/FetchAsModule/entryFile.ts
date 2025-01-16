// createFolder.ts
import * as vscode from 'vscode';
import fs from 'fs-extra';
import * as path from 'path';

// import { fileURLToPath } from 'url';

export async function copyFolders({ inRootPath }: { inRootPath: string }) {
    const clipboardText = await getSelectedFolderPath();

    if (!clipboardText) {
        vscode.window.showErrorMessage('Clipboard does not contain a valid folder path.');
        return;
    }

    vscode.window.showInputBox({ prompt: 'Enter folder name' }).then(folderName => {
        if (folderName) {
            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (workspaceFolders) {
                vscode.window.showInformationMessage('__basedir: ' + __dirname);

                // fs.copySync("./ToCopyCode", folderPath);
                fs.copySync(`${inRootPath}/ToCopyCode`, clipboardText);
            };
        }
    });
};

const getSelectedFolderPath = async () => {
    // const selectedResources = await vscode.commands.executeCommand('copyFilePath');

    // This command copies the selected file/folder paths into the clipboard
    const LocalClipboardText = await vscode.env.clipboard.readText();

    if (LocalClipboardText && fs.existsSync(LocalClipboardText) && fs.lstatSync(LocalClipboardText).isDirectory()) {
        return LocalClipboardText;
    }

    return null;
};
