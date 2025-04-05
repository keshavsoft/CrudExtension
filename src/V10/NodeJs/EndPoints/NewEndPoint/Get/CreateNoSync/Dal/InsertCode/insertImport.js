const CommonRouterSearch = "import {";

const StartFunc = ({ inLinesArray, inNewRoute }) => {
    let LocalLines = inLinesArray;
    const LocalNewRoute = inNewRoute;

    let LocalFindIndex = LocalLines.findLastIndex((element) => element.startsWith(CommonRouterSearch));
    const LocalToInsertLine = `import { StartFunc as StartFuncFromPost${LocalNewRoute} } from '../../kLowDb/ReadFromFile/${LocalNewRoute}.js';`

    //then add our code
    LocalLines.splice(LocalFindIndex + 1, 0, LocalToInsertLine);
};

module.exports = { StartFunc };
