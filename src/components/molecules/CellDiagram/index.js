import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose, mapObjIndexed, range, length, values} from 'ramda';
import injectSheet from 'react-jss';
import * as actionCreators from './actions';
import SliderHorizontal from '../../../components/atoms/SliderHorizontal'
import CellGroup from '../../../components/molecules/CellGroup';
import MeasureWidth from '../../../components/molecules/MeasureWidth';
import MeasureHeight from '../../../components/molecules/MeasureHeight';



const styles = (vars) => ({
  CellDiagram: {
    ...vars.layout.contentBox,
    display:'flex',
    'flex-direction':'row',
    'flex-grow':'1',
    'justify-content':'center',
    'align-items':'center',
    'padding-bottom':'60px',
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
  cellsOne:{
    display:'flex',
    'flex-direction':'column',
  },
  cellsTwo:{
    display:'flex',
    'flex-direction':'row',
    'align-items':'flex-start',
    'padding-top':'43px',
  },
  batteries:{
    display:'flex',
    'flex-direction':'row',
  }
});

class CellDiagram extends Component {
  render() {
    let classes = this.props.classes;

    let volts = (this.props.series * this.props.cellVolts).toPrecision(3);
    let ampHours =(this.props.cellAmpHours * this.props.parallel/1000).toPrecision(2);
    let wattHours = Math.round(volts * ampHours);
    let amps = (this.props.cellAmps * this.props.parallel).toPrecision(3);
    let peakWatts = Math.round(this.props.controllerAmps * volts * 10)/10
    let weight = (this.props.series * this.props.parallel * this.props.weight/1000).toPrecision(3);
    let lbs = (weight * 2.2).toPrecision(3);
    let miles = (wattHours/this.props.milesPerKwh).toPrecision(3);
    let cost = Math.round(this.props.series * this.props.parallel * this.props.pricePerCell);

    return (
      <div className={classes.CellDiagram}>
        <div className={classes.cellsOne}>
          <MeasureWidth />
          <CellGroup series={this.props.series} parallel={this.props.parallel} />
        </div>
        <div className={classes.cellsTwo}>
          <MeasureHeight />
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    series:state.inputs.series,
    parallel:state.inputs.parallel,
    ampHours:state.inputs.ampHours,
    cellAmpHours:state.inputs.cellAmpHours,
    cellVolts:state.inputs.cellVolts,
    cellAmps:state.inputs.cellAmps,
    weight:state.inputs.weight,
    milesPerKwh:state.inputs.milesPerKwh,
    controllerAmps:state.inputs.controllerAmps,
    pricePerCell:state.inputs.pricePerCell,
    minMiles:state.inputs.minMiles,
    minAmps:state.inputs.minAmps,
    minC:state.inputs.minC,
  };
}


export default compose(
  connect(mapStateToProps, actionCreators),
  injectSheet(styles)
)(CellDiagram);

