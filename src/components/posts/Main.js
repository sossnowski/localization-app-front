import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { authGetRequest } from '../../helpers/apiRequests';
import PostWrapper from './PostWrapper';
import { setPosts } from '../../store/actions/post/post';
import { sortByLikes } from '../../utils/main';

const Posts = (props) => {
  const { localization } = props;
  const posts = useSelector((state) => state.posts);
  const [postsToDisplay, setPostsToDisplay] = React.useState([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!localization) return;
    getPosts();
  }, [localization]);

  const getPosts = () => {
    authGetRequest('postsFromLocalizations', {
      uids: [localization.uid],
    }).then((result) => {
      if (result.status === 200) dispatch(setPosts(result.data));
    });
  };

  React.useEffect(() => {
    const allPosts = [];
    sortByLikes(posts);
    for (const post of posts) {
      allPosts.push(<PostWrapper post={post} key={post.uid} />);
    }
    setPostsToDisplay(allPosts);
  }, [posts]);

  return postsToDisplay;
};

Posts.propTypes = {
  localizations: PropTypes.array.isRequired,
};

export default Posts;
