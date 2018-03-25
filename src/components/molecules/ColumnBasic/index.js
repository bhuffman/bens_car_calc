import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose, map, range} from 'ramda';
import injectSheet from 'react-jss';
import Circle from '../../../components/atoms/Circle';

const styles = (vars) => ({
  ColumnBasic: {
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
    let even = true;

    let rows = map((sec) => {
      return (<Circle key={sec} isEven={even = !even} />)
    },range(0,parseInt(this.props.rowCount,10)));

    return (
      <div className={classes.ColumnBasic}>
        {rows}
      </div>
    );
  }
}

export default compose(
  injectSheet(styles)
)(RowBasic);

