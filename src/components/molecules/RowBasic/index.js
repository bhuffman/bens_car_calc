import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'ramda';
import injectSheet from 'react-jss';

const styles = (vars) => ({
  RowBasic: {
    'font-size':'24px',
  },
  negative:{

  },
  positive:{

  }
});


class RowBasic extends Component {
  componentWillReceiveProps() {

  }
  render() {
    let classes = this.props.classes;

    return (
      <div className={classes.RowBasic}>
        {this.props.children}
      </div>
    );
  }
}

export default compose(
  injectSheet(styles)
)(RowBasic);

