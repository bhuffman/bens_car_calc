import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'ramda';
import injectSheet from 'react-jss';

const styles = (vars) => ({
  OutputText: {
    'font-size':'24px',
    'display':'flex',
    'justify-content':'flex-end',
  },
});


class OutputText extends Component {
  componentWillReceiveProps() {

  }

  render() {
    let classes = this.props.classes;

    return (
      <div className={classes.OutputText}>
        {this.props.children}
      </div>
    );
  }
}

export default compose(
  injectSheet(styles)
)(OutputText);

