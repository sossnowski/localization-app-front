import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LikeIcon from '@material-ui/icons/ThumbUpAlt';
import DislikeIcon from '@material-ui/icons/ThumbDownAlt';
import CommentIcon from '@material-ui/icons/ChatBubble';
import { useDispatch } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { authPatchRequest, authPostRequest } from '../../helpers/apiRequests';
import UserSessionDataHandler from '../../auth/UserSessionDataHandler';
import { editPost } from '../../store/actions/post/post';
import MainComments from '../comments/Main';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    minHeight: 'auto',
    border: `1px solid #f0f0f0`,
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    borderRadius: '10px',
    padding: theme.spacing(2),
    height: 'auto',
    marginBottom: '5px',
  },
  icon: {
    fontSize: '20px',
    marginBottom: '-7px',
    marginRight: '3px',
    cursor: 'pointer',
  },
  iconClicked: {
    color: 'gray',
  },
  iconEdit: {
    fontSize: '15px',
    cursor: 'pointer',
  },
  iconDelete: {
    fontSize: '15px',
    cursor: 'pointer',
  },
}));

const DisplayPost = (props) => {
  const { post, setPostToEdit, setPostToDelete } = props;
  const classes = useStyles();
  const [likesNumber, setLikesNumber] = React.useState(null);
  const [likes, setLikes] = React.useState([...post.likes]);
  const [disLikesNumber, setDisLikesNumber] = React.useState(null);
  const [showComments, setShowComments] = React.useState(false);
  const [postLiked, setPostLiked] = React.useState(null);
  const dispatch = useDispatch();
  console.log(post);

  React.useEffect(() => {
    checkWeatherUserLike();
    countLikes();
  }, [post]);

  const countLikes = () => {
    let lNumber = 0;
    let ldNumber = 0;
    for (const like of likes) {
      if (like.isUpVote) lNumber += 1;
      else ldNumber += 1;
    }
    setLikesNumber(lNumber || null);
    setDisLikesNumber(ldNumber || null);
  };

  const checkWeatherUserLike = () => {
    const foundLike = post.likes.find(
      (like) => like.userUid === UserSessionDataHandler.getUserData().uid
    );
    if (foundLike) setPostLiked(foundLike.isUpVote);
  };

  const handleLike = (isUpVote) => {
    if (postLiked === isUpVote) return;
    if (postLiked != null) {
      authPatchRequest('postLike', { postUid: post.uid, isUpVote }).then(
        (result) => {
          if (result.status === 200) {
            setPostLiked(isUpVote);
            updateLikes(isUpVote);
          }
        }
      );
    } else {
      authPostRequest('postLike', { postUid: post.uid, isUpVote }).then(
        (result) => {
          if (result.status === 201) {
            setPostLiked(isUpVote);
            addLike(result.data);
          }
        }
      );
    }
  };

  const updateLikes = (isUpVote) => {
    setLikes(
      post.likes.map((like) =>
        like.userUid === UserSessionDataHandler.getUserData().uid
          ? { ...like, isUpVote }
          : like
      )
    );
  };

  const addLike = (like) => {
    setLikes([...likes, like]);
  };

  React.useEffect(() => {
    dispatch(editPost({ ...post, likes }));
  }, [likes]);

  return (
    <div className={classes.wrapper} key={post.uid}>
      <Grid container spacing={2}>
        <Grid item xs={11}>
          {post.title}
        </Grid>
        <Grid item xs={1}>
          {UserSessionDataHandler.getUserData().uid === post.user.uid ? (
            <>
              <EditIcon
                className={classes.iconEdit}
                onClick={() => setPostToEdit(post)}
              />
              <DeleteIcon
                className={classes.iconDelete}
                onClick={() => setPostToDelete(post)}
              />
            </>
          ) : null}
        </Grid>
        <Grid item xs={12}>
          {post.description}
        </Grid>
        <Grid item xs={2}>
          <LikeIcon
            className={classes.icon}
            onClick={() => handleLike(true)}
            style={postLiked === true ? { color: 'gray' } : null}
          />
          {likesNumber}
        </Grid>
        <Grid item xs={2}>
          <DislikeIcon
            className={classes.icon}
            onClick={() => handleLike(false)}
            style={postLiked === false ? { color: 'gray' } : null}
          />
          {disLikesNumber}
        </Grid>
        <Grid item xs={7} container justify="flex-end">
          <div>
            <CommentIcon
              className={classes.icon}
              onClick={() => setShowComments(!showComments)}
            />
            {post.comments.length}
          </div>
        </Grid>
      </Grid>
      {showComments && (
        <Grid item xs={12}>
          <MainComments post={post} />
        </Grid>
      )}
    </div>
  );
};

DisplayPost.propTypes = {
  post: PropTypes.object.isRequired,
  setPostToEdit: PropTypes.func.isRequired,
  setPostToDelete: PropTypes.func.isRequired,
};

export default DisplayPost;
