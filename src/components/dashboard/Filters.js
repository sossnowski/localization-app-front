import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import { setLocalizationFilters } from '../../store/actions/localization/filter';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  span: {
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50,
  },
}));

const LocalizationFilters = () => {
  const filterValues = useSelector((state) => state.localizationFilters);
  const classes = useStyles();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  React.useEffect(() => {
    if (!filterValues.length)
      dispatch(
        setLocalizationFilters(categories.map((category) => category.name))
      );
  }, [categories]);

  const handleChange = (value) => {
    if (filterValues.includes(value))
      dispatch(
        setLocalizationFilters(
          filterValues.filter((itemValue) => itemValue !== value)
        )
      );
    else dispatch(setLocalizationFilters([...filterValues, value]));
  };

  const isChecked = (value) => !!filterValues.includes(value);

  const handleAllClick = () => {
    if (!filterValues.length)
      dispatch(
        setLocalizationFilters(categories.map((category) => category.name))
      );
    else dispatch(setLocalizationFilters([]));
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <FormLabel component="legend">
          Filtruj lokalizacje po kategorii
        </FormLabel>
      </Grid>
      {categories.map((category) => (
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isChecked(category.name)}
                onChange={() => handleChange(category.name)}
                value={category.name}
              />
            }
            label={category.name}
          />
        </Grid>
      ))}
      <Grid item xs={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={filterValues.length === categories.length}
              onChange={() => handleAllClick()}
            />
          }
          label="wszystkie"
        />
      </Grid>
      <Typography color="primary" className={classes.span}>
        Wybierz jedną z lokalizacji - przybliż mapę aby zobaczyć oznaczone
        miejsca
      </Typography>
    </Grid>
    // </div>
  );
};

export default LocalizationFilters;
