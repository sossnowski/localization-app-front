import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import PropTypes from 'prop-types';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import { useSelector } from 'react-redux';
import { List } from '@material-ui/core';
import history from '../../history';

const navigateTo = (path) => history.push(path);

const SidebarList = (props) => {
  const { setOpen } = props;
  const strings = useSelector((state) => state.language.sidebarList);

  const handleClick = (path) => {
    navigateTo(path);
    setOpen(false);
  };

  return (
    <List>
      <ListItem button onClick={() => handleClick('/dashboard')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary={strings.dashboard_} />
      </ListItem>
      <ListItem button onClick={() => handleClick('/add-new-localization')}>
        <ListItemIcon>
          <AddLocationIcon />
        </ListItemIcon>
        <ListItemText primary={strings.addLocalization_} />
      </ListItem>
      <ListItem button onClick={() => handleClick('/user-settings')}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary={strings.userSettings_} />
      </ListItem>
    </List>
  );
};

SidebarList.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

export default SidebarList;
