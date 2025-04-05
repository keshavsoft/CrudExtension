const CommonRouterSearch = "} from ";

const StartFunc = ({ inLinesArray, inNewRoute }) => {
    let LocalLines = inLinesArray;
    const LocalNewRoute = inNewRoute;

    let LocalFindIndex = LocalLines.findIndex((element) => element.startsWith(CommonRouterSearch));
    const LocalToInsertLine = `Post${LocalNewRoute}Func`;

    const LocalOldValue = LocalLines[LocalFindIndex - 1];

    if (LocalOldValue.length >= 50) {
        LocalLines[LocalFindIndex - 1] = LocalLines[LocalFindIndex - 1] + ",";
        LocalLines.splice(LocalFindIndex, 0, `\t${LocalToInsertLine}`);
    } else {
        LocalLines[LocalFindIndex - 1] = LocalLines[LocalFindIndex - 1] + `, ${LocalToInsertLine}`;
    };
};

module.exports = { StartFunc };
