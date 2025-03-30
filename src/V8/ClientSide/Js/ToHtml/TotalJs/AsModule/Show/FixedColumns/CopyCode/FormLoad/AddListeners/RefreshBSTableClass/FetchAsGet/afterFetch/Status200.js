let StartFunc = ({ inResponseAsJson }) => {
    const jVarLocalResponseAsJson = inResponseAsJson;
    
    var $table = $('#table');

    $table.bootstrapTable("load", jVarLocalResponseAsJson);
};

export { StartFunc };