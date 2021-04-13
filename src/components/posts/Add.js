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
  const [file, setFile] = React.useState(null);
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

  const handleFile = (event) => {
    console.log(event.target.files);
    setFile(event.target.files?.[0]);
  };

  const onSaveClick = () => {
    const formData = prepareData();
    authPostRequest('postToLocalization', formData).then((result) => {
      if (result.status !== 201)
        dispatch(
          addAlert({
            title: strings.alerts.dataProccessError.title_,
            desc: result.message,
            type: 'error',
          })
        );
      else {
        addPostToggle();
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

  const prepareData = () => {
    const formData = new FormData();
    for (const key of Object.keys(values)) {
      formData.append(key, values[key]);
    }
    if (file) {
      formData.append('post', file);
    }
    formData.append('localizationUid', uid);

    return formData;
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
          <Grid item xs={12}>
            <Button variant="contained" component="label" onChange={handleFile}>
              Upload File
              <input type="file" hidden name="file" />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <span>{file ? `Wybrano: ${file.name}` : ''}: </span>
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
