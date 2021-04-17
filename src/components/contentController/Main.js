import { Grid } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import UserSessionDataHandler from '../../auth/UserSessionDataHandler';
import { socketUrl } from '../../consts/config';
import { editPost } from '../../store/actions/post/post';
import Dashboard from '../dashboard/Main';
import AddPost from '../localizations/Add';
import UserSettings from '../user/Main';

const ContentController = () => {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [
    socketPostLikeUpdateData,
    setSocketPostLikeUpdateData,
  ] = React.useState(null);
  const [socketPostLikeData, setSocketPostLikeData] = React.useState(null);
  const [socketCommentLikeUpdate, setSocketCommentLikeUpdate] = React.useState(
    null
  );
  const [socketCommentLike, setSocketCommentLike] = React.useState(null);
  const [socketComment, setSocketComment] = React.useState(null);

  React.useEffect(() => {
    const socket = socketIOClient(socketUrl, {
      transports: ['websocket'],
      query: {
        auth: UserSessionDataHandler.getUserData()?.uid,
      },
    });
    socket.on('postLikeUpdate', setSocketPostLikeUpdateData);
    socket.on('postLike', setSocketPostLikeData);
    socket.on('commentLikeUpdate', setSocketCommentLikeUpdate);
    socket.on('commentLike', setSocketCommentLike);
    socket.on('addComment', setSocketComment);
    socket.on('error', (error) => console.log(error));
  }, []);

  React.useEffect(() => {
    if (!socketPostLikeUpdateData) return;
    handlePostLikeToggle(socketPostLikeUpdateData);
  }, [socketPostLikeUpdateData]);

  const handlePostLikeToggle = (data) => {
    const foundPost = posts.find((post) => post.uid === data.postUid);
    if (!foundPost) return;
    const likes = foundPost.likes.map((like) =>
      like.userUid === data.userUid
        ? { ...like, isUpVote: data.isUpVote }
        : like
    );
    dispatch(editPost({ ...foundPost, likes }));
  };

  React.useEffect(() => {
    if (!socketPostLikeData) return;
    handlePostLike();
  }, [socketPostLikeData]);

  const handlePostLike = () => {
    const foundPost = posts.find(
      (post) => post.uid === socketPostLikeData.like.postUid
    );
    if (!foundPost) return;
    dispatch(
      editPost({
        ...foundPost,
        likes: [...foundPost.likes, socketPostLikeData.like],
      })
    );
  };

  React.useEffect(() => {
    if (!socketCommentLikeUpdate) return;
    handleCommentLikeUpdate();
  }, [socketCommentLikeUpdate]);

  const handleCommentLikeUpdate = () => {
    const foundPost = posts.find(
      (post) => post.uid === socketCommentLikeUpdate.postUid
    );
    const updatedComments = foundPost?.comments.map((comment) =>
      comment.uid === socketCommentLikeUpdate.commentUid
        ? {
            ...comment,
            likes: comment.likes?.map((like) =>
              like.userUid === socketCommentLikeUpdate.userUid
                ? { ...like, isUpVote: socketCommentLikeUpdate.isUpVote }
                : like
            ),
          }
        : comment
    );
    if (updatedComments)
      dispatch(editPost({ ...foundPost, comments: updatedComments }));
  };

  React.useEffect(() => {
    if (!socketCommentLike) return;
    handleCommentLike();
  }, [socketCommentLike]);

  const handleCommentLike = () => {
    console.log(socketCommentLike);
    const foundPost = posts.find(
      (post) => post.uid === socketCommentLike.postUid
    );
    const updatedComments = foundPost?.comments.map((comment) =>
      comment.uid === socketCommentLike.like.commentUid
        ? {
            ...comment,
            likes: [...comment.likes, socketCommentLike.like],
          }
        : comment
    );
    if (updatedComments)
      dispatch(editPost({ ...foundPost, comments: updatedComments }));
  };

  React.useEffect(() => {
    if (!socketComment) return;
    handleComment();
  }, [socketComment]);

  const handleComment = () => {
    const foundPost = posts.find(
      (post) => post.uid === socketComment.comment.postUid
    );
    if (!foundPost) return;
    console.log({
      ...foundPost,
      comments: [...foundPost.comments, socketComment.comment],
    });
    dispatch(
      editPost({
        ...foundPost,
        comments: [...foundPost.comments, socketComment.comment],
      })
    );
  };

  return (
    <Grid container spacing={3}>
      <Switch>
        <Route path="/dashboard/:uid">
          <Dashboard />
        </Route>
        <Route path="/add-new-localization">
          <AddPost />
        </Route>
        <Route path="/user-settings">
          <UserSettings />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </Grid>
  );
};

export default ContentController;
