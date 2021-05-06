import {
  Grid,
  makeStyles,
  createStyles,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import Map from '../map/Main';
import { authPostRequest } from '../../helpers/apiRequests';
import { setSelectedLocalization } from '../../store/actions/localization/selectedLocalization';
import { addAlert } from '../../store/actions/alert/alert';
import history from '../../history';
import { createPointFeature } from '../map/utils/main';
import { getLocalizationNameByCoordinates } from './utils/map';

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
    formControl: {
      display: 'flex',
    },
  })
);

const AddLocalization = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaperMap = clsx(
    classes.paper,
    classes.fixedHeightMap,
    classes.noPadding,
    classes.marginTop
  );
  const strings = useSelector((state) => state.language);
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [position, setPosition] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const [
    localizationNameNotFound,
    setLocalizationNameNotFound,
  ] = React.useState(true);
  const [values, setValues] = React.useState({
    title: '',
    city: '',
    categoryUid: '',
    description: '',
  });

  React.useEffect(() => {
    if (position) {
      getCityName(position);
    }
  }, [position]);

  const getCityName = async (coordinates) => {
    const localizationName = await getLocalizationNameByCoordinates(
      coordinates
    );
    if (localizationName) {
      setValues({
        ...values,
        city: localizationName,
      });
      setLocalizationNameNotFound(false);
    } else {
      setLocalizationNameNotFound(true);
      setValues({
        ...values,
        city: '',
      });
    }
  };

  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFile = (event) => {
    setFile(event.target.files?.[0]);
  };

  const onSaveClick = () => {
    const postData = prepareData();
    authPostRequest('post', postData).then((result) => {
      if (result.status !== 201)
        dispatch(
          addAlert({
            title: strings.alerts.dataProccessError.title_,
            desc: result.message,
            type: 'error',
          })
        );
      else if (result.data.localization?.geometry?.coordinates) {
        const feature = createPointFeature(
          result.data.localization?.geometry?.coordinates,
          true
        );
        feature.setId(result.data.localization.uid);
        dispatch(setSelectedLocalization(feature));
        history.push(`/dashboard`);
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
    formData.append(
      'geometry',
      JSON.stringify({ type: 'Point', coordinates: position })
    );

    return formData;
  };

  const handleCityChange = (event) => {
    const { target } = event;
    const { value } = target;

    if (localizationNameNotFound) setValues({ ...values, city: value });
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid item xs={12}>
        <Paper className={fixedHeightPaper}>
          <Grid item xs={12}>
            <h1>{strings.posts.add.header_}</h1>
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
              <Paper className={fixedHeightPaperMap}>
                <Map setClickedPoint={setPosition} />
              </Paper>
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                value={values.city}
                label={strings.posts.add.city_}
                variant="outlined"
                fullWidth
                onChange={handleCityChange}
                name="city"
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Kategoria</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="categoryUid"
                  value={values.categoryUid}
                  onChange={handleChange}
                  fullWidth
                >
                  {categories.map((category) => (
                    <MenuItem value={category.uid}>{category.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
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
              <Button
                variant="contained"
                component="label"
                onChange={handleFile}
              >
                Upload File
                <input type="file" hidden name="file" />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <span>{file ? `Wybrano: ${file.name}` : ''}: </span>
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
            {strings.posts.add.button_}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddLocalization;
