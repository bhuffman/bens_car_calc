import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose, map, range} from 'ramda';
import injectSheet from 'react-jss';
import LineHorizontal from '../../../components/atoms/LineHorizontal';


const styles = (vars) => ({
  CellGroup: {
    display:'flex',
    'justify-content': 'center',
    'align-items': 'center',
    'height':'44px',
    'border-right': '1px solid ' + vars.palette.lines.light,
    'border-left': '1px solid ' + vars.palette.lines.light,
  },
  label:{
    margin:'10px',
  }
});

class CellGroup extends Component {
  render() {
    let classes = this.props.classes;

    let actualWidth = Math.round(this.props.width / 3 / 25.4 * 10)/10;

    return (
      <div className={classes.CellGroup} style={{width:this.props.width}}>
        <LineHorizontal />
        <div className={classes.label}>
          {actualWidth} in
        </div>
        <LineHorizontal />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    width:state.display.size.width,
    height:state.display.size.height,
  };
}


export default compose(
  connect(mapStateToProps, null),
  injectSheet(styles)
)(CellGroup);

