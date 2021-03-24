import { Grid } from '@material-ui/core';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../dashboard/Main';
import AddPost from '../posts/Add';

const ContentController = () => (
  <Grid container spacing={3}>
    <Switch>
      <Route path="/dashboard/:uid">
        <Dashboard />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/addPost">
        <AddPost />
      </Route>
    </Switch>
  </Grid>
);

export default ContentController;
