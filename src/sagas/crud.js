import { delay } from 'redux-saga';
import {throttle, put, takeEvery, call, takeLatest, select} from 'redux-saga/effects';
let C = require('constants');

C.CREATE_MAIN_SPAN = 'CREATE_MAIN_SPAN';
C.CREATE_DRAG_SPAN = 'CREATE_DRAG_SPAN';
C.SET_ID_COUNTER = 'SET_ID_COUNTER';

function *doCreateSpan(action) {
  const id = yield select((state) => state.config.idCounter);
  const newId = id + 1;

  try {
    yield put({...action, type: C.SET_ID_COUNTER, id:newId});
    yield put({...action, type: C.CREATE_MAIN_SPAN, id:newId});
    yield put({...action, type: C.CREATE_DRAG_SPAN, id:newId});
  } catch (error) {
    // yield put({type: "UPDATE_DRAG_FAILED", error})
  }
}

export function *watchCreateSpan() {
  yield throttle(50, 'CREATE_SPAN', doCreateSpan)
}
