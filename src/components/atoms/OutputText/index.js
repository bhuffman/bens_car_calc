import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'ramda';
import injectSheet from 'react-jss';

const styles = (vars) => ({
  OutputText: {
    'font-size':'20px',
    display:'flex',
    padding:'5px 0',
    'border-bottom': '1px solid ' + vars.palette.lines.superLight,
  },
  left:{
    display:'flex',
    // 'justify-content':'flex-end',
    width:'55%',
  },
  right:{
    display:'flex',
    width:'45%',
  }
});


class OutputText extends Component {

  render() {
    let classes = this.props.classes;

    return (
      <div className={classes.OutputText}>
        <div className={classes.left}>
          {this.props.prefix}
        </div>
        <div className={classes.right}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default compose(
  injectSheet(styles)
)(OutputText);

