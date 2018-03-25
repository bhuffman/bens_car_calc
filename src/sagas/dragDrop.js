import { clamp } from 'ramda';
import {throttle, put, takeEvery, call, takeLatest, select} from 'redux-saga/effects';

let C = require('constants');

C.UPDATE_DEBOUNCED_SPAN = 'UPDATE_DEBOUNCED_SPAN';
C.UPDATE_FINAL_DEBOUNCED_SPAN = 'UPDATE_FINAL_DEBOUNCED_SPAN';
C.UPDATE_FINAL_SPAN = 'UPDATE_FINAL_SPAN';
C.UPDATE_DRAGGED_SPAN = 'UPDATE_DRAGGED_SPAN';
C.RECALC_SPAN = 'RECALC_SPAN';

function *updateDrag(action) {
  try {
    yield put({...action, type: C.UPDATE_DEBOUNCED_SPAN});

  } catch (error) {
    yield put({type: "UPDATE_DRAG_FAILED", error})
  }
}

export function *watchUpdateDrag() {
  yield throttle(30, 'UPDATE_DYNAMIC_SPAN', updateDrag)
}

function *updateFinalDrop(action) {
  let spans = yield select((state) => state.spans[state.spans.variant]);
  let updatedSpan = {...action.span, start:spans[action.span.id].start, end:spans[action.span.id].end, bin:spans[action.span.id].bin}

  try {
    yield put({type: C.UPDATE_FINAL_DEBOUNCED_SPAN, span:updatedSpan});
  } catch (error) {
    yield put({type: "UPDATE_DRAG_FAILED", error})
  }
}

export function *watchFinalUpdateDrag() {
  yield takeEvery('UPDATE_DROP_LEFT_RIGHT', updateFinalDrop)
}

function *leftDrag(action) {
  let newStart = clamp(1,action.span.start,Math.round(action.span.start + action.offset));
  let newSpan = {...action.span, start:newStart};

  try {
    yield put({type: C.UPDATE_DRAGGED_SPAN, span:{...newSpan}});
    yield put({type: C.RECALC_SPAN, span:{...newSpan}});

  } catch (error) {
    yield put({type: "UPDATE_DRAG_FAILED", error})
  }
}

export function *watchLeftDrag() {
  yield throttle(30, 'UPDATE_DRAG_LEFT', leftDrag)
}

function *rightDrag(action) {
  let newEnd = clamp(action.span.start,1199,action.span.end + action.offset);
  let newSpan = {...action.span, end:newEnd};

  try {
    yield put({type: C.UPDATE_DRAGGED_SPAN, span:newSpan});
    yield put({type: C.RECALC_SPAN, span:{...newSpan}});

  } catch (error) {
    yield put({type: "UPDATE_DRAG_FAILED", error})
  }
}

export function *watchRightDrag() {
  yield throttle(30, 'UPDATE_DRAG_RIGHT', rightDrag)
}

function *bodyDrag(action) {
  let newStart = clamp(1,1199,Math.round(action.span.start + action.offset));
  let newEnd = clamp(1,1199,newStart + (action.span.end - action.span.start));
  let newSpan = {...action.span, start: newStart, end:newEnd};

  try {
    yield put({type: C.UPDATE_DRAGGED_SPAN, span:newSpan});
    yield put({type: C.RECALC_SPAN, span:{...newSpan}});

  } catch (error) {
    yield put({type: "UPDATE_DRAG_BODY", error})
  }
}

export function *watchBodyDrag() {
  yield throttle(30, 'UPDATE_DRAG_BODY', bodyDrag)
}
