/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Wrapper from './components/wrapper/Main';
import Login from './components/login/Main';
import Register from './components/registration/Main';
import Auth from './auth/Auth';
import Confirmation from './components/registration/Confirmation';
import ResetPassword from './components/registration/ResetPassword';
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
    <Route exact path="/login/:confirmed?" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/confirmation/:token" component={Confirmation} />
    <Route exact path="/reset-password/:token?" component={ResetPassword} />

    <PrivateRoute path="/" component={Wrapper} />
  </Switch>
);

export default Router;
