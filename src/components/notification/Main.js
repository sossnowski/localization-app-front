import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Notifications = (props) => {
  const { notifications, showMore } = props;
  const classes = useStyles();

  const displayNotification = (notification) => {
    const type = notification.text.split(':')[0];

    switch (type) {
      case 'commentUid':
        return `Użytkownik ${notification.username} ${
          notification.isUpVote
            ? 'lubi twój komentarz'
            : 'nie lubi twojego komentarza'
        }`;
      case 'postUid':
        return `Użytkownik ${notification.username} ${
          notification.isUpVote ? 'lubi twój post' : 'nie lubi twojego postu'
        }`;

      case 'addComment':
        return `Użytkownik ${notification.username} skomentował twój post`;
      default:
        return 'nieznany';
    }
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="notifications">
        {notifications.map((item) => (
          <ListItem button className={classes.listItem} key={item.uid}>
            <ListItemText primary={displayNotification(item)} />
          </ListItem>
        ))}
        <ListItem
          button
          className={classes.listItem}
          key="more"
          onClick={() => showMore()}
        >
          <ListItemText primary="Pokaż więcej" />
        </ListItem>
      </List>
    </div>
  );
};

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired,
  showMore: PropTypes.func.isRequired,
};

export default Notifications;
