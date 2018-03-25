import * as C from '../../../constants';

export  function updateInput(action) {
  return {
    ...action,
    type: C.UPDATE_INPUT,
  };
}

