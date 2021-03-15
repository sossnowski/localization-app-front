import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import RouterComponent from './router';
import AlertComponent from './components/alert/Alert';
import themes from './consts/theme';

const App = () => (
  <div>
    <MuiThemeProvider theme={createMuiTheme(themes.light)}>
      <RouterComponent />
      <AlertComponent />
    </MuiThemeProvider>
  </div>
);

export default App;
