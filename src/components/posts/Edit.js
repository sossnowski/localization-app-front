import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, makeStyles, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import RedoIcon from '@material-ui/icons/Redo';
import { authPatchRequest } from '../../helpers/apiRequests';
import { addAlert } from '../../store/actions/alert/alert';
import { editPost } from '../../store/actions/post/post';

const useStyles = makeStyles({
  root: {
    border: `1px solid #6E736F`,
    padding: '8px',
    borderRadius: '5px',
  },
  header: {
    fontSize: '20px',
  },
  editIcon: {
    fontSize: '22px',
    cursor: 'pointer',
    marginTop: '20px',
    marginLeft: '-20px',
  },
});

const AddPost = (props) => {
  const { postToEdit, setPostToEdit } = props;
  const classes = useStyles();
  const strings = useSelector((state) => state.language);
  const dispatch = useDispatch();
  const [values, setValues] = React.useState(postToEdit);

  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const onSaveClick = () => {
    authPatchRequest('post', values).then((result) => {
      if (result.status !== 200)
        dispatch(
          addAlert({
            title: strings.alerts.dataProccessError.title_,
            desc: result.message,
            type: 'error',
          })
        );
      else {
        dispatch(editPost(values));
        setPostToEdit(null);
        dispatch(
          addAlert({
            title: strings.alerts.addDataSuccess.title_,
            desc: strings.alerts.addDataSuccess.desc_,
            type: 'success',
          })
        );
      }
    });
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid container spacing={4}>
        <Grid item xs={11}>
          <h1 className={classes.header}>Edytuj post</h1>
        </Grid>
        <Grid item xs={1}>
          <RedoIcon
            onClick={() => setPostToEdit(null)}
            className={classes.editIcon}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            defaultValue={values.title}
            label={strings.posts.add.title_}
            variant="outlined"
            fullWidth
            onChange={handleChange}
            name="title"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={values.description}
            label={strings.posts.add.text_}
            variant="outlined"
            fullWidth
            multiline
            rows={10}
            rowsMax={30}
            onChange={handleChange}
            name="description"
          />
        </Grid>
        <Grid item xs={12} lg={4} />
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className={classes.marginTop}
            onClick={() => onSaveClick()}
          >
            {strings.posts.add.button_}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

AddPost.propTypes = {
  postToEdit: PropTypes.object.isRequired,
  setPostToEdit: PropTypes.func.isRequired,
};

export default AddPost;
