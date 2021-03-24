import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import { useSelector } from 'react-redux';
import { List } from '@material-ui/core';
import history from '../../history';

const navigateTo = (path) => history.push(path);

const SidebarList = () => {
  const strings = useSelector((state) => state.language.sidebarList);

  return (
    <List>
      <ListItem button onClick={() => navigateTo('/dashboard')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary={strings.dashboard_} />
      </ListItem>
      <ListItem button onClick={() => navigateTo('/addPost')}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary={strings.addLocalization_} />
      </ListItem>
    </List>
  );
};

export default SidebarList;
