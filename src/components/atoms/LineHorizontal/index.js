import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'ramda';
import injectSheet from 'react-jss';

const styles = (vars) => ({
  LineHorizontal: {
    flex:2,
    height:'1px',
    'border-top':'1px solid ' + vars.palette.lines.light,
  },
});


class LineHorizontal extends Component {
  componentWillReceiveProps() {

  }
  render() {
    let classes = this.props.classes;


    return (
      <div className={classes.LineHorizontal}>
        {this.props.children}
      </div>
    );
  }
}

export default compose(
  injectSheet(styles)
)(LineHorizontal);

