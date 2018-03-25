let C = require('constants');

C.UPDATE_INPUT = 'UPDATE_INPUT';

export  function updateInput(action) {
  return {
    ...action,
    type: C.UPDATE_INPUT,
  };
}
