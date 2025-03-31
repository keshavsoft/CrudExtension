const vscode = require('vscode');

const CommonSearchStart = "import {";
const CommonSearchEnd = "const StartFunc = ";

const StartFunc = ({ inLinesArray, inHtmlIdNeeded }) => {
    let LocalLines = inLinesArray;
    const LocalHtmlIdNeeded = inHtmlIdNeeded;

    const LocalFindStartIndex = LocalLines.findIndex((element) => element.startsWith(CommonSearchStart));
    const LocalFindEndIndex = LocalLines.findIndex((element) => element.startsWith(CommonSearchEnd));
    const LocalSliceArray = LocalLines.slice(LocalFindStartIndex, LocalFindEndIndex - 1);
    const LocalAsSingleLine = LocalSliceArray.toString();
    const LocalToSearch = `./${LocalHtmlIdNeeded}/`;
    const LocalSearchIndex = LocalAsSingleLine.search(LocalToSearch);

    if (LocalSearchIndex === -1) {
        return false;
    } else {
        vscode.window.showInformationMessage(`${LocalHtmlIdNeeded}  found in import of routes`);
        return true;
    };
};

module.exports = { StartFunc };
