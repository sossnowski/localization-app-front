import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useSelector } from 'react-redux';
import history from '../../history';
import { authPatchRequestWithParams } from '../../helpers/apiRequests';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    zIndex: 1001,
  },
  listItemNew: {
    backgroundColor: 'rgba(168,168,168,0.07)',
  },
  listItem: {
    backgroundColor: 'inherit',
  },
  fontBold: {
    '& > span': {
      fontWeight: 700,
    },
  },
  fontNormal: {
    fontWeight: 400,
  },
}));

const Notifications = (props) => {
  const { notifications, showMore, setNotifications } = props;
  const classes = useStyles();
  const strings = useSelector((state) => state.language.notifications);

  const displayNotification = (notification) => {
    const type = notification.text.split(':')[0];

    switch (type) {
      case 'commentUid':
        return `${strings.user_} ${notification.username} ${
          notification.isUpVote ? strings.likeComment_ : strings.notLikeComment_
        }`;
      case 'postUid':
        return `${strings.user_} ${notification.username} ${
          notification.isUpVote ? strings.likePost_ : strings.notLikePost_
        }`;

      case 'addComment':
        return `${strings.user_} ${notification.username} ${strings.commented_} `;
      default:
        return 'nieznany';
    }
  };

  const handleClick = (notification) => {
    const data = notification.text.split(':');
    markNotificationAsSeen(notification.uid);
    if (data[0] === 'commentUid' || data[0] === 'addComment')
      history.push(`/show/comment/${data[1]}`);
    else history.push(`/show/post/${data[1]}`);
  };

  const markNotificationAsSeen = (uid) => {
    authPatchRequestWithParams('setNotificationAsSeen', {
      uid,
    });
    setNotifications([
      ...notifications.map((notification) =>
        notification.uid === uid
          ? { ...notification, new: false }
          : notification
      ),
    ]);
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="notifications">
        {notifications.map((item) => (
          <ListItem
            button
            className={item.new ? classes.listItemNew : classes.listItem}
            key={item.uid}
            onClick={() => handleClick(item)}
          >
            <ListItemText
              className={item.new ? classes.fontBold : classes.fontNormal}
              primary={displayNotification(item)}
            />
          </ListItem>
        ))}
        <ListItem
          button
          className={classes.listItem}
          key="more"
          onClick={() => showMore()}
        >
          <ListItemText primary={strings.showMore_} />
        </ListItem>
      </List>
    </div>
  );
};

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired,
  showMore: PropTypes.func.isRequired,
  setNotifications: PropTypes.func.isRequired,
};

export default Notifications;
