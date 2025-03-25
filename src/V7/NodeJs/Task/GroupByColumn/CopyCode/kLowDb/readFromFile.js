import { StartFunc as StartFuncPullData } from "../../CommonPull/kLowDb/PullData/returnAsArray.js";
import _ from "lodash";

let StartFunc = ({ inRequestBody, inGroupByColumn }) => {
  let LocalRequestBody = inRequestBody;
  const LocalGroupByColumn = inGroupByColumn;

  let LocalReturnData = { KTF: false };

  const LocalData = StartFuncPullData();

  LocalReturnData.KTF = true;

  let LocalGroupByColumnData = _.groupBy(LocalData, LocalGroupByColumn);
  let LocalReturnObject = {};

  for (const [key, value] of Object.entries(LocalGroupByColumnData)) {
    LocalReturnObject[key] = value.map(element => {
      return _.pick(element, LocalRequestBody);
    });
  };

  LocalReturnData.JsonData = LocalReturnObject;

  return LocalReturnData;
};

export { StartFunc };
