const vscode = require('vscode');

const CommonSearchStart = "import {";
const CommonSearchEnd = "} from ";

const StartFunc = ({ inLinesArray, inNewRoute }) => {
    let LocalLines = inLinesArray;
    const LocalNewRoute = inNewRoute;

    const LocalFindStartIndex = LocalLines.findIndex((element) => element.startsWith(CommonSearchStart));
    const LocalFindEndIndex = LocalLines.findIndex((element) => element.startsWith(CommonSearchEnd));

    vscode.window.showInformationMessage(LocalLines[LocalFindStartIndex]);
    vscode.window.showInformationMessage(LocalLines[LocalFindEndIndex]);
};

module.exports = { StartFunc };
