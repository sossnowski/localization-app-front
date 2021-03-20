/* eslint-disable no-use-before-define */
import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { authGetRequest } from '../../helpers/apiRequests';
import DisplayPost from './DisplayPost';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    marginBottom: '8px',
    overflowX: 'hidden',
    overflowY: 'auto',
    height: 'calc(100vh - 128px)',
  },
}));

const Posts = (props) => {
  const { localizations } = props;
  const [posts, setPosts] = React.useState([]);
  const [postsToDisplay, setPostsToDisplay] = React.useState([]);
  const [localizationsUids, setLocalizationsUids] = React.useState([]);
  const classes = useStyles();

  React.useEffect(() => {
    if (!localizations.length) return;
    authGetRequest('postsFromLocalizations', {
      uids: getLocalizationsUids(),
    }).then((result) => {
      console.log(result.data);
      if (result.status === 200) setPosts(result.data);
    });
  }, [localizations]);

  const getLocalizationsUids = () => {
    const uids = [];
    for (const localization of localizations) {
      uids.push(localization.uid);
    }
    console.log(uids);
    return uids;
  };

  React.useEffect(() => {
    const allPosts = [];
    for (const post of posts) {
      allPosts.push(<DisplayPost post={post} />);
    }
    setPostsToDisplay(allPosts);
  }, [posts]);

  return <Paper className={classes.paper}>{postsToDisplay}</Paper>;
};

Posts.propTypes = {
  localizations: PropTypes.array.isRequired,
};

export default Posts;
