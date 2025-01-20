import { StartFunc as StartFuncFetchHeaders } from "./FetchHeaders/entryFile.js";
// import UrlJson from "./Config.json" with { type: "json" };
import ConfigJson from '../../../../Config.json' with {type: 'json'};

let StartFunc = async () => {
    const jVarLocalStartRoute = ConfigJson.routePath;
    const jVarLocalTableName = ConfigJson.tableName;

    // let jVarLocalFetchUrl = UrlJson.PostUrl;
    let jVarLocalFetchUrl = `/${jVarLocalStartRoute}/${jVarLocalTableName}/Create`;

    let jVarLocalFetchHeaders = StartFuncFetchHeaders();
    let response = await fetch(jVarLocalFetchUrl, jVarLocalFetchHeaders);

    return await response;
};

export { StartFunc };

