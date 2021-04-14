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

  React.useEffect(() => {
    console.log('dkj');
    const socket = socketIOClient(socketUrl, {
      // auth: UserSessionDataHandler.getToken(),
      transports: ['websocket'],
      query: {
        auth: UserSessionDataHandler.getUserData()?.uid,
      },
    });
    socket.on('postLikeUpdate', setSocketPostLikeUpdateData);
    socket.on('postLike', setSocketPostLikeData);
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
