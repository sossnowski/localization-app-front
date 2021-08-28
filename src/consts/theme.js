const themeSet = {
  light: {
    palette: {
      primary: {
        main: '#1E1E1E',
      },
      secondary: {
        main: '#63B899',
      },
      third: {
        main: '#ffffff',
      },
      background: {
        default: '#f6f6ee',
        paper: '#ffffff',
      },
      sidebar: {
        main: '#63B899',
      },
      text: {
        primary: '#2B2422',
        secondary: '#2B2422',
        disabled: '#2B2422',
        hint: '#F4F3EF',
      },
      fontColor: '#696969',
      loginInput: {
        main: '#6E736F',
      },
    },
    typography: {
      fontFamily: [
        'Courier New',
        'Courier',
        'Lucida Sans Typewriter',
        'Lucida Typewriter',
        'monospace',
      ].join(','),
      fontSize: 16,
    },
    overrides: {
      MuiGrid: {
        container: {
          overflowX: 'hidden',
        },
      },
    },
  },
  dark: {
    palette: {
      primary: {
        main: '#A088C1',
      },
      secondary: {
        main: '#311E4C ',
      },
      third: {
        main: '#ffffff',
      },
      background: {
        default: '#F2F3F2',
        paper: '#ffffff',
      },
      sidebar: {
        main: '#1E89F7',
      },
      text: {
        primary: '#311E4C',
        secondary: '#311E4C',
        disabled: '#2B2422',
        hint: '#CFD0D4',
      },
      fontColor: '#696969',
      loginInput: {
        main: '#6E736F',
      },
    },
    typography: {
      fontFamily: [
        'Courier New',
        'Courier',
        'Lucida Sans Typewriter',
        'Lucida Typewriter',
        'monospace',
      ].join(','),
      fontSize: 16,
    },
  },
  overrides: {
    MuiGrid: {
      container: {
        overflowX: 'hidden',
      },
    },
  },
};
export const MAIN_COLOR_MAP = '#396179';
export default themeSet;
