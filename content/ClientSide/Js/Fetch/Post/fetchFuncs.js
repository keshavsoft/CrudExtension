import { StartFunc as StartFuncFetchHeaders } from "./FetchHeaders/entryFile.js";
// import UrlJson from "./Config.json" with { type: "json" };
import ConfigJson from '../../../../Config.json' with {type: 'json'};

let StartFunc = async () => {
    // let jVarLocalFetchUrl = UrlJson.PostUrl;
    const jVarLocalStartUrl = ConfigJson.routePath;
    const jVarLocalTableName = ConfigJson.tableName;
    let jVarLocalFetchUrl = `/${jVarLocalStartUrl}/${jVarLocalTableName}/Create`;

    let jVarLocalFetchHeaders = StartFuncFetchHeaders();
    let response = await fetch(jVarLocalFetchUrl, jVarLocalFetchHeaders);

    return await response;
};

export { StartFunc };

