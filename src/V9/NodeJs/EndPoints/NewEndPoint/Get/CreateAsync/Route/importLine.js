// const vscode = require('vscode');

const CommonRouterSearch = "} from ";

const StartFunc = ({ inLinesArray, inNewRoute }) => {
    let LocalLines = inLinesArray;
    const LocalNewRoute = inNewRoute;

    let LocalFindIndex = LocalLines.findIndex((element) => element.startsWith(CommonRouterSearch));
    const LocalToInsertLine = `Get${LocalNewRoute}Func`;

    const LocalOldValue = LocalLines[LocalFindIndex - 1];
    // const LocalSplitValues = LocalOldValue.split(",");

    // vscode.window.showInformationMessage(`LocalOldValue: ${LocalOldValue.length}`);

    if (LocalOldValue.length >= 50) {
        LocalLines[LocalFindIndex - 1] = LocalLines[LocalFindIndex - 1] + ",";
        LocalLines.splice(LocalFindIndex, 0, `\t${LocalToInsertLine}`);
    } else {
        LocalLines[LocalFindIndex - 1] = LocalLines[LocalFindIndex - 1] + `, ${LocalToInsertLine}`;
        // LocalLines.splice(LocalFindIndex, 0, LocalToInsertLine);
    };

    // LocalLines[LocalFindIndex - 1] = LocalLines[LocalFindIndex - 1] + ",";


    // LocalLines.splice(LocalFindIndex, 0, "");
};

module.exports = { StartFunc };
