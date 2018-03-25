import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'ramda';
import injectSheet from 'react-jss';
import * as actionCreators from './actions';
import batteryPos from '../../../images/battery-pos.png'
import batteryNeg from '../../../images/battery-neg.png'

const styles = (vars) => ({
  Battery: {
    width:'100%',
    display:'flex',
    'border-bottom': '1px solid ' + vars.palette.lines.superLight,
    cursor:'pointer',
  },
  green:{
    color:'green',
    'font-weight':'600',
  },
  red:{
    color:'red',
   'font-weight':'200',
  },
  number:{
    'justify-content':'flex-end',
    width:'30px !important',
  },
  dolla:{
    'justify-content':'flex-end',
    width:'50px !important',
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
  },
  active:{
    'background-color':'#d9e4ea',
  }
});


class Battery extends Component {
  constructor() {
    super();
    this.state = {
      lastBattery:null
    }
  }

  componentWillMount() {
    this.setState({
      lastBattery:this.props.battery
    });
  }

  setBatteryInfo = (val) => {
    this.props.mergeBatteryInfo({battery:this.props.battery})
  };

  hoverBatteryInfo = (val) => {
    this.setState({
      lastBattery:this.props.battery
    });
    this.props.mergeBatteryInfo({battery:this.props.battery})
  };

  hoverOutBatteryInfo = (val) => {
    console.log('out')
    this.props.mergeBatteryInfo({battery:this.state.lastBattery})
  };
  
  render() {
    let {classes, battery,  minAmps, minMiles, minC} = this.props;
    let {ampHours, wattHours, amps, lbs, miles, price, dollarsPerMile, dollarsPerAmp, cRating} = battery;

    let active = battery.cellType == this.props.activeBattery;

    return (
      <div className={classes.Battery + ' '  + (active && classes.active)} onClick={this.setBatteryInfo}>
        <div className={classes.cell + ' ' + classes.number}>{ampHours}</div>
        <div className={classes.cell + ' ' + classes.number}>{wattHours}</div>
        <div className={classes.cell + ' ' + classes.number + ' ' + (amps >= minAmps ? classes.green : classes.red)}>{amps}</div>
        <div className={classes.cell + ' ' + classes.number}>{lbs}</div>
        <div className={classes.cell + ' ' + classes.dolla}>${price}</div>
        <div className={classes.cell + ' ' + classes.number + ' ' + (miles >= minMiles ? classes.green : classes.red)}>{miles}</div>
        <div className={classes.cell + ' ' + classes.dolla}>${dollarsPerMile}</div>
        <div className={classes.cell + ' ' + classes.dolla}>${dollarsPerAmp}</div>
        <div className={classes.cell + ' ' + classes.number + ' ' + (cRating > minC ? classes.green : classes.red)}>{cRating}</div>
        <div className={classes.cell}>{battery.brand}</div>
        <div className={classes.cell}>{battery.model}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    minMiles:state.inputs.minMiles,
    minAmps:state.inputs.minAmps,
    minC:state.inputs.minC,
  };
}

export default compose(
  connect(mapStateToProps, actionCreators),
  injectSheet(styles)
)(Battery);

