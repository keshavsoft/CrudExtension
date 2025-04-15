import { StartFunc as StartFuncUniqueKeyCheck } from "./Checks/UniqueKeyCheck.js";
import { StartFunc as checkReferences } from "./checkReferences.js";
import { StartFunc as LocalFuncGeneratePk } from "./Generate.js";
import { StartFunc as StartFuncFromReturnDbObjectWithSchema } from "../../../../CommonPull/kLowDb/CommonFuncs/ReturnDbObjectWithSchema.js";

let StartFunc = ({ inDataToInsert }) => {
    let LocalinDataToInsert = inDataToInsert;
    let LocalReturnData = { KTF: false, JSONFolderPath: "", CreatedLog: {} };
    let LocalStartFuncPullData = StartFuncFromReturnDbObjectWithSchema();

    if (LocalStartFuncPullData === false) {
        LocalReturnData.KReason = LocalStartFuncPullData.KReason;
        return LocalReturnData;
    };

    const LocalTableSchema = LocalStartFuncPullData.TableSchema;
    const db = LocalStartFuncPullData.dbObject;

    let LocalFromCheckReferences = checkReferences({
        inTableSchema: LocalTableSchema,
        inDataToInsert: LocalinDataToInsert
    });

    if (LocalFromCheckReferences.KTF === false) {
        LocalReturnData.KReason = LocalFromCheckReferences.KReason;
        return LocalReturnData;
    };

    db.read();

    let LocalStartFuncChecksQrCodeId = StartFuncUniqueKeyCheck({ inData: db.data, inDataToInsert: LocalinDataToInsert, inSchema: LocalTableSchema.fileData });

    if (LocalStartFuncChecksQrCodeId.KTF === false) {
        LocalReturnData.KReason = LocalStartFuncChecksQrCodeId.KReason;
        LocalReturnData.ErrorInfo = LocalStartFuncChecksQrCodeId.ErrorInfo;
        
        return LocalReturnData;
    };

    let LocalDataWithUuid = LocalFuncGeneratePk({
        inDataToInsert: LocalinDataToInsert,
        inData: db.data,
        inColumns: LocalTableSchema.fileData
    });

    if (LocalDataWithUuid.KTF === false) {
        LocalReturnData.KReason = LocalDataWithUuid.KReason;
        return LocalReturnData;
    };

    db.data.push(LocalDataWithUuid.InsertData);
    db.write();

    LocalReturnData.KTF = true;
    LocalReturnData.pk = LocalDataWithUuid.InsertData.pk;

    return LocalReturnData;
};

export { StartFunc };