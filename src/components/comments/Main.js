import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LikeIcon from '@material-ui/icons/ThumbUpAlt';
import DislikeIcon from '@material-ui/icons/ThumbDownAlt';
import CommentIcon from '@material-ui/icons/ChatBubble';
import { authGetRequestWithParams } from '../../helpers/apiRequests';

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
    console.log(likes);
    if (!likes.length) return;
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

  return (
    // <div className={classes.wrapper}>
    <Grid container spacing={2} className={classes.wrapper}>
      <Grid item xs={12}>
        {comment.text} comment
      </Grid>
      {/* <Grid item xs={8} */}
      <Grid item xs={2}>
        <LikeIcon className={classes.icon} />
        {likesNumber}
      </Grid>
      <Grid item xs={2}>
        <DislikeIcon className={classes.icon} />
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
