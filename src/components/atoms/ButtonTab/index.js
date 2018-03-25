import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose, indexOf} from 'ramda';
import injectSheet from 'react-jss';
import * as actionCreators from './actions';

const styles = (vars) => ({
  ButtonTab: {
    width:'200px',
    display:'flex',
    'align-items':'center',
    'justify-content':'center',
    color:'white',
    cursor:'pointer',
    margin:'0 2px',
    'border-bottom':'4px solid #18323e',
  },
  active:{
    'border-bottom':'4px solid #009cdb',
  }
});


class ButtonTab extends Component {
  toggleTab = (val) => {
    this.props.toggleTab({tab:this.props.tab})
  };

  render() {
    const {classes} = this.props;
    const active = indexOf(this.props.tab, this.props.activeTabs) >= 0;

    return (
      <div className={classes.ButtonTab + ' '  + (active && classes.active)} onClick={this.toggleTab}>
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeTabs:state.admin.activeTabs,
  };
}

export default compose(
  connect(mapStateToProps, actionCreators),
  injectSheet(styles)
)(ButtonTab);

