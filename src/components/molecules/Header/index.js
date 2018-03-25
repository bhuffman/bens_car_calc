import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose, map, range} from 'ramda';
import injectSheet from 'react-jss';
import ButtonTab from '../../../components/atoms/ButtonTab';


const styles = (vars) => ({
  Header: {
    display:'flex',
    height:'100%',
  },
  label:{
    margin:'10px',
  }
});

class Header extends Component {
  render() {
    let {classes} = this.props;

    return (
      <div className={classes.Header}>
        <ButtonTab tab='BatteryList'>Battery List</ButtonTab>
        <ButtonTab tab='BatteryDetail'>Battery Detail</ButtonTab>
        <ButtonTab tab='CellDiagram'>Cell Diagram</ButtonTab>
        <ButtonTab tab='PowerTable'>Power Table</ButtonTab>
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
)(Header);

