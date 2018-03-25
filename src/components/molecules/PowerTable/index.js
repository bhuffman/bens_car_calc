import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose, mapObjIndexed, range, keys, values, head, filter, map, sort, length} from 'ramda';
import injectSheet from 'react-jss';
import * as actionCreators from './actions';
import {getPowerTable} from '../../../selectors';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory';

const styles = (vars) => ({
  BatteryDetail: {
    ...vars.layout.contentBox,
    width:'fit-content',
    'flex-grow':'1.2',
  },
  header:{
    display: 'flex',
    'flex-flow': 'column nowrap',
    'justify-content': 'space-between',
    'border-bottom': '1px solid ' + vars.palette.lines.light,
    'line-height':' 1.5',
    'flex-direction':'row',
    'font-size':'24px',
    'margin-bottom':'-40px',
  },
});

class BatteryDetail extends Component {
  render() {
    let {classes, powerTable} = this.props;

    let max = 0;
    let voltFormula = {
      '20':(x) => {return (3.002505 + (4.199947 - 3.002505)/(1 + Math.pow((x/100/1.051412),0.7449373)))},
      '50':(x) => {return (2.341094 + (4.200335 - 2.341094)/(1 + Math.pow((x/100/2.745098),0.5705154)))},
      '100':(x) => {return (-1380.604 + (4.198607 - -1380.604)/(1 + Math.pow((x/100/642681700),0.3681352)))},
      '200':(x) => {return (-341.9073 + (4.195625 - -341.9073)/(1 + Math.pow((x/100/1922770000),0.2754236)))},
      '30000':(x) => {return (-1968.727 + (4.178461 - -1968.727)/(1 + Math.pow((x/100/1068497000),0.3527789)))},
    };

    let kys = values(mapObjIndexed((r, index) => {return parseFloat(index)},voltFormula)).sort();

    let myC = filter((k) => {
      return parseFloat(k) >= powerTable.throttleC * 100
    },kys);

    myC = length(myC) > 0 ? head(myC).toString() : '20';

    const wattArray =  values(mapObjIndexed((x) => {
      const volts = voltFormula[myC](x);
      const watts = volts * powerTable.series * powerTable.throttleAmps;
      max = watts > max ? watts : max;
     return {x:x,y:Math.round(watts)}
    },range(0,100)));


    return (
      <div className={classes.BatteryDetail}>
        <div className={classes.header}>
          Power Table
        </div>
        <VictoryChart>
          <VictoryLine
            domain={{x: [0, 100], y: [0, max * 1.25]}}
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #ccc"},
              grid: {stroke: "#c43a31"},
            }}
            data={wattArray}
          />
          <VictoryAxis
            label="Percent Discharged"
            style={{
              axis: {stroke: "#c4c4b9"},
              axisLabel: {fontSize: 16, padding: 30},
              grid: {stroke: "#c4c4b9"},
            }}
          />
          <VictoryAxis dependentAxis
            label="Watts"
            style={{
              axis: {stroke: "#c4c4b9"},
              axisLabel: {fontSize: 16, padding: 36},
              grid: {stroke: "#c4c4b9"},
            }}/>
        </VictoryChart>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    powerTable:getPowerTable(state),
  };
}

export default compose(
  connect(mapStateToProps, actionCreators),
  injectSheet(styles)
)(BatteryDetail);

