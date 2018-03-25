import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose, map, range} from 'ramda';
import injectSheet from 'react-jss';
import * as actionCreators from './actions';
import SliderHorizontal from '../../../components/atoms/SliderHorizontal';
require('font-awesome/css/font-awesome.css');

const styles = (vars) => ({
  LeftDrawer: {
    display:'flex',
    width:'260px',
    height:'100%',
    'flex-direction':'column',
    'background-color': '#202e36',
    transition: 'width .3s',
    color:'#cccccc',
  },
  closed:{
    width:'20px',
  },
  sliders:{
    display:'flex',
    'flex-direction':'column',
    padding: '15px',
    opacity:1,
    transition: 'opacity .3s',
  },
  openSliders:{
    opacity:0,
  },
  plusMinus:{
    'padding-left':'3px',
    'margin-top':'-4px',
    cursor:'pointer',
    'font-weight':'bold',
  }
});

class LeftDrawer extends Component {
  constructor (props, context) {
    super(props, context)
    this.state={
      open:true
    }
  }

  componentWillReceiveProps(nextProps) {
  }

  seriesChange = (val) => {
    this.props.updateInput({input:'series',value:val})
  };

  parallelChange = (val) => {
    this.props.updateInput({input:'parallel',value:val})
  };

  mileChange = (val) => {
    this.props.updateInput({input:'minMiles',value:val})
  };

  minAmpsChange = (val) => {
    this.props.updateInput({input:'minAmps',value:val})
  };

  minCChange = (val) => {
    this.props.updateInput({input:'minC',value:val})
  };

  controllerAmpsChange = (val) => {
    this.props.updateInput({input:'controllerAmps',value:val})
  };

  maxChargeChange = (val) => {
    this.props.updateInput({input:'maxCharge',value:val})
  };

  minChargeChange = (val) => {
    this.props.updateInput({input:'minCharge',value:val})
  };

  throttleChange = (val) => {
    this.props.updateInput({input:'throttle',value:val})
  };

  toggleOpen = (val) => {
    this.setState({
      open: !this.state.open
    })
  };

  render() {
    let classes = this.props.classes;
    let PlusMinus = !this.state.open ? (<i className="far fa-plus-square"/>) : (<i className="far fa-minus-square"/>)

    return (
      <div className={classes.LeftDrawer + ' ' + (!this.state.open && classes.closed)}>
        <div className={classes.plusMinus} onClick={this.toggleOpen}>
          {PlusMinus}
        </div>
        <div className={classes.sliders + ' ' + (!this.state.open && classes.openSliders)}>
          <SliderHorizontal min={1} max={20} label='Series' value={this.props.series} handleChange={this.seriesChange} />
          <SliderHorizontal min={1} max={16} label='Parallel' value={this.props.parallel} handleChange={this.parallelChange} />
          <SliderHorizontal min={1} max={50} label='Minimum Miles' value={this.props.minMiles} handleChange={this.mileChange} />
          <SliderHorizontal min={1} max={100} label='Min Amps' value={this.props.minAmps} handleChange={this.minAmpsChange} />
          <SliderHorizontal min={1} max={10} label='Min C' value={this.props.minC} handleChange={this.minCChange} />
          <SliderHorizontal min={1} max={100} step={20} label='Controller Amps' value={this.props.controllerAmps} handleChange={this.controllerAmpsChange} />
          <SliderHorizontal min={1} max={100} label='Throttle' value={this.props.throttle} handleChange={this.throttleChange} />
          <SliderHorizontal min={25} max={110} label='Max Charge' value={this.props.maxCharge} handleChange={this.maxChargeChange} />
          <SliderHorizontal min={1} max={75} label='Min Charge' value={this.props.minCharge} handleChange={this.minChargeChange} />
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
    maxCharge:state.inputs.maxCharge,
    minCharge:state.inputs.minCharge,
    throttle:state.inputs.throttle,
  };
}


export default compose(
  connect(mapStateToProps, actionCreators),
  injectSheet(styles)
)(LeftDrawer);

