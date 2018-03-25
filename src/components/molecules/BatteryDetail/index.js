import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose, mapObjIndexed, range, length, values} from 'ramda';
import injectSheet from 'react-jss';
import * as actionCreators from './actions';
import OutputText from '../../../components/atoms/OutputText';
import {getActiveBattery} from '../../../selectors';

const styles = (vars) => ({
  BatteryDetail: {
    ...vars.layout.contentBox,
    'min-width':'300px',
    'flex-grow':'1.2',
    // 'padding':'10px',
  },
  negative:{

  },
  positive:{

  },
  header:{
    display: 'flex',
    'flex-flow': 'column nowrap',
    'justify-content': 'space-between',
    'border-bottom': '1px solid ' + vars.palette.lines.light,
    'line-height':' 1.5',
    'flex-direction':'row',
    'font-size':'24px',
    // 'margin-bottom':'10px',
  },
  body:{
    display: 'flex',
    'flex-flow': 'column nowrap',
    'justify-content': 'space-between',
    'border': '1px solid $dark-color',
    'font-size': '1rem',
    'margin': '5px',
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

class BatteryDetail extends Component {
  render() {
    let {classes} = this.props;
    let {ampHours, wattHours, amps, lbs, miles, price, volts, peakWatts, controllerCRating, model, throttleAmps,throttleC, brand, throttle, controllerAmps, lifeSpan } = this.props.battery;

    return (
      <div className={classes.BatteryDetail}>
        <div className={classes.header}>
          {brand} - {model}
        </div>
        <OutputText prefix='Model'> {model}</OutputText>
        <OutputText prefix='Volts'> {volts}V</OutputText>
        <OutputText prefix='Amp Hours'> {ampHours}Ah</OutputText>
        <OutputText prefix='Watt Hours'> {wattHours}Wh</OutputText>
        <OutputText prefix='Peak Watts'> {peakWatts}W</OutputText>
        <OutputText prefix='Amps'> {amps}A</OutputText>
        <OutputText prefix='Range'> {miles} miles</OutputText>
        <OutputText prefix='Battery Mass'> {lbs} lbs</OutputText>
        <OutputText prefix='Cost'> ${price} USD</OutputText>
        <OutputText prefix='Controller C'> {controllerCRating.toPrecision(2)}C/{controllerAmps}Amps</OutputText>
        <OutputText prefix='Throttle C'> {throttleC.toPrecision(2)}C/{throttle}%</OutputText>
        <OutputText prefix='Life Span'>{lifeSpan} Cycles</OutputText>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    battery:getActiveBattery(state),
  };
}


export default compose(
  connect(mapStateToProps, actionCreators),
  injectSheet(styles)
)(BatteryDetail);

