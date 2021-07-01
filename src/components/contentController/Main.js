import { Grid } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../dashboard/Main';
import AddPost from '../localizations/Add';
import UserSettings from '../user/Main';
import ShowPost from '../showPost/Main';

const ContentController = () => (
  <Grid container>
    <Switch>
      <Route path="/show/:type/:uid">
        <ShowPost />
      </Route>
      <Route path="/add-new-localization" exact>
        <AddPost />
      </Route>
      <Route path="/user-settings" exact>
        <UserSettings />
      </Route>
      <Route path="/">
        <Dashboard />
      </Route>
    </Switch>
  </Grid>
);

export default ContentController;
