import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';
import configureStore from './store/configureStore';
import initialState from './initialState';
import {ThemeProvider} from 'react-jss'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import createAtomicTheme from './theme';
import { BrowserRouter } from 'react-router-dom';
import * as C from './constants';
import './App.css';


const myTheme = createAtomicTheme();
C.vars = myTheme;


const store = configureStore(initialState);

render(
  <ThemeProvider theme={myTheme}>
    <Provider store={store}>
      <DragDropContextProvider backend={HTML5Backend}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DragDropContextProvider>
    </Provider>
  </ThemeProvider>
  , document.getElementById('root'));

registerServiceWorker();
