type ThemeType = {
  palette: {
    mono: Record<string, string>
    main: Record<string, string>
    sub: Record<string, string>
    status: Record<string, string>
  }
  font: Record<
    string,
    { fontSize: string; fontWeight: number; lineHeight: string }
  >
}

export type StyledPropType = {
  theme: ThemeType
}

const theme: ThemeType = {
  palette: {
    mono: {
      black: '#333',
      paleBlack: '#666',
      darkGray: '#999',
      gray: '#CCC',
      lightGray: '#DDD',
      pale: '#EEE',
      paleWhite: '#F7F7F7',
      white: '#ffffff',
    },
    main: {
      red: '#F85A5E',
      blue: '#3067A8',
      navy: '#001B57',
      darkNavy: '#1F2940',
      yellow: '#F7C954',
      turquoise: '#5EBCCA',
      pink: '#F97F90',
    },
    sub: {
      babyPink: '#FEDDDF',
      green: '#92DCA9',
      sky: '#58C5E3',
      darkPurple: '#6258BA',
      paleYellow: '#EABF80',
      purple: '#B48BD3',
      lightGreen: '#BBDA85',
      paleBlue: '#A3B7ED',
      ocean: '#99EAED',
      pink: '#EF91AA',
      darkNavy: '#233148',
      lightBlue: '#4695EC',
      paleSky: '#7FB2D6',
    },
    status: {
      active: '#37EB5B',
      unavailable: '#EBE537',
      inactive: '#AAAAAA',
    },
  },
  font: {
    titleLarge: {
      fontSize: '1.5rem',
      fontWeight: 900,
      lineHeight: '1.25rem',
    },
    titleMediumBold: {
      fontSize: '1.25rem',
      fontWeight: 900,
      lineHeight: '1.2rem',
    },
    titleMedium: {
      fontSize: '1.25rem',
      fontWeight: 700,
      lineHeight: '1.2rem',
    },
    titleSmall: {
      fontSize: '1.125rem',
      fontWeight: 900,
      lineHeight: '1.1rem',
    },
    listBold: {
      fontSize: '1rem',
      fontWeight: 900,
      lineHeight: '1rem',
    },
    list: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: '1rem',
    },
    itemBold: {
      fontSize: '0.875rem',
      fontWeight: 900,
      lineHeight: '0.85rem',
    },
    item: {
      fontSize: '0.875rem',
      fontWeight: 700,
      lineHeight: '0.85rem',
    },
    text: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: '0.85rem',
    },
    textCalendar: {
      fontSize: '0.813rem',
      fontWeight: 700,
      lineHeight: '0.79rem',
    },
    placeholder: {
      fontSize: '0.875rem',
      fontWeight: 300,
      lineHeight: '0.85rem',
    },
    sub: {
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: '0.7rem',
    },
    small: {
      fontSize: '0.625rem',
      fontWeight: 500,
      lineHeight: '0.6rem',
    },
  },
}

export default theme