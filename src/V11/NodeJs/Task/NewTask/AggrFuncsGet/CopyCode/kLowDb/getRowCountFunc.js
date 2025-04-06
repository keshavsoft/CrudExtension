import { StartFunc as StartFuncPullData } from "../../CommonPull/kLowDb/PullData/returnAsArray.js";

let StartFunc = () => {
  let LocalReturnData = { KTF: false };

  let LocalStartFuncPullData = StartFuncPullData();

  LocalReturnData.KTF = true;
  LocalReturnData.Count = LocalStartFuncPullData.length;

  return LocalReturnData;
};

export { StartFunc };
