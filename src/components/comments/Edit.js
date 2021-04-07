import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, makeStyles, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import RedoIcon from '@material-ui/icons/Redo';
import { authPatchRequest } from '../../helpers/apiRequests';
import { addAlert } from '../../store/actions/alert/alert';
import { editPost } from '../../store/actions/post/post';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    border: `1px solid #6E736F`,
    padding: theme.spacing(2),
    width: '100%',
    marginTop: '40px',
    borderRadius: '5px',
  },
  header: {
    fontSize: '12px',
  },
  editIcon: {
    fontSize: '22px',
    cursor: 'pointer',
    marginTop: '20px',
    marginLeft: '-20px',
  },
}));

const EditComment = (props) => {
  const { post, commentToEdit, setCommentToEdit } = props;
  const classes = useStyles();
  const strings = useSelector((state) => state.language);
  const dispatch = useDispatch();
  const [text, setText] = React.useState(commentToEdit.text);

  const handleChange = (evt) => {
    setText(evt.target.value);
  };

  const onSaveClick = () => {
    authPatchRequest('comments', { uid: commentToEdit.uid, text }).then(
      (result) => {
        if (result.status !== 200)
          dispatch(
            addAlert({
              title: strings.alerts.dataProccessError.title_,
              desc: result.message,
              type: 'error',
            })
          );
        else {
          dispatch(
            editPost({
              ...post,
              comments: post.comments.map((comment) =>
                comment.uid === commentToEdit.uid
                  ? { ...comment, text }
                  : comment
              ),
            })
          );
          setCommentToEdit(null);
          dispatch(
            addAlert({
              title: strings.alerts.addDataSuccess.title_,
              desc: strings.alerts.addDataSuccess.desc_,
              type: 'success',
            })
          );
        }
      }
    );
  };

  return (
    <Grid container spacing={2} className={classes.wrapper}>
      <Grid item xs={11}>
        <h1 className={classes.header}>Edytuj komentarz</h1>
      </Grid>
      <Grid item xs={1}>
        <RedoIcon
          onClick={() => setCommentToEdit(null)}
          className={classes.editIcon}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined-basic"
          label={strings.textArea_}
          variant="outlined"
          fullWidth
          rowsMax={10}
          cols={5}
          value={text}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => onSaveClick()}
        >
          {strings.posts.add.button_}
        </Button>
      </Grid>
    </Grid>
  );
};

EditComment.propTypes = {
  commentToEdit: PropTypes.object.isRequired,
  setCommentToEdit: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

export default EditComment;
