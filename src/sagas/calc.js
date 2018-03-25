import {repeat, compose, equals, curry, prop, slice, when, last, map, zip, pipe, cond, T, identity, pick, mapAccum, append} from 'ramda';
import { delay } from 'redux-saga';
import {throttle, put, takeEvery, call, takeLatest, select} from 'redux-saga/effects';
import { createSelector } from 'reselect';

let C = require('constants');

C.RECALC_SPAN = 'RECALC_SPAN';
C.UPDATE_RECALC_SPAN = 'UPDATE_RECALC_SPAN';

const trace = curry((msg, requests) => {
  console.log(msg, requests);
  return requests;
});

function length (span) {
  let len = span.end - span.start;
  return {...span, length:len}
}

function rateOverTime (span) {
  let ROT = repeat(span.monthlyAmount,span.length);
  return {...span, ROT:ROT}
}

function assetOverTime (span) {
  let ASSET = repeat(span.initialValue,span.length);
  return {...span, ASSET:ASSET}
}

const applyCat = curry((cat,span) => {
  return {...span, CAT:append(span.CAT,cat)}
});

const applyInflation = curry((inflation, key, span) => {
  const shortInflationList = last(mapAccum((a, b) => [a * b, a], 1, slice(span.start, span.end, inflation[span.growthType])));

  const postIList = map((c) => {
    return c[0] * c[1];
  },zip(span[key], shortInflationList));

  return {...span, [key]:postIList}
});

const applyAppreciation = curry((inflation, key, span) => {
  const shortInflationList = last(mapAccum((a, b) => [a * b, a], 1, slice(span.start, span.end, inflation[span.assetType])));

  const postIList = map((c) => {
    return c[0] * c[1];
  },zip(span[key], shortInflationList));

  return {...span, [key]:postIList}
});

const applyInvest = curry((inflation, key, span) => {
  return span;
  // const shortInflationList = last(mapAccum((a, b) => [a * b, a], 1, slice(span.start, span.end, inflation[span.assetType])));
  //
  // const postIList = mapAccum((c) => {
  //   return c[0] * c[1];
  // },0,zip(span[key], shortInflationList));
  //
  // return {...span, [key]:postIList}
});

const calcIncome = curry((state, span) => {
  const inflation = state.config.inflation;

  return pipe(
    length,
    rateOverTime,
    when(compose(equals('INFLATION_CPI'), prop('growthType')), applyInflation(inflation, 'ROT')),
    applyCat(['INCOME']),
    // trace('get length'),
  )(span);
});

const calcExpense = curry((state, span) => {
  const inflation = state.config.inflation;

  return pipe(
    length,
    rateOverTime,
    when(compose(equals('INFLATION_CPI'), prop('growthType')), applyInflation(inflation, 'ROT')),
    applyCat(['EXPENSE']),
    // trace('get length'),
  )(span);
});

const calcHouse = curry((state, span) => {
  const inflation = state.config.inflation;

  return pipe(
    calcExpense(state),
    length,
    rateOverTime,
    assetOverTime,
    applyCat(['ASSET']),
    when(compose(equals('APPRECIATION_HOUSE'), prop('assetType')), applyAppreciation(inflation, 'ASSET')),
    // applyCat(['EXPENSE']),
    // trace('get length'),
  )(span);
});

const calcInvest = curry((state, span) => {
  const inflation = state.config.inflation;

  return pipe(
    calcExpense(state),
    length,
    rateOverTime,
    assetOverTime,
    applyCat(['EXPENSE']),
    when(compose(equals('INFLATION_CPI'), prop('growthType')), applyInflation(inflation, 'ROT')),
    applyCat(['ASSET']),
    when(compose(equals('APPRECIATION_INDEX'), prop('assetType')), applyAppreciation(inflation, 'ASSET')),
  )(span);
});


const calcGeneric = curry((state, span) => {
  return [];
});

function *recalcSpan(action) {
  let span = yield select((state) => state.spans[state.spans.variant][action.span.id]);
  let state = yield select((state) => state);

  let calcSpan = cond([
    [compose(equals('Income'), prop('label')),  calcIncome(state)],
    [compose(equals('Car'), prop('label')),  calcExpense(state)],
    [compose(equals('Food'), prop('label')),  calcExpense(state)],
    [compose(equals('Rent'), prop('label')),  calcExpense(state)],
    [compose(equals('House'), prop('label')),  calcHouse(state)],
    [compose(equals('Invest'), prop('label')),  calcInvest(state)],
    [T, identity]
  ]);

  const newSpan = pick(['ROT','CAT','ASSET','id','start','label'], calcSpan(span));

  try {
    yield put({type: C.UPDATE_RECALC_SPAN, span:newSpan});

  } catch (error) {
    yield put({type: "UPDATE_DRAG_FAILED", error})
  }
}

export function *watchSpanRecalc() {
  yield throttle(30, 'RECALC_SPAN', recalcSpan)
}