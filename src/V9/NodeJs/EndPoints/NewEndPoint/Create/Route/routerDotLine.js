const StartFunc = ({ inLinesArray, inNewRoute }) => {
    let LocalLines = inLinesArray;
    const LocalNewRoute = inNewRoute;

    const LocalToInsertLine = `router.get('/${LocalNewRoute}', Get${LocalNewRoute}Func);\r`;

    // const LocalOldValue = LocalLines[LocalLines.length - 2];

    // vscode.window.showInformationMessage(`LocalOldValue: ${LocalOldValue}`);

    LocalLines.splice(LocalLines.length - 2, 0, LocalToInsertLine);
    // LocalLines.splice(LocalLines.length - 1, 0, "");
};

module.exports = { StartFunc };
