import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'ramda';
import injectSheet from 'react-jss';
import batteryPos from '../../../images/battery-pos.png'
import batteryNeg from '../../../images/battery-neg.png'

const styles = (vars) => ({
  Circle: {
    'border-radius': '50%',
    height:'40px',
    width:'40px',
    'background-size':'cover',
    border:'1px solid #666',
    display:'flex',
    'justify-content':'center',
    'align-items':'center',
  },
  positive:{
    'background-image': 'url("' + batteryPos + '")',
  },
  negative:{
    'background-image': 'url("' + batteryNeg + '")',
  }
});


class Circle extends Component {
  componentWillReceiveProps() {

  }
  
  render() {
    let classes = this.props.classes;
    let scaledWidth = this.props.cellWidth * 3 + 'px';

    const sign = this.props.isEven ? (<div>+</div>) : (<div>-</div>)
    
    return (
      <div className={classes.Circle + ' ' + (this.props.isEven ? classes.positive : classes.negative )} style={{width:scaledWidth,height:scaledWidth}}>
        {sign}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    series:state.inputs.series,
    parallel:state.inputs.parallel,
    cellWidth:state.inputs.width,
  };
}

export default compose(
  connect(mapStateToProps, null),
  injectSheet(styles)
)(Circle);

