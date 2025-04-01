import { StartFunc as StartFuncPullData } from "../../../CommonPull/kLowDb/PullData/returnAsArray.js";

let StartFunc = () => {
  let LocalReturnData = { KTF: false };

  LocalReturnData.KTF = true;
  LocalReturnData.JsonData = StartFuncPullData();

  return LocalReturnData;
};

export { StartFunc };
