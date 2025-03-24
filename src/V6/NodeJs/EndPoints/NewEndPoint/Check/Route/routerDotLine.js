const vscode = require('vscode');

const CommonSearchStart = "router.get(";
const CommonSearchEnd = "router.get(";

const StartFunc = ({ inLinesArray, inCheckRoute }) => {
    let LocalLines = inLinesArray;
    const LocalCheckRoute = inCheckRoute;

    const LocalFindStartIndex = LocalLines.findIndex((element) => element.startsWith(CommonSearchStart));
    const LocalFindEndIndex = LocalLines.findLastIndex((element) => element.startsWith(CommonSearchEnd));

    const LocalSliceArray = LocalLines.slice(LocalFindStartIndex + 1, LocalFindEndIndex);
    const LocalAsSingleLine = LocalSliceArray.toString();
    const LocalToSearch = `Get${LocalCheckRoute}Func)`;
    const LocalSearchIndex = LocalAsSingleLine.search(LocalToSearch);

    if (LocalSearchIndex === -1) {
        vscode.window.showInformationMessage(`${LocalCheckRoute} not found in dot of routes`);
        return false;
    } else {

    };
};

module.exports = { StartFunc };
