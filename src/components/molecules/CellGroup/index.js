import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose, map, range} from 'ramda';
import injectSheet from 'react-jss';
import sizeMe from 'react-sizeme';
import * as actionCreators from './actions';
import ColumnBasic from '../../../components/molecules/ColumnBasic';


const styles = (vars) => ({
  CellGroup: {
    display:'flex',
    width:'fit-content',
  },
  negative:{

  },
  positive:{

  }
});

class CellGroup extends Component {
  componentWillReceiveProps(nextProps) {
    this.props.updateSize({size:nextProps.size})
  }

  render() {
    let classes = this.props.classes;

    let cols = map((sec) => {
      return (<ColumnBasic key={sec} rowCount={this.props.parallel} />)
    },range(0,this.props.series));

    return (
      <div className={classes.CellGroup}>
        {cols}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {

  };
}


export default compose(
  sizeMe({monitorHeight:true}),
  connect(mapStateToProps, actionCreators),
  injectSheet(styles)
)(CellGroup);

