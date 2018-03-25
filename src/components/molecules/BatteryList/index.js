import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose, mapObjIndexed, range, length, values} from 'ramda';
import injectSheet from 'react-jss';
import * as actionCreators from './actions';
import {getBatteries} from '../../../selectors';
import Battery from '../../../components/atoms/Battery';


const styles = (vars) => ({
  BatteryList: {
    ...vars.layout.contentBox,
    'min-width':'600px',
    'flex-grow':'2',

  },
  number:{
    'justify-content': 'flex-end',
    width:'30px !important',
  },
  dolla:{
    'justify-content': 'flex-end',
    width:'50px !important',
  },
  positive:{

  },
  header:{
    display: 'flex',
    'flex-flow': 'column nowrap',
    'justify-content': 'space-between',
    'font-size': '1rem',
    'padding': '7px 0',
    'line-height':' 1.5',
    'flex-direction':'row',
    'border-bottom': '1px solid ' + vars.palette.lines.light,
  },
  body:{
    display: 'flex',
    'flex-flow': 'column nowrap',
    'justify-content': 'space-between',
    'border': '1px solid $dark-color',
    'font-size': '1rem',
    'line-height':' 1.5',
  },
  cell:{
    'margin-right':'5px',
    display: 'flex',
    'flex-flow': 'row nowrap',
    'flex-grow': 1,
    // 'flex-basis': 0,
    'padding': '2px',
    width:'75px',
    'font-size':'13px',
    'font-weight':'bold',
  }
});

class BatteryList extends Component {


  render() {
    let classes = this.props.classes;

    let batteries = values(mapObjIndexed((battery, index) => {
      return (<Battery key={index} battery={{...battery, cellType:index}} activeBattery={this.props.activeBattery}>{battery.model}</Battery>)
    },this.props.batteryList));

    return (
      <div className={classes.BatteryList}>
        <div className={classes.header}>
          <div className={classes.cell + ' ' + classes.number}>AH</div>
          <div className={classes.cell + ' ' + classes.number}>WH</div>
          <div className={classes.cell + ' ' + classes.number}>Amps</div>
          <div className={classes.cell + ' ' + classes.number}>Pounds</div>
          <div className={classes.cell + ' ' + classes.dolla}>Price</div>
          <div className={classes.cell + ' ' + classes.number}>Range</div>
          <div className={classes.cell + ' ' + classes.dolla}>$/Mile</div>
          <div className={classes.cell + ' ' + classes.dolla}>$/Amp</div>
          <div className={classes.cell + ' ' + classes.number}>C</div>
          <div className={classes.cell}>Brand</div>
          <div className={classes.cell}>Model</div>
        </div>
        <div className={classes.body}>
          {batteries}
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    batteries:state.batteries,
    batteryList:getBatteries(state),
    activeBattery:state.inputs.cellType,
  };
}


export default compose(
  connect(mapStateToProps, actionCreators),
  injectSheet(styles)
)(BatteryList);

