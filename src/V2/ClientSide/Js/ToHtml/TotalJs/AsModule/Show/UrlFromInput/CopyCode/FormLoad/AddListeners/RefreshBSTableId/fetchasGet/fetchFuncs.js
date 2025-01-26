import ConfigJson from '../../../../Config.json' with {type: 'json'};

let StartFunc = async () => {
    const jVarLocalStartUrl = ConfigJson.routePath;
    const jVarLocalTableName = ConfigJson.tableName;
    let jVarLocalFetchUrl = `/${jVarLocalStartUrl}/${jVarLocalTableName}/Show/DataOnly`;

    let response = await fetch(jVarLocalFetchUrl);

    return await response;
};

export { StartFunc };

