const { StartFunc: StartFuncForHtmlIdNeeded } = require("./forHtmlIdNeeded");

const StartFunc = async ({ inCreatePath, inHtmlIdNeeded }) => {
    const LocalToCreatePath = inCreatePath;
    const LocalHtmlIdNeeded = inHtmlIdNeeded;

    await StartFuncForHtmlIdNeeded({
        inCreatePath: LocalToCreatePath,
        inHtmlIdNeeded: LocalHtmlIdNeeded
    });
};

module.exports = { StartFunc };
