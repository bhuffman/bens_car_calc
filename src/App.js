import React, { Component } from 'react';
import injectSheet from 'react-jss';
import {compose, map, values, repeat, length, mapAccum} from 'ramda';
import MainCalc from './components/pages/MainCalc';

const styles = (vars) => ({
  MainCalc: {
    'background-color': vars.palette.background.default,
    height:'100vh',
    display:'flex',
  },
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainCalc />
      </div>
    );
  }
}

export default compose(
  injectSheet(styles)
)(App);
