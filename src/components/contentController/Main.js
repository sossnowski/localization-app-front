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

    return () =>
      socket.emit('userLeave', UserSessionDataHandler.getUserData()?.uid);
  }, []);

  React.useEffect(() => {
    if (!socketPostLikeUpdateData) return;
    console.log('powiadomienie o toglu lika');
  }, [socketPostLikeUpdateData]);

  React.useEffect(() => {
    if (!socketPostLikeData) return;
    console.log('powiadomienie o nowym lajku');
  }, [socketPostLikeData]);

  React.useEffect(() => {
    if (!socketCommentLikeUpdate) return;
    console.log('powiadomienie o toglu like komentaraza');
  }, [socketCommentLikeUpdate]);

  React.useEffect(() => {
    if (!socketCommentLike) return;
    console.log('powiadomienie o liku komentarza');
  }, [socketCommentLike]);

  React.useEffect(() => {
    if (!socketComment) return;
    console.log('powiadomienie o dodaniu komenatrarza');
  }, [socketComment]);

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
