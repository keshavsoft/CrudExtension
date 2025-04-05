const { StartFunc: StartFuncAddListenersFolder } = require("./AddListenersFolder");
const { StartFunc: StartFuncForHtmlIdNeeded } = require("./forHtmlIdNeeded");

const StartFunc = async ({ inCreatePath, inHtmlIdNeeded }) => {
    const LocalToCreatePath = inCreatePath;
    const LocalHtmlIdNeeded = inHtmlIdNeeded;

    await StartFuncAddListenersFolder({ inCreatePath: LocalToCreatePath });
    await StartFuncForHtmlIdNeeded({
        inCreatePath: LocalToCreatePath,
        inHtmlIdNeeded: LocalHtmlIdNeeded
    });
};

module.exports = { StartFunc };
