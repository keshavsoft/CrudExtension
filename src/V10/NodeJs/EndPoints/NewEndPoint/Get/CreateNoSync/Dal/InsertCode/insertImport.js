const CommonRouterSearch = "import {";
const CommonMethod = "Get";

const StartFunc = ({ inLinesArray, inNewRoute }) => {
    let LocalLines = inLinesArray;
    const LocalNewRoute = inNewRoute;

    let LocalFindIndex = LocalLines.findLastIndex((element) => element.startsWith(CommonRouterSearch));
    const LocalToInsertLine = `import { StartFunc as StartFuncFrom${CommonMethod}${LocalNewRoute} } from '../../kLowDb/${CommonMethod.toLowerCase()}${LocalNewRoute}.js';`

    //then add our code
    LocalLines.splice(LocalFindIndex + 1, 0, LocalToInsertLine);
};

module.exports = { StartFunc };
