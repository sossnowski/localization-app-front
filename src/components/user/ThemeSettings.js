import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { setTheme } from '../../store/actions/theme/theme';
import UserSessionDataHandler from '../../auth/UserSessionDataHandler';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const DefaultTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const strings = useSelector((state) => state.language.user.settings);
  const handleChange = (event) => {
    UserSessionDataHandler.saveTheme(event.target.value);
    dispatch(setTheme(event.target.value));
  };
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">{strings.header_}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={theme}
        onChange={handleChange}
      >
        <MenuItem value="light">{strings.theme.light_}</MenuItem>
        <MenuItem value="dark">{strings.theme.dark_}</MenuItem>
      </Select>
    </FormControl>
  );
};

export default DefaultTheme;
