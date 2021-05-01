import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LikeIcon from '@material-ui/icons/ThumbUpAlt';
import DislikeIcon from '@material-ui/icons/ThumbDownAlt';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { authPostRequest, authPatchRequest } from '../../helpers/apiRequests';
import UserSessionDataHandler from '../../auth/UserSessionDataHandler';
import {
  handleCommentLike,
  handleCommentLikeUpdate,
} from '../localizations/socket/comments';
import { editPost } from '../../store/actions/post/post';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: 'auto', // 100px
    borderBottom: `1px solid #fafafa`,
    padding: theme.spacing(2),
    width: 'calc(100% - 20px)',
    marginLeft: '20px',
    marginTop: '20px',
    marginBottom: '10px',
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
  divider: {
    marginTop: '5px',
    marginBottom: '5px',
    width: '100%',
    height: '1px',
    backgroundColor: '#e0e0e0',
  },
  smallDivider: {
    marginTop: '2px',
    marginBottom: '2px',
    width: '60%',
    height: '1px',
    backgroundColor: '#e0e0e0',
  },
}));

const DisplayComment = (props) => {
  const { comment, setCommentToEdit, setCommentToDelete } = props;
  const classes = useStyles();
  const [likes, setLikes] = React.useState(comment.likes);
  const [likesNumber, setLikesNumber] = React.useState(null);
  const [disLikesNumber, setDisLikesNumber] = React.useState(null);
  const [commentLiked, setCommentLiked] = React.useState(null);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const localizationUid = useSelector((state) =>
    state.selectedLocalization.getId()
  );

  React.useEffect(() => {
    countLikes();
    checkWeatherUserLike();
  }, []);

  React.useEffect(() => {
    setLikes(comment.likes);
  }, [comment]);

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
        localizationUid,
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
        localizationUid,
      }).then((result) => {
        if (result.status === 201) {
          setCommentLiked(isUpVote);
          addComments(result.data);
        }
      });
    }
  };

  const updateComments = (isUpVote) => {
    const updatedPost = handleCommentLikeUpdate(posts, {
      isUpVote,
      userUid: UserSessionDataHandler.getUserData()?.uid,
      commentUid: comment.uid,
      postUid: comment.postUid,
    });
    if (updatedPost) dispatch(editPost(updatedPost));
  };

  const addComments = (like) => {
    const updatedPost = handleCommentLike(posts, {
      postUid: comment.postUid,
      like,
    });
    if (updatedPost) dispatch(editPost(updatedPost));
  };

  return (
    <Grid container spacing={2} className={classes.wrapper}>
      <Grid item xs={11}>
        {comment.text}
      </Grid>
      <Grid item xs={1} className={classes.editIconsSection}>
        {UserSessionDataHandler.getUserData().uid === comment.userUid ? (
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
      <div className={classes.divider} />
    </Grid>
  );
};

DisplayComment.propTypes = {
  comment: PropTypes.object.isRequired,
  setCommentToEdit: PropTypes.func.isRequired,
  setCommentToDelete: PropTypes.func.isRequired,
};

export default DisplayComment;
