import Configjson from '../../../Config.json' assert { type: 'json' };
import tableNameJson from '../../tableName.json' assert { type: 'json' };
import { StartFunc as StartFuncPullData } from "../../CommonPull/kLowDb/CommonFuncs/ReturnDbObjectWithSchema.js";
import { StartFunc as StartFuncUniqueKeyCheck } from "./Check/UniqueKeyCheck.js";

let StartFunc = ({ inArrayFromRequest }) => {
    let LocalinDataToInsert = inArrayFromRequest;
    let LocaltableName = tableNameJson.tableName;

    let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };

    LocalReturnData.KTF = false;

    LocalReturnData.UserDataFilePath = `${Configjson.JsonPath}/${LocaltableName}`;

    let LocalStartFuncPullData = StartFuncPullData();

    if (LocalStartFuncPullData === false) {
        LocalReturnData.KReason = LocalStartFuncPullData.KReason;
        return LocalReturnData;
    };

    const LocalTableSchema = LocalStartFuncPullData.TableSchema;
    const db = LocalStartFuncPullData.dbObject;
    db.read();

    let LocalStartFuncUniqueChecks = StartFuncUniqueKeyCheck({
        inData: db.data, inDataToInsert: LocalinDataToInsert,
        inTableSchema: LocalTableSchema.fileData
    });

    if (LocalStartFuncUniqueChecks.KTF === false) {
        LocalReturnData.KReason = LocalStartFuncUniqueChecks.KReason;
        return LocalReturnData;
    };

    let LocalArrayAfterUuid = LocalFuncForArray({ inDataToInsert: LocalStartFuncUniqueChecks.JsonData, inData: db.data });

    db.data.push(...LocalArrayAfterUuid);
    db.write();

    LocalReturnData.InsertedRows = LocalArrayAfterUuid.length;
    LocalReturnData.KTF = true;

    return LocalReturnData;
};

const LocalFuncForArray = ({ inDataToInsert, inData }) => {
    let LocalReturnData = inDataToInsert.map((element, index) => {
        let localIndex = index + 1;
        let LocalReturnData = LocalFuncGenPk({ inDataToInsert: element, inData, index: localIndex });

        return LocalReturnData
    });

    return LocalReturnData;
};

const LocalFuncGenPk = ({ inDataToInsert, inData, index }) => {

    let LocalArrayPk = inData.map(element => element.pk);

    let LocalRemoveUndefined = LocalArrayPk.filter(function (element) {
        return element !== undefined;
    });

    let numberArray = LocalRemoveUndefined.map(Number);

    let MaxPk = (Math.max(...numberArray, 0) + index);

    let LocalReturnData = { ...inDataToInsert, UuId: uuidv4(), pk: MaxPk, DateTime: Timestamp() };
    return LocalReturnData
};

const Timestamp = () => {
    let currentDate = new Date();
    let formattedDate = currentDate.toISOString();

    return formattedDate;
};

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

export { StartFunc };
