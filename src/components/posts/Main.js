import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { authGetRequest } from '../../helpers/apiRequests';
import PostWrapper from './PostWrapper';
import { addPost, setPosts } from '../../store/actions/post/post';
import { sortByLikes } from '../../utils/main';
import { socketUrl } from '../../consts/config';
import { setSelectedLocalization } from '../../store/actions/localization/selectedLocalization';
import UserSessionDataHandler from '../../auth/UserSessionDataHandler';

const Posts = (props) => {
  const { localization } = props;
  const posts = useSelector((state) => state.posts);
  const [postsToDisplay, setPostsToDisplay] = React.useState([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!localization) return;
    console.log('jestem');
    dispatch(setSelectedLocalization(localization.uid));
    getPosts();

    const socket = socketIOClient(socketUrl, {
      transports: ['websocket'],
      query: {
        auth: `Loc_${localization.uid}`,
      },
    });

    socket.on('addPost', (data) => socketAddPostHandler(data));

    return () => socket.emit('userLeave', `Loc_${localization.uid}`);
  }, [localization]);

  const getPosts = () => {
    authGetRequest('postsFromLocalizations', {
      uids: [localization.uid],
    }).then((result) => {
      if (result.status === 200) dispatch(setPosts(result.data));
    });
  };

  const socketAddPostHandler = (post) => {
    if (post.userUid !== UserSessionDataHandler.getUserData()?.uid)
      dispatch(addPost(post));
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

export default React.memo(Posts);
