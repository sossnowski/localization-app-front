import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import orange from '@material-ui/core/colors/orange';

const themeSet = {
  light: {
    palette: {
      primary: {
        main: '#6E736F',
      },
      secondary: {
        main: '#A4C4B5',
      },
      third: {
        main: '#ffffff',
      },
      error: {
        main: red[500],
      },
      warning: {
        main: orange[500],
      },
      info: {
        main: yellow[500],
      },
      success: {
        main: green[500],
      },
      background: {
        main: '#6E736F',
      },
      iconColor: '#696969',
      iconDivider: '#D3D3D3',
      fontColor: '#696969',
      white: '#0000008a',
    },
  },
  dark: {
    palette: {
      primary: {
        main: '#652631',
      },
      secondary: {
        main: '#664871',
      },
      error: {
        main: red[500],
      },
      warning: {
        main: orange[500],
      },
      info: {
        main: yellow[500],
      },
      success: {
        main: green[500],
      },
      background: {
        main: '#f9f9f9',
      },
      iconColor: '#696969',
      iconDivider: '#D3D3D3',
      fontColor: '#ffffff',
      secondaryFontColor: '#0000008a',
    },
  },
  newSchool: {
    palette: {
      primary: {
        main: '#345678',
      },
      secondary: {
        main: '#123456',
      },
      error: {
        main: red[500],
      },
      warning: {
        main: orange[500],
      },
      info: {
        main: yellow[500],
      },
      success: {
        main: green[500],
      },
      background: {
        main: '#f9f9f9',
      },
      iconColor: '#696969',
      iconDivider: '#D3D3D3',
      fontColor: '#ffffff',
      secondaryFontColor: '#0000008a',
    },
  },
};

export default themeSet;
