import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { authGetRequest } from '../../helpers/apiRequests';
import DisplayPost from './DisplayPost';
import { setPosts } from '../../store/actions/post/post';

const Posts = (props) => {
  const { localizations } = props;
  const posts = useSelector((state) => state.posts);
  const [postsToDisplay, setPostsToDisplay] = React.useState([]);
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

    return uids;
  };

  React.useEffect(() => {
    const allPosts = [];
    sortPosts(posts);
    for (const post of posts) {
      allPosts.push(<DisplayPost post={post} key={post.uid} />);
    }
    setPostsToDisplay(allPosts);
  }, [posts]);

  const sortPosts = (postsToSort) => {
    postsToSort.sort(
      (a, b) =>
        b.likes.filter((like) => like.isUpVote).length -
          a.likes.filter((like) => like.isUpVote).length ||
        a.likes.filter((like) => !like.isUpVote).length -
          b.likes.filter((like) => !like.isUpVote).length
    );
  };

  return postsToDisplay;
};

Posts.propTypes = {
  localizations: PropTypes.array.isRequired,
};

export default Posts;
