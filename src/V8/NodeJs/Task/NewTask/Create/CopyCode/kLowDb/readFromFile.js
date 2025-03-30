import { StartFunc as StartFuncPullData } from "../../CommonPull/kLowDb/PullData/returnAsArray.js";
import _ from "lodash";

let StartFunc = ({ inRequestBody }) => {
  let LocalRequestBody = inRequestBody;

  let LocalReturnData = { KTF: false };

  const LocalData = StartFuncPullData();

  LocalReturnData.KTF = true;
  LocalReturnData.JsonData = LocalData.map(element => {
    return _.pick(element, LocalRequestBody);
  });

  return LocalReturnData;
};

export { StartFunc };
