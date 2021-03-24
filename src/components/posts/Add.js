import {
  Grid,
  makeStyles,
  createStyles,
  Paper,
  Button,
} from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import Map from '../map/Main';
import { authPostRequest } from '../../helpers/apiRequests';
import { addAlert } from '../../store/actions/alert/alert';
import history from '../../history';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& .MuiFormControl-marginNormal': {
        marginTop: '5px',
      },
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 'auto',
    },
    fixedHeightMap: {
      height: '350px',
    },
    noPadding: {
      padding: 0,
    },
    marginTop: {
      marginTop: '30px',
    },
  })
);

const MissionForm = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaperMap = clsx(
    classes.paper,
    classes.fixedHeightMap,
    classes.noPadding,
    classes.marginTop
  );
  const strings = useSelector((state) => state.language);
  const dispatch = useDispatch();
  const [position, setPosition] = React.useState(null);
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
    const postData = { ...values };
    postData.geometry = { type: 'Point', coordinates: position };
    authPostRequest('post', postData).then((result) => {
      if (result.status !== 201)
        dispatch(
          addAlert({
            title: strings.alerts.dataProccessError.title_,
            desc: result.message,
            type: 'error',
          })
        );
      else history.push(`/dashboard/${result.data.localization.uid}`);
    });
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid item xs={12}>
        <Paper className={fixedHeightPaper}>
          <Grid item xs={12}>
            <h1>{strings.addForm.header_}</h1>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                defaultValue={values.title}
                label={strings.addForm.title_}
                variant="outlined"
                fullWidth
                onChange={handleChange}
                name="title"
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                value={values.city}
                label={strings.addForm.city_}
                variant="outlined"
                fullWidth
                onChange={handleChange}
                name="city"
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                value={values.category}
                label={strings.addForm.category_}
                variant="outlined"
                fullWidth
                onChange={handleChange}
                name="category"
              />
            </Grid>
            <Grid item xs={12}>
              <Paper className={fixedHeightPaperMap}>
                <Map setClickedPoint={setPosition} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={values.description}
                label={strings.addForm.text_}
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
        </Paper>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={9} />
        <Grid item xs={12} lg={3}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className={classes.marginTop}
            onClick={() => onSaveClick()}
          >
            {strings.addForm.save_}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default MissionForm;
