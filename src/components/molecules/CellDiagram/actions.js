import * as C from '../../../constants';

export  function updateSize(action) {
  return {
    ...action,
    type: C.UPDATE_SIZE,
  };
}
