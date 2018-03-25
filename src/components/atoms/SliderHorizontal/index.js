import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose, map, values, repeat, length, mapAccum} from 'ramda';
import { withRouter } from 'react-router';
import injectSheet from 'react-jss';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';


const styles = (vars) => ({
  SliderHorizontal: {
    width:'100%',
  },
  label:{
    'margin-right':'5px',
  },
  value:{

  },
  wrapper:{
    display:'flex',
  }
});


class SliderHorizontal extends Component {


  render() {
    let classes = this.props.classes;

    return (
      <div className={classes.SliderHorizontal}>
        <div className={classes.wrapper}>
          <div className={classes.label}>{this.props.label}:</div>
          <div className={classes.value}>{this.props.value}</div>
        </div>
        <Slider
          min={this.props.min}
          max={this.props.max}
          value={this.props.value}
          onChange={this.props.handleChange}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

export default compose(
  withRouter,
  connect(mapStateToProps, null),
  injectSheet(styles)
)(SliderHorizontal);

