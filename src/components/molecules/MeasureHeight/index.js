import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose, map, range} from 'ramda';
import injectSheet from 'react-jss';
import LineVertical from '../../../components/atoms/LineVertical';


const styles = (vars) => ({
  MeasureHeight: {
    display:'flex',
    'justify-content': 'center',
    'align-items': 'center',
    'height':'44px',
    'border-top': '1px solid ' + vars.palette.lines.light,
    'border-bottom': '1px solid ' + vars.palette.lines.light,
    'flex-direction':'column',
    'min-width':'65px',
  },
  label:{
    margin:'10px',
  }
});

class MeasureHeight extends Component {
  render() {
    let classes = this.props.classes;

    let actualHeight = Math.round(this.props.height / 3 / 25.4 * 10)/10;

    return (
      <div className={classes.MeasureHeight} style={{height:this.props.height - 1}}>
        <LineVertical />
        <div className={classes.label}>
          {actualHeight} in
        </div>
        <LineVertical />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    height:state.display.size.height,
  };
}


export default compose(
  connect(mapStateToProps, null),
  injectSheet(styles)
)(MeasureHeight);

