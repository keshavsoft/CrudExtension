const StartFunc = (data) => {
    let localAddondata = data.JsonData
    jFLocalToInputAddonsId(localAddondata)
};

let jFLocalToInputAddonsId = (inValue) => {
    let jVarLocalHtmlId = 'AddonsId';
    let jVarLocalAddonsId = document.getElementById(jVarLocalHtmlId);

    if (jVarLocalAddonsId === null === false) {
        jVarLocalAddonsId.innerHTML = inValue;
    };
};

export { StartFunc };