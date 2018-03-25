import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import injectSheet from 'react-jss';
import { compose } from 'ramda';

const styles =
  (vars) => ({
    page: {
      fontFamily: 'Source Code Pro, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontStyle: 'normal',
      fontWeight: 200,
      color: '#3f3f3f',
      fontSize: '100%',
      display:'flex',
      'flex-direction':'column',
      'justify-content':'space-between',
      height:'100vh'
    },
    header: {
      'box-sizing': 'border-box',
      height:'50px',
      'background-color':'#18323e',
    },
    children: {
      'flex-grow':'10',
      display:'flex',
      'flex-direction':'column',
      overflow:'scroll',
    },
    footer: {
      width: '100%',
      display: 'flex',
      height:'50px',
    },
    left:{

    },
    mainContent:{
      display:'flex',
      'flex-direction':'row',
      height:'100%',
    }
})
;

class PageTemplate extends Component {
  componentDidMount() {
    // Ew. I don't think there's a better way to do this, though.
    document.body.style.backgroundColor = '#f9f9f9';
    document.body.style.margin = '0px';
  }

  componentWillUnmount() {
    document.body.style = {};
  }

  render() {
    const {classes, header, footer, leftContent} = this.props;

    return (
      <div className={classes.page}>
        <div className={classes.header}>{header}</div>
        <div className={classes.mainContent}>
          <div className={classes.left}>{leftContent}</div>
          <div className={classes.children}>{this.props.children}</div>
        </div>
      </div>
    );
  }
}

PageTemplate.propTypes = {
  header: PropTypes.node.isRequired,
  footer: PropTypes.node.isRequired,
};

function mapStateToProps(state) {
  return {
  };
}

const fTheme = injectSheet(styles);

export default compose(fTheme)(PageTemplate);
