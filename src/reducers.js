import {combineReducers} from 'redux';
import initialState from './initialState';
import { findIndex, propEq, append, without, pick, merge, indexOf } from 'ramda';

import * as C from './constants';

function admin(state = initialState, action) {
  switch (action && action.type) {
    case C.TOGGLE_TAB:
      if(indexOf(action.tab, state.activeTabs) >= 0){
        return {...state, activeTabs:without(action.tab, state.activeTabs)};
      }else{
        return {...state, activeTabs:append(action.tab, state.activeTabs)};
      }

    default:
      return state;
  }
}

function batteries(state = initialState, action) {
  switch (action && action.type) {


    default:
      return state;
  }
}

function inputs(state = initialState, action) {
  switch (action && action.type) {
    case C.UPDATE_INPUT:
      return {...state, [action.input]:action.value};

    case C.MERGE_BATTERY_INFO:
      return merge(state, action.battery);

    default:
      return state;
  }
}

function display(state = initialState, action) {
  switch (action && action.type) {
    case C.UPDATE_SIZE:
      return {...state, size:action.size};

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  admin,
  batteries,
  inputs,
  display
});

export default rootReducer;
