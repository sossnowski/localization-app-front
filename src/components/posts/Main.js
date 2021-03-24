import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { authGetRequest } from '../../helpers/apiRequests';
import DisplayPost from './DisplayPost';
import { setPosts } from '../../store/actions/post/post';

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
  const posts = useSelector((state) => state.posts);
  // const [posts, setPosts] = React.useState([]);
  const [postsToDisplay, setPostsToDisplay] = React.useState([]);
  const [localizationsUids, setLocalizationsUids] = React.useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!localizations.length) return;
    getPosts();
  }, [localizations]);

  const getPosts = () => {
    authGetRequest('postsFromLocalizations', {
      uids: getLocalizationsUids(),
    }).then((result) => {
      if (result.status === 200) dispatch(setPosts(result.data));
    });
  };

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
      allPosts.push(<DisplayPost post={post} key={post.uid} />);
    }
    setPostsToDisplay(allPosts);
  }, [posts]);

  return <Paper className={classes.paper}>{postsToDisplay}</Paper>;
};

Posts.propTypes = {
  localizations: PropTypes.array.isRequired,
};

export default Posts;
