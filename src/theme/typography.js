// @flow weak

const defaultConstants = {
  fontFamily: '"Space Mono","Verdana","Helvetica","Arial",sans-serif',
  fontSize: 14,
  fontWeightThin: 200,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightHeavy: 600,
  fontWeightHeaviest: 700
};

export default function createTypography(palette, constants = defaultConstants) {
  return {
    ...constants,
    display4: {
      fontSize: 112,
      fontWeight: constants.fontWeightLight,
      fontFamily: constants.fontFamily,
      letterSpacing: '-.04em',
      lineHeight: 1,
      color: palette.text.secondary,
    },
    display3: {
      fontSize: 56,
      fontWeight: constants.fontWeightRegular,
      fontFamily: constants.fontFamily,
      letterSpacing: '-.02em',
      lineHeight: 1.35,
      color: palette.text.secondary,
    },
    display2: {
      fontSize: 45,
      fontWeight: constants.fontWeightRegular,
      fontFamily: constants.fontFamily,
      lineHeight: '48px',
      color: palette.text.secondary,
    },
    display1: {
      fontSize: 18,
      fontWeight: constants.fontWeightRegular,
      fontFamily: constants.fontFamily,
      lineHeight: '20px',
      color: palette.text.secondary,
    },
    headline: {
      fontSize: 24,
      fontWeight: constants.fontWeightRegular,
      fontFamily: constants.fontFamily,
      lineHeight: '32px',
      color: palette.text.primary,
    },
    title: {
      fontSize: 21,
      fontWeight: constants.fontWeightMedium,
      fontFamily: constants.fontFamily,
      color: palette.text.primary,
    },
    subheading: {
      fontSize: 16,
      fontWeight: constants.fontWeightRegular,
      fontFamily: constants.fontFamily,
      lineHeight: '24px',
      color: palette.text.primary,
    },
    body2: {
      fontSize: 14,
      fontWeight: constants.fontWeightMedium,
      fontFamily: constants.fontFamily,
      lineHeight: '24px',
      color: palette.text.primary,
    },
    body1: {
      fontSize: 14,
      fontWeight: constants.fontWeightRegular,
      fontFamily: constants.fontFamily,
      lineHeight: '20px',
      color: palette.text.primary,
    },
    navTab: {
      fontSize: 16,
      fontWeight: constants.fontWeightThin,
      fontFamily: constants.fontFamily,
      lineHeight: '20px',
      color: palette.text.nav,
    },
    subNavTab: {
      fontSize: 16,
      fontWeight: constants.fontWeightMedium,
      fontFamily: constants.fontFamily,
      lineHeight: '14px',
      color: palette.text.nav.default,
    },
    button1: {
      fontSize: 16,
      fontWeight: constants.fontWeightRegular,
      fontFamily: constants.fontFamily,
      lineHeight: '20px',
      color: palette.text.button,
    },
    smallRoundButton: {
      fontSize: 12,
      fontWeight: constants.fontWeightRegular,
      fontFamily: constants.fontFamily,
      lineHeight: '12px',
      color: palette.text.button,
    },
    smallRoundSecondaryButton: {
      fontSize: 12,
      fontWeight: constants.fontWeightRegular,
      fontFamily: constants.fontFamily,
      lineHeight: '12px',
      color: palette.text.buttonInverted,
    },
    paginationNumbers: {
      fontSize: 12,
      fontWeight: constants.fontWeightRegular,
      fontFamily: constants.fontFamily,
      lineHeight: '12px',

    },
    buttonInverted: {
      fontSize: 16,
      fontWeight: constants.fontWeightMedium,
      fontFamily: constants.fontFamily,
      lineHeight: '20px',
      // color: palette.text.buttonInverted,
    },
    link: {
      textDecoration: 'none',
      fontWeight: constants.fontWeightMedium,
      cursor: 'pointer',
      color: palette.text.link.normal,
      '&:hover': {
        color: palette.text.link.hover
      },
      '&:active': {
        color: palette.text.link.active
      }
    },
    input: {
      fontSize: 16,
      fontWeight: constants.fontWeightMedium,
      fontFamily: constants.fontFamily,
      lineHeight: '20px',
      border: `1px solid ${palette.border.input.default}`
    },
    summarySelected: {
      fontSize: 20,
      fontWeight: constants.fontWeightHeaviest,
      fontFamily: constants.fontFamily,
      lineHeight: '22px',
      // color: palette.text.buttonInverted,
    },
    caption: {
      fontSize: 12,
      fontWeight: constants.fontWeightRegular,
      fontFamily: constants.fontFamily,
      lineHeight: 1,
      color: palette.text.secondary,
    },
    materialIcon: {
      fontFamily: 'Material Icons',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontSize: 24,
      display: 'inline-block',
      lineHeight: 1,
      textTransform: 'none',
    },
    table: {
      header: {
        fontSize: '12px'
      }
    }
  };
}
