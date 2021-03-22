import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { editPost } from '../../store/actions/post/post';
import { authPostRequest } from '../../helpers/apiRequests';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

const AddComment = (props) => {
  const { post } = props;
  const classes = useStyles();
  const strings = useSelector((state) => state.language.comments.add);
  const dispatch = useDispatch();
  const [text, setText] = React.useState('');

  const add = () => {
    authPostRequest('addComment', { postUid: post.uid, text }).then(
      (result) => {
        if (result.status === 201)
          dispatch(
            editPost({ ...post, comments: [...post.comments, result.data] })
          );
      }
    );
  };

  const handleChange = (evt) => {
    setText(evt.target.value);
  };

  return (
    <div className={classes.root}>
      <TextField
        id="outlined-basic"
        label={strings.textArea_}
        variant="outlined"
        rowsMax={10}
        rows={3}
        value={text}
        onChange={handleChange}
      />
      <Button variant="contained" color="primary" onClick={() => add()}>
        {strings.button_}
      </Button>
    </div>
  );
};

AddComment.propTypes = {
  post: PropTypes.object.isRequired,
};

export default AddComment;
