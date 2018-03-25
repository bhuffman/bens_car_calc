export default {
  contentBox:{
    'background-color':'white',
    'padding':'20px',
    'border':'1px solid #ddd',
    'border-radius':'0',
    'margin':'10px',
  },
  button: {
    radius: {
      '-webkit-border-radius': '0.2em',
      '-moz-border-radius': '0.2em',
      'border-radius': '0.2em',
    },
    dimensions: {
      'padding': '16px 20px 16px 20px',
      'height': '58px',
      'margin-top': '8px',
      'margin-bottom': '8px',
    },
    style: {
      'text-decoration': 'none',
      'border': 'none',
      'border-bottom': '3px solid rgba(0, 0, 0, 0.3)',
      'cursor': 'pointer',
      'transition': 'background-color 0.25s',
      '&:focus': {
        'outline': 'none'
      },
      '&:disabled': {
        'cursor': 'not-allowed'
      }
    }
  },
  smallRoundButton: {
    radius: {
      '-webkit-border-radius': '8',
      '-moz-border-radius': '8',
      'border-radius': '10px',
    },
    dimensions: {
      'padding': '2px 8px 2px 8px',
      'height': '18px',
      'margin-top': '2px',
      'margin-bottom': '2px',
      'margin-right': '4px',
    },
    style: {
      'text-decoration': 'none',
      'border': 'none',
      '&:focus': {
        'outline': 'none'
      }
    }
  },
  filterButton: {
    radius: {
      '-webkit-border-radius': '12',
      '-moz-border-radius': '12',
      'border-radius': '12px',
    },
    dimensions: {
      'padding': '4px 8px 4px 8px',
      'height': '24px',
      'margin-top': '2px',
      'margin-bottom': '2px',
      'margin-right': '0px',
    },
    style: {
      'text-decoration': 'none',
      'border': '1px solid black',
      '&:focus': {
        'outline': 'none'
      }
    }
  },
  navTab: {
    dimensions: {
      'width': '100%',
      'height': '100%',
      'display': 'flex',
      'flex-direction': 'column',
      'justify-content': 'center',
      'align-items': 'center',
    },
    style: {
      'text-decoration': 'none',
      'cursor': 'pointer',
      '&:focus': {
        'outline': 'none'
      }
    }
  },
  subNavTab: {
    dimensions: {
      'width': '100%',
      'display': 'flex',
      'flex-direction': 'column',
      'justify-content': 'center',
      'align-items': 'center',
      'height': '46px',
      'padding-bottom': '10px'
    },
    style: {
      'text-decoration': 'none',
      '&:focus': {
        'outline': 'none'
      },
      'cursor': 'pointer'
    }
  },
  input: {
    'outline-color': 'transparent',
    'outline-style': 'none',
    'background': 'none',
    'box-shadow': 'none',
    'border-radius': '0px',
    'padding': '10px',
    'width': '100%',
    '&:focus': {
      'outline': 'none'
    },
    '&:disabled': {
      'cursor': 'not-allowed'
    }
  },
  searchInput: {
    'outline-color': 'transparent',
    'outline-style': 'none',
    'background': 'none',
    'box-shadow': 'none',
    'border-radius': '0px',
    'padding': '1px',
    'padding-left': '5px',
    'height': '24px',
    'margin-left': '5px',
    'width': '90%',
    '&:focus': {
      'outline': 'none'
    }
  },
  modal: {
    'max-width': '1200px',
    'margin': '40px',
    overlay: {
      'position': 'fixed',
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
      zIndex: 100
    },
    content: {
      'position': 'absolute',
      'top': '40px',
      'left': '40px',
      'right': '40px',
      'bottom': 'auto',
      'border': '1px solid #ccc',
      'background': '#fff',
      'overflow': 'auto',
      'WebkitOverflowScrolling': 'touch',
      'borderRadius': '10px',
      'outline': 'none',
      'padding': '20px',
      zIndex: 101
    }
  },
  checkbox: {
    margin: '8px'
  },
  spreadWrapper: {
    'width': '100%',
    'display': 'flex',
    'flex-direction': 'row',
    'justify-content': 'space-between',
    'align-items': 'center',
  },
  table:{
    common:{

    },
    header:{
      padding:'5px',
    },
    cell:{
      padding:'5px',
    }
  }
};
