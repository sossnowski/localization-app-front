import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, makeStyles, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { authPostRequest } from '../../helpers/apiRequests';
import { addAlert } from '../../store/actions/alert/alert';

const useStyles = makeStyles({
  main: {},
});

const AddPost = (props) => {
  const { uid, addPostToggle } = props;
  const classes = useStyles();
  const strings = useSelector((state) => state.language);
  const dispatch = useDispatch();
  const [values, setValues] = React.useState({
    title: '',
    city: '',
    category: '',
    description: '',
  });

  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const onSaveClick = () => {
    const postData = { ...values, localizationUid: uid };
    authPostRequest('postToLocalization', postData).then((result) => {
      if (result.status !== 201)
        dispatch(
          addAlert({
            title: strings.alerts.dataProccessError.title_,
            desc: result.message,
            type: 'error',
          })
        );
      else addPostToggle();
    });
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid item xs={12}>
        <Grid item xs={12}>
          <h1>Dodaj nowy post dla tej lokalizacji</h1>
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
  uid: PropTypes.string.isRequired,
  addPostToggle: PropTypes.func.isRequired,
};

export default AddPost;
