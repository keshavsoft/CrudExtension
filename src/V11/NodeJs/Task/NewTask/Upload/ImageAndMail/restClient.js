const vscode = require('vscode');
const fse = require('fs-extra');
const CommonFilePath = `/restClients/PostEndPoints/home.http`;

const StartFunc = ({ inActiveEditorPath, inToPath }) => {
    const LocalWorkspaceFold = LocalFuncGetWorkspaceFolder();
    const LocalToPath = inToPath;

    const LocalContentToWrite = inActiveEditorPath.replace(LocalWorkspaceFold, "");

    fse.writeFileSync(`${LocalToPath}${CommonFilePath}`, LocalContentToWrite, 'utf8');
};

const LocalFuncGetWorkspaceFolder = () => {
    // Get the workspace folder
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(vscode.window.activeTextEditor.document.uri);

    // Get the path of the workspace folder (if a workspace is open)
    let workspacePath = "";
    if (workspaceFolder) {
        workspacePath = workspaceFolder.uri.fsPath;
    };

    return workspacePath;
};

module.exports = { StartFunc };
