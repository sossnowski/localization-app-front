import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { authGetRequest } from '../../helpers/apiRequests';
import PostWrapper from './PostWrapper';
import { addPost, editPost, setPosts } from '../../store/actions/post/post';
import { sortByLikes } from '../../utils/main';
import { socketUrl } from '../../consts/config';
import UserSessionDataHandler from '../../auth/UserSessionDataHandler';
import {
  handlePostLike,
  handlePostLikeUpdate,
} from '../localizations/socket/posts';
import {
  handleAddComment,
  handleCommentLike,
  handleCommentLikeUpdate,
} from '../localizations/socket/comments';

const Posts = () => {
  const localization = useSelector((state) =>
    state.selectedLocalization ? state.selectedLocalization : null
  );
  const posts = useSelector((state) => state.posts);
  const [postsToDisplay, setPostsToDisplay] = React.useState([]);
  const dispatch = useDispatch();
  const postsRef = React.useRef([]);
  console.log(posts);

  React.useEffect(() => {
    if (!localization) return;
    getPosts();

    const socket = socketIOClient(socketUrl, {
      transports: ['websocket'],
      query: {
        auth: `Loc_${localization.uid}`,
      },
    });

    socket.on('addPost', (data) => socketAddPostHandler(data));
    socket.on('postLike', (like) => socketAddPostLikeHandler(like));
    socket.on('postLikeUpdate', (like) => socketAddPostLikeUpdateHandler(like));
    socket.on('commentLike', (data) => socketAddCommentLikeHandler(data));
    socket.on('commentLikeUpdate', (data) =>
      socketAddCommentLikeUpdateHandler(data)
    );
    socket.on('addComment', (comment) => socketAddCommentHandler(comment));

    return () => socket.emit('userLeave', `Loc_${localization.getId()}`);
  }, [localization]);

  const getPosts = () => {
    authGetRequest('postsFromLocalizations', {
      uids: [localization.getId()],
    }).then((result) => {
      if (result.status === 200) dispatch(setPosts(result.data));
    });
  };

  const socketAddPostHandler = (post) => {
    if (post.userUid !== UserSessionDataHandler.getUserData()?.uid)
      dispatch(addPost(post));
  };

  const socketAddPostLikeHandler = (like) => {
    if (like.userUid !== UserSessionDataHandler.getUserData()?.uid) {
      const updatedPost = handlePostLike(postsRef.current, like);
      if (updatedPost) dispatch(editPost(updatedPost));
    }
  };

  const socketAddPostLikeUpdateHandler = (data) => {
    if (data.userUid !== UserSessionDataHandler.getUserData()?.uid) {
      const updatedPost = handlePostLikeUpdate(postsRef.current, data);
      console.log(updatedPost);
      if (updatedPost) dispatch(editPost(updatedPost));
    }
  };

  const socketAddCommentLikeHandler = (data) => {
    if (data.like.userUid !== UserSessionDataHandler.getUserData()?.uid) {
      const updatedPost = handleCommentLike(postsRef.current, data);
      if (updatedPost) dispatch(editPost(updatedPost));
    }
  };

  const socketAddCommentLikeUpdateHandler = (data) => {
    if (data.userUid !== UserSessionDataHandler.getUserData()?.uid) {
      const updatedPost = handleCommentLikeUpdate(postsRef.current, data);
      if (updatedPost) dispatch(editPost(updatedPost));
    }
  };

  const socketAddCommentHandler = (comment) => {
    if (comment.userUid !== UserSessionDataHandler.getUserData()?.uid) {
      const updatedPost = handleAddComment(postsRef.current, comment);
      if (updatedPost) dispatch(editPost(updatedPost));
    }
  };

  React.useEffect(() => {
    const allPosts = [];
    postsRef.current = posts;
    sortByLikes(posts);
    for (const post of posts) {
      allPosts.push(<PostWrapper post={post} key={post.uid} />);
    }
    setPostsToDisplay(allPosts);
  }, [posts]);

  return postsToDisplay;
};

export default React.memo(Posts);
