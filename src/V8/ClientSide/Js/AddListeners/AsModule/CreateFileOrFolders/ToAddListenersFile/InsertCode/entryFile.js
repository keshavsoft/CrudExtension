const CommonImportSearch = "import {";
const CommonCloseOfStartFunc = "};";

const StartFunc = ({ inLinesArray, inAlterPath, inHtmlIdNeeded }) => {
    try {
        let LocalLines = inLinesArray;
        const LocalHtmlIdNeeded = inHtmlIdNeeded;
        const LocalAlterPath = inAlterPath;

        LocalFuncToImport({ inLinesArray: LocalLines, inHtmlIdNeeded: LocalHtmlIdNeeded });
        LocalFuncToStartFunc({ inLinesArray: LocalLines, inHtmlIdNeeded: LocalHtmlIdNeeded });
        // const LocalToInsertLine = `import { StartFunc as StartFuncFrom${LocalHtmlIdNeeded} } from './${LocalHtmlIdNeeded}/EntryFile.js';`;

        // let LocalFindIndex = LocalLines.findLastIndex((element) => element.startsWith(CommonImportSearch));

        // LocalLines.splice(LocalFindIndex, 0, LocalToInsertLine);



    } catch (error) {
        return error.message;
    };
};

const LocalFuncToImport = ({ inLinesArray, inHtmlIdNeeded }) => {
    try {
        let LocalLines = inLinesArray;
        const LocalHtmlIdNeeded = inHtmlIdNeeded;
        const LocalToInsertLine = `import { StartFunc as StartFuncFrom${LocalHtmlIdNeeded} } from './${LocalHtmlIdNeeded}/EntryFile.js';`;

        let LocalFindIndex = LocalLines.findLastIndex((element) => element.startsWith(CommonImportSearch));

        LocalLines.splice(LocalFindIndex + 1, 0, LocalToInsertLine);
    } catch (error) {
        return error.message;
    };
};

const LocalFuncToStartFunc = ({ inLinesArray, inHtmlIdNeeded }) => {
    try {
        let LocalLines = inLinesArray;
        const LocalHtmlIdNeeded = inHtmlIdNeeded;
        const LocalToInsertLine = `import { StartFunc as StartFuncFrom${LocalHtmlIdNeeded} } from './${LocalHtmlIdNeeded}/EntryFile.js';`;

        let LocalFindIndex = LocalLines.findLastIndex((element) => element === CommonCloseOfStartFunc);

        // LocalLines.splice(LocalFindIndex, 0, LocalToInsertLine);
    } catch (error) {
        return error.message;
    };
};

module.exports = { StartFunc };
