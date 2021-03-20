import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LikeIcon from '@material-ui/icons/ThumbUpAlt';
import DislikeIcon from '@material-ui/icons/ThumbDownAlt';
import CommentIcon from '@material-ui/icons/ChatBubble';
import { authPatchRequest, authPostRequest } from '../../helpers/apiRequests';
import Comment from '../comments/Main';
import UserSessionDataHandler from '../../auth/UserSessionDataHandler';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    minHeight: 'auto',
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    padding: theme.spacing(2),
    height: 'auto',
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
}));

const DisplayPost = (props) => {
  const { post } = props;
  const classes = useStyles();
  const [likesNumber, setLikesNumber] = React.useState(null);
  const [likes, setLikes] = React.useState([...post.likes]);
  const [disLikesNumber, setDisLikesNumber] = React.useState(null);
  const [showComments, setShowComments] = React.useState(false);
  const [postLiked, setPostLiked] = React.useState(null);

  React.useEffect(() => {
    checkWeatherUserLike();
    // countLikes();
  }, []);

  React.useEffect(() => {
    console.log(likes);
    countLikes();
  }, [likes]);

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
    if (postLiked != null) {
      authPatchRequest('setPostLike', { postUid: post.uid, isUpVote }).then(
        (result) => {
          if (result.status === 200) {
            setPostLiked(isUpVote);
            updateLikes(isUpVote);
          }
        }
      );
    } else {
      authPostRequest('addPostLike', { postUid: post.uid, isUpVote }).then(
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

  return (
    <div className={classes.wrapper}>
      {/* <div className={classes.contentWrapper}> */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {post.title}
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
      {showComments &&
        post.comments.map((comment) => <Comment comment={comment} />)}
      {/* </div> */}
    </div>
  );
};

DisplayPost.propTypes = {
  post: PropTypes.object.isRequired,
};

export default DisplayPost;
