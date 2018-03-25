import * as C from '../../../constants';

export  function mergeBatteryInfo(action) {
  return {
    ...action,
    type: C.MERGE_BATTERY_INFO,
  };
}
