/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Wrapper from './components/wrapper/Main';
import Login from './components/login/Main';
import Auth from './auth/Auth';
// import PasswordReset from './components/login/PasswordReset';
// import SetPassword from './components/login/SetPassword';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      Auth.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login' }} />
      )
    }
  />
);

const Router = () => (
  <Switch>
    <Route exact path="/login" component={Login} />

    <PrivateRoute path="/" component={Wrapper} />
  </Switch>
);

export default Router;
