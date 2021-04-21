import { Grid } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../dashboard/Main';
import AddPost from '../localizations/Add';
import UserSettings from '../user/Main';

const ContentController = () => (
  <Grid container spacing={3}>
    <Switch>
      <Route path="/dashboard/:uid">
        <Dashboard />
      </Route>
      <Route path="/add-new-localization">
        <AddPost />
      </Route>
      <Route path="/user-settings">
        <UserSettings />
      </Route>
      <Route path="/">
        <Dashboard />
      </Route>
    </Switch>
  </Grid>
);

export default ContentController;
