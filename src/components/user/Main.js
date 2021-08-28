import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  TextField,
} from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserSessionDataHandler from '../../auth/UserSessionDataHandler';
import { authPatchRequest } from '../../helpers/apiRequests';
import { addAlert } from '../../store/actions/alert/alert';
import ThemeSettings from './ThemeSettings';
import LanguageSettings from './LanguageSettings';

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
      [theme.breakpoints.up('md')]: {
        marginTop: 40,
      },
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

const UserSettings = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const strings = useSelector((state) => state.language);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [values, setValues] = React.useState({
    ...UserSessionDataHandler.getUserData(),
    password: '',
    rePassword: '',
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
    const userDataObject = {
      username: values.username,
      email: values.email,
    };
    if (values.password.length) userDataObject.password = values.password;
    if (values.password.length && values.password !== values.rePassword) return;
    authPatchRequest('user', userDataObject).then((result) => {
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
          addAlert({
            title: strings.alerts.addDataSuccess.title_,
            desc: strings.alerts.addDataSuccess.desc_,
            type: 'success',
          })
        );
        const updatedUser = { ...values };
        delete updatedUser.password;
        delete updatedUser.rePassword;
        UserSessionDataHandler.saveUserData(updatedUser);
      }
    });
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid item xs={12}>
        <Paper className={fixedHeightPaper}>
          <Grid item xs={12}>
            <h1>{strings.user.header_}</h1>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={12} lg={6}>
              <TextField
                label={strings.user.username_}
                variant="outlined"
                fullWidth
                onChange={handleChange}
                name="username"
                value={values.username}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                label={strings.user.email_}
                variant="outlined"
                fullWidth
                onChange={handleChange}
                name="email"
                value={values.email}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                label={strings.user.password_}
                variant="outlined"
                fullWidth
                onChange={handleChange}
                name="password"
                value={values.password}
                type="password"
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                label={strings.user.rePassword_}
                variant="outlined"
                fullWidth
                error={values.password !== values.rePassword}
                onChange={handleChange}
                name="rePassword"
                value={values.rePassword}
                type="password"
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <ThemeSettings />
            </Grid>
            <Grid item xs={12} lg={6}>
              <LanguageSettings />
            </Grid>
          </Grid>
          <Grid container>
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
        </Paper>
      </Grid>
    </form>
  );
};

export default UserSettings;
