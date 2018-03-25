import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose, map, values, repeat, range, indexOf} from 'ramda';
import { withRouter } from 'react-router';
import injectSheet from 'react-jss';
import * as actionCreators from './actions';
import PageTemplate from '../../../components/templates/PageTemplate';
// import {getBins, getSpans, getCalculatesSpans, getSpansByBin} from '../../../selectors';
import BatteryList from '../../../components/molecules/BatteryList';
import BatteryDetail from '../../../components/molecules/BatteryDetail';
import CellDiagram from '../../../components/molecules/CellDiagram';
import LeftDrawer from '../../../components/complexes/LeftDrawer';
import Header from '../../../components/molecules/Header';
import PowerTable from '../../../components/molecules/PowerTable';


const styles = (vars) => ({
  MainCalc: {
    display:'flex',
    padding:'10px',
    'flex-wrap':'wrap',
  },
  output:{
    'margin-top':'30px',
  },
  cells:{
    display:'flex',
    'flex-direction':'row',
  },
  cellsOne:{
    display:'flex',
    'flex-direction':'column',
  },
  cellsTwo:{
    display:'flex',
    'flex-direction':'row',
    'align-items':'flex-end',
  },
  batteries:{
    display:'flex',
    'flex-direction':'row',
  }
});


class MainCalc extends Component {
  constructor (props, context) {
    super(props, context)
  }

  render() {
    let {classes, activeTabs} = this.props;

    let batteryList = (indexOf('BatteryList', activeTabs) >= 0) && <BatteryList/>;
    let batteryDetail = (indexOf('BatteryDetail', activeTabs) >= 0) && <BatteryDetail/>;
    let cellDiagram = (indexOf('CellDiagram', activeTabs) >= 0) && <CellDiagram/>;
    let powerTable = (indexOf('PowerTable', activeTabs) >= 0) && <PowerTable/>;

    return (
      <PageTemplate header={(<Header />)} footer={(<div />)} leftContent={<LeftDrawer />}>
        <div className={classes.MainCalc}>
          {batteryList}
          {batteryDetail}
          {cellDiagram}
          {powerTable}
        </div>
      </PageTemplate>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeTabs:state.admin.activeTabs,
  };
}

export default compose(
  withRouter,
  connect(mapStateToProps, actionCreators),
  injectSheet(styles)
)(MainCalc);

