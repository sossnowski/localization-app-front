import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LikeIcon from '@material-ui/icons/ThumbUpAlt';
import DislikeIcon from '@material-ui/icons/ThumbDownAlt';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { authPostRequest, authPatchRequest } from '../../helpers/apiRequests';
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
  iconEdit: {
    fontSize: '15px',
    cursor: 'pointer',
  },
  iconDelete: {
    fontSize: '15px',
    cursor: 'pointer',
  },
  editIconsSection: {
    textAlign: 'right',
  },
}));

const DisplayComment = (props) => {
  const { comment, setCommentToEdit, setCommentToDelete } = props;
  const classes = useStyles();
  const [likes, setLikes] = React.useState(comment.likes);
  const [likesNumber, setLikesNumber] = React.useState(null);
  const [disLikesNumber, setDisLikesNumber] = React.useState(null);
  const [commentLiked, setCommentLiked] = React.useState(null);

  React.useEffect(() => {
    countLikes();
    checkWeatherUserLike();
  }, []);

  React.useEffect(() => {
    countLikes();
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
    <Grid container spacing={2} className={classes.wrapper}>
      <Grid item xs={11} />
      <Grid item xs={1} className={classes.editIconsSection}>
        {UserSessionDataHandler.getUserData().uid === comment.user.uid ? (
          <>
            <EditIcon
              className={classes.iconEdit}
              onClick={() => setCommentToEdit(comment)}
            />
            <DeleteIcon
              className={classes.iconDelete}
              onClick={() => setCommentToDelete(comment)}
            />
          </>
        ) : null}
      </Grid>
      <Grid item xs={12}>
        {comment.text}
      </Grid>
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
  );
};

DisplayComment.propTypes = {
  comment: PropTypes.object.isRequired,
  setCommentToEdit: PropTypes.func.isRequired,
  setCommentToDelete: PropTypes.func.isRequired,
};

export default DisplayComment;
