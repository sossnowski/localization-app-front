import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import RouterComponent from './router';
import AlertComponent from './components/alert/Alert';
import themes from './consts/theme';
import { setLanguage } from './store/actions/language/language';
import { setTheme } from './store/actions/theme/theme';
import UserSessionDataHandler from './auth/UserSessionDataHandler';

const App = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  React.useEffect(() => {
    dispatch(setLanguage(UserSessionDataHandler.getLanguage() || 'pl'));
    dispatch(setTheme(UserSessionDataHandler.getTheme() || 'light'));
  }, []);

  return (
    <div>
      <MuiThemeProvider theme={createMuiTheme(themes[theme])}>
        <RouterComponent />
        <AlertComponent />
      </MuiThemeProvider>
    </div>
  );
};

export default App;
