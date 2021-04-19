import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { editPost } from '../../store/actions/post/post';
import { authPostRequest } from '../../helpers/apiRequests';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: theme.spacing(2),
    width: '100%',
    marginTop: '40px',
    borderRadius: '5px',
  },
}));

const AddComment = (props) => {
  const { post } = props;
  const classes = useStyles();
  const strings = useSelector((state) => state.language.comments.add);
  const dispatch = useDispatch();
  const [text, setText] = React.useState('');
  const localizationUid = useParams()?.uid;
  console.log(localizationUid);

  const add = () => {
    if (text === '') return;
    authPostRequest('comments', {
      postUid: post.uid,
      text,
      localizationUid,
    }).then((result) => {
      if (result.status === 201) {
        dispatch(
          editPost({
            ...post,
            comments: [...post.comments, { ...result.data, likes: [] }],
          })
        );
        setText('');
      }
    });
  };

  const handleChange = (evt) => {
    setText(evt.target.value);
  };

  return (
    <Grid container spacing={2} className={classes.wrapper}>
      <Grid item xs={12}>
        <TextField
          id="outlined-basic"
          label={strings.textArea_}
          variant="outlined"
          rowsMax={10}
          cols={5}
          fullWidth
          value={text}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => add()}
        >
          {strings.button_}
        </Button>
      </Grid>
    </Grid>
  );
};

AddComment.propTypes = {
  post: PropTypes.object.isRequired,
};

export default AddComment;
