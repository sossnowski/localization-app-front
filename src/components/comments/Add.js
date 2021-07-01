import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid } from '@material-ui/core';
import { editPost } from '../../store/actions/post/post';
import { authPostRequest } from '../../helpers/apiRequests';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: theme.spacing(2),
    width: '100%',
    marginTop: '10px',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  input: {
    marginBottom: 10,
  },
}));

const AddComment = (props) => {
  const { post } = props;
  const classes = useStyles();
  const strings = useSelector((state) => state.language.comments.add);
  const dispatch = useDispatch();
  const [text, setText] = React.useState('');
  const localizationUid = useSelector((state) =>
    state.selectedLocalization.getId()
  );
  const [showError, setShowError] = React.useState(false);

  const add = () => {
    if (!isDataValid()) return;
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
    setShowError(false);
    setText(evt.target.value);
  };

  const isDataValid = () => {
    if (text === '') {
      setShowError(true);

      return false;
    }

    return true;
  };

  return (
    <Grid container className={classes.wrapper}>
      <Grid item className={classes.input} xs={12}>
        <TextField
          id="outlined-basic"
          label={strings.textArea_}
          variant="outlined"
          rowsMax={10}
          cols={5}
          error={showError}
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
