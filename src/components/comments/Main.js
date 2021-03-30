import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LikeIcon from '@material-ui/icons/ThumbUpAlt';
import DislikeIcon from '@material-ui/icons/ThumbDownAlt';
import {
  authGetRequestWithParams,
  authPostRequest,
  authPatchRequest,
} from '../../helpers/apiRequests';
import UserSessionDataHandler from '../../auth/UserSessionDataHandler';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: '100px',
    borderBottom: `1px solid #fafafa`,
    padding: theme.spacing(2),
    width: '100%',
    marginTop: '20px',
  },
  icon: {
    fontSize: '20px',
    marginBottom: '-7px',
    marginRight: '3px',
    cursor: 'pointer',
  },
}));

const DisplayPost = (props) => {
  const { comment } = props;
  const classes = useStyles();
  const [likes, setLikes] = React.useState([]);
  const [likesNumber, setLikesNumber] = React.useState(null);
  const [disLikesNumber, setDisLikesNumber] = React.useState(null);
  const [commentLiked, setCommentLiked] = React.useState(null);

  React.useEffect(() => {
    getLikes();
  }, []);

  const getLikes = () => {
    authGetRequestWithParams('getCommentLikes', { uid: comment.uid }).then(
      (result) => {
        if (result.status === 200) setLikes(result.data);
      }
    );
  };

  React.useEffect(() => {
    if (!likes.length) return;
    countLikes();
  }, [likes]);

  React.useEffect(() => {
    countLikes();
    checkWeatherUserLike();
  }, [likes]);

  const countLikes = () => {
    let lNumber = 0;
    let dlNumber = 0;
    for (const like of likes) {
      if (like.isUpVote) lNumber += 1;
      else dlNumber += 1;
    }
    setLikesNumber(lNumber || null);
    setDisLikesNumber(dlNumber || null);
  };

  const checkWeatherUserLike = () => {
    console.log(likes, UserSessionDataHandler.getUserData().uid);
    const foundLike = likes.find(
      (like) => like.userUid === UserSessionDataHandler.getUserData().uid
    );
    if (foundLike) setCommentLiked(foundLike.isUpVote);
  };

  const handleLike = (isUpVote) => {
    if (commentLiked === isUpVote) return;
    if (commentLiked != null) {
      authPatchRequest('commentLike', {
        commentUid: comment.uid,
        isUpVote,
      }).then((result) => {
        if (result.status === 200) {
          setCommentLiked(isUpVote);
          updateComments(isUpVote);
        }
      });
    } else {
      authPostRequest('commentLike', {
        commentUid: comment.uid,
        isUpVote,
      }).then((result) => {
        if (result.status === 201) {
          setCommentLiked(isUpVote);
          addComments(result.data);
        }
      });
    }
  };

  const updateComments = (isUpVote) => {
    setLikes(
      likes.map((like) =>
        like.userUid === UserSessionDataHandler.getUserData().uid
          ? { ...like, isUpVote }
          : like
      )
    );
  };

  const addComments = (like) => {
    setLikes([...likes, like]);
  };

  return (
    // <div className={classes.wrapper}>
    <Grid container spacing={2} className={classes.wrapper}>
      <Grid item xs={12}>
        {comment.text}
      </Grid>
      {/* <Grid item xs={8} */}
      <Grid item xs={2}>
        <LikeIcon
          className={classes.icon}
          onClick={() => handleLike(true)}
          style={commentLiked === true ? { color: 'gray' } : null}
        />
        {likesNumber}
      </Grid>
      <Grid item xs={2}>
        <DislikeIcon
          className={classes.icon}
          onClick={() => handleLike(false)}
          style={commentLiked === false ? { color: 'gray' } : null}
        />
        {disLikesNumber}
      </Grid>
    </Grid>

    // </div>
  );
};

DisplayPost.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default DisplayPost;
