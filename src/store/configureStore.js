import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import * as cruds from '../sagas/crud';
import * as dragDrops from '../sagas/dragDrop';
import * as calcs from '../sagas/calc';
import createSagaMiddleware from 'redux-saga';
import {forEachObjIndexed} from 'ramda';
import * as C from '../constants';
const sagaMiddleware = createSagaMiddleware();


const logger = store => next => action => {
  let result = next(action)
  // if ([C.UPDATE_COLUMN].indexOf(action.type) >= 0) {
  //   localStorage.setItem('emergeColumnEditor', JSON.stringify(store.getState().emerge.columnEditor));
  // }
  return result;
}

export default function configureStore(initialState){
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const myStore = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(logger,sagaMiddleware)
  ));
  forEachObjIndexed((crud) => {sagaMiddleware.run(crud);}, cruds);
  forEachObjIndexed((dragDrop) => {sagaMiddleware.run(dragDrop);}, dragDrops);
  forEachObjIndexed((calc) => {sagaMiddleware.run(calc);}, calcs);
  return myStore;
}
