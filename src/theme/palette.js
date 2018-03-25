// @flow weak

import {primary, secondary,  grey,  black, white} from './colors';
import {getContrastRatio} from './colorManipulator';

export const light = {
  text: {
    primary: '#333',
    secondary: '#666',
    primaryBlue: primary['100'],
    secondaryBlue: primary['60'],
    button: white,
    buttonInverted: black,
    featureBox: primary['140'],
    nav: {
      default: white,
      active: white,
    },
    navDropdown: {
      default: white,
      hover: white
    },
    disabled: 'rgba(0, 0, 0, 0.38)',
    hint: 'rgba(0, 0, 0, 0.38)',
    icon: 'rgba(0, 0, 0, 0.38)',
    logo: white,
    input: {
      default: '#999999',
      disabled: '#bbbbbb',
      focus: '#999999',
      error: '#999999'
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    lightDivider: 'rgba(0, 0, 0, 0.075)',
    link: {
      normal: primary['100'],
      hover: primary['140'],
      active: primary['120']
    },
    approved: primary['80'],
    rejected: secondary['100'],
    error: secondary['100'],
    pending: '#333'
  },
  lines:{
    light:'#a8a8a8',
    superLight:'#e1e1e1',
    heavy:'#616161',
  },
  action: {
    active: 'rgba(0, 0, 0, 0.54)',
    disabled: 'rgba(0, 0, 0, 0.26)',
  },
  background: {
    default: white,
    paper: white,
    appBar: grey[100],
    contentFrame: grey[200],
    status: grey[300],
    breadcrumb: '#444444',
    sidebar: '#f1f1f1',
    featureBox: primary['30'],
    logo: primary['110'],
    button: {
      default: secondary.standard,
      hover: secondary.hover,
      active: secondary.active,
      disabled: secondary.disabled
    },
    input: {
      default: '#f9fbfb',
      focused: white,
      disabled: '#e1e1e1',
    },
    header: primary['100'],
    nav: {
      default: 'transparent',
      active: primary['60'],
      hover: primary['80']
    },
    navDropdown: {
      default: primary['80'],
      hover: primary['100']
    },
    table: {
      header: grey['A100'],
      cell: grey['100']
    }
  },
  border: {
    input: {
      default: '#999999',
      disabled: '#bbbbbb',
      focus: '#429ac2',
      error: '#931638'
    },
    featureBox: primary['100']
  }
};

export const dark = {
  text: {
    primary: 'rgba(255, 255, 255, 1)',
    secondary: 'rgba(255, 255, 255, 0.7)',
    button: '#fff',
    disabled: 'rgba(255, 255, 255, 0.5)',
    hint: 'rgba(255, 255, 255, 0.5)',
    icon: 'rgba(255, 255, 255, 0.5)',
    divider: 'rgba(255, 255, 255, 0.12)',
    lightDivider: 'rgba(255, 255, 255, 0.075)',
    nav: {
      default: white,
      active: white,
    },
    link: {
      normal: primary['100'],
      hover: primary['140'],
      active: primary['120']
    },
  },
  lines:{
    light:'#a8a8a8',
    heavy:'#616161',
  },
  chart:{
    line:{
      INCOME:'rgba(0, 250, 254, 0.8)',
      EXPENSE:'rgba(204, 0, 1, 0.8)',
      ASSET:'rgba(0, 155, 1, 0.8)',
      DEBT:'rgba(204, 0, 1, 0.8)',
      CASH:'rgba(0, 250, 254, 0.8)',
      IRA:'rgba(0, 250, 254, 0.8)',
      ROTH_IRA:'rgba(0, 250, 254, 0.8)',
      K401:'rgba(0, 250, 254, 0.8)',
    },
    lineFill:{
      INCOME: 'rgba(0, 250, 254, 0.1)',
      EXPENSE:'rgba(204, 0, 1, 0.1)',
      ASSET:'rgba(0, 155, 1, 0.1)',
      DEBT:'rgba(204, 0, 1, 0.1)',
      CASH:'rgba(0, 250, 254, 0.8)',
      IRA:'rgba(0, 250, 254, 0.8)',
      ROTH_IRA:'rgba(0, 250, 254, 0.8)',
      K401:'rgba(0, 250, 254, 0.8)',
    },
    label:'#6fadbe',
    gridLine:'#1e2f34',
  },
  spans:{
    body:'#2f4045',
    text:'#ccc',
    border:'#ccc',
    handles:'#ccc',
    bottom:'#1e2f34',
  },
  action: {
    active: 'rgba(255, 255, 255, 1)',
    disabled: 'rgba(255, 255, 255, 0.3)',
  },
  background: {
    default: '#172426',
    paper: grey[800],
    appBar: grey[900],
    contentFrame: grey[900],
    status: black,
    nav: {
      default: 'transparent',
      active: primary['60'],
      hover: primary['80']
    },
  },
  border: {
    input: {
      default: '#999999',
      disabled: '#bbbbbb',
      focus: '#429ac2',
      error: '#931638'
    },
    featureBox: primary['100']
  }
};

export const shades = {dark, light};

export function getContrastText(color) {
  if (getContrastRatio(color, black) < 7) {
    return dark.text.primary;
  }
  return light.text.primary;
}

export default function createPalette({
  primary = grey,
  accent = grey,
  error = grey,
  type = 'light',
} = {}) {
  return {
    type,
    ...shades[type],
    shades,
    primary,
    accent,
    error,
    grey,
    // functions
    getContrastText,
  };
}

export {createPalette};
