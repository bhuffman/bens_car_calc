// @flow weak

import shadows from './shadows';
import transitions from './transitions';
import createTypography from './typography';
import createBreakpoints from './breakpoints';
import createPalette from './palette';
import zIndex from './zIndex';
import createMixins from './mixins';
import spacing from './spacing';
import * as colors from './colors';
import layout from './layout';

export function createAtomicTheme(config = {}) {
  const {
    palette = createPalette(),
    breakpoints = createBreakpoints(),
    mixins = createMixins(breakpoints, spacing),
    typography = createTypography(palette),
    ...more
  } = config;

  const theme = {
    dir: 'ltr',
    palette,
    typography,
    shadows,
    transitions,
    mixins,
    spacing,
    breakpoints,
    zIndex,
    colors,
    layout,
    ...more,
  };

  return theme;
}

export default createAtomicTheme;
