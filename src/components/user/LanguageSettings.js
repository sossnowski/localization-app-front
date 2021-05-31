import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { setLanguage } from '../../store/actions/language/language';
import UserSessionDataHandler from '../../auth/UserSessionDataHandler';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const DefaultTheme = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language);
  const [localLanguage, setLocalLanguage] = React.useState(
    UserSessionDataHandler.getLanguage() || 'pl'
  );
  const strings = useSelector((state) => state.language.user.settings);
  const handleChange = (event) => {
    UserSessionDataHandler.saveLanguage(event.target.value);
    setLocalLanguage(event.target.value);
    dispatch(setLanguage(event.target.value));
  };
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">
        {strings.language.header_}
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={localLanguage}
        onChange={handleChange}
      >
        <MenuItem value="pl">{strings.language.pl_}</MenuItem>
        <MenuItem value="en">{strings.language.en_}</MenuItem>
      </Select>
    </FormControl>
  );
};

export default DefaultTheme;
