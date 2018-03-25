import * as C from '../../../constants';

export  function toggleTab(action) {
  return {
    ...action,
    type: C.TOGGLE_TAB,
  };
}
