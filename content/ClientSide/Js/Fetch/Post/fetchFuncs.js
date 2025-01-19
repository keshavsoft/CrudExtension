import { StartFunc as StartFuncFetchHeaders } from "./FetchHeaders/entryFile.js";
import UrlJson from "./Config.json" with { type: "json" };

let StartFunc = async () => {
    let jVarLocalFetchUrl = UrlJson.PostUrl;

    let jVarLocalFetchHeaders = StartFuncFetchHeaders();
    let response = await fetch(jVarLocalFetchUrl, jVarLocalFetchHeaders);

    return await response;
};

export { StartFunc };

