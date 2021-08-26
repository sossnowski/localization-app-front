import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LanguageIcon from '@material-ui/icons/Language';
import Alert from '@material-ui/lab/Alert';
import { useParams } from 'react-router-dom';
import {
  authGetRequestWithParams,
  authPatchRequest,
} from '../../helpers/apiRequests';
import Languages from '../../consts/languages';
import history from '../../history';
import AppDescription from '../common/AppDescription';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100vw',
    height: '100vh',
    position: 'relative',
    backgroundColor: '#ffffff',
    backgroundImage: 'url("mapMain.jpg")',
    backgroundSize: 'cover',
    backgroundPositionX: 'center',
    overflowY: 'auto',
    [theme.breakpoints.up('md')]: {
      backgroundColor: '#6E736F',
      backgroundSize: 'cover',
      backgroundPositionY: '-200px',
    },
  },
  root: {
    width: '100%',
    padding: 15,
    color: 'white',
    height: '100vh',
    opacity: 0.9,
    backgroundColor: '#ffffff',
    [theme.breakpoints.up('md')]: {
      height: 'auto',
      paddingTop: '15px',
      paddingBottom: '15px',
      marginTop: '100px',
      marginLeft: 'calc(50% - 220px)',
      marginBottom: '40px',
      opacity: 0.9,
      borderRadius: 3,
      boxShadow: '0 2px 4px rgb(0 0 40 / 0.3), 0 12px 20px rgb(0 0 40 / 0.3)',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: theme.palette.fontColor,
  },
  langIconWrapper: {
    position: 'absolute',
    top: '40px',
    right: '40px',
    cursor: 'pointer',
    fontSize: '1.2rem',
    color: '#696969',
    [theme.breakpoints.up('md')]: {
      color: '#ffffff',
    },
  },
  langIcon: {
    position: 'relative',
    top: '-2px',
    color: '#696969',
    [theme.breakpoints.up('md')]: {
      color: '#ffffff',
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#ffffff',
    color: '#696969',
    width: 80,
    height: 80,
  },
  form: {
    color: theme.palette.fontColor,
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.third.main,
  },
  cssOutlinedInput: {
    color: theme.palette.fontColor,
  },
  outlined: {
    color: theme.palette.fontColor,
  },
  notchedOutline: {
    borderColor: theme.palette.fontColor,
  },
  input: {
    '&:-webkit-autofill': {
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: '#fff',
    },
  },
  copyRightText: {
    color: theme.palette.fontColor,
  },
  checkboxField: {
    color: theme.palette.fontColor,
  },
  checkboxError: {
    color: 'red',
  },
  hawkeLogo: {
    height: '20px',
    width: '20px',
    margin: '0px 3px',
  },
  copyrightContentContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    color: theme.palette.fontColor,
  },
  header: {
    textAlign: 'center',
  },
  logoIcon: {
    width: '200%',
  },
}));

const ResetPassword = () => {
  const { token } = useParams();
  const [siteLang, setSiteLang] = React.useState('pl');
  const [subtitles, setSubtitles] = React.useState(Languages[siteLang]);
  const [success, setSuccess] = React.useState(false);
  const [requestError, setRequestError] = React.useState(false);
  const [validateError, setValidateError] = React.useState(false);

  const changeLanguage = () => {
    const langToShow = siteLang === 'pl' ? 'en' : 'pl';
    setSiteLang(langToShow);
  };

  React.useEffect(() => {
    setSubtitles(Languages[siteLang]);
  }, [siteLang]);

  const [values, setValues] = React.useState({
    username: '',
    password: '',
    rePassword: '',
  });
  const classes = useStyles();

  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const send = async () => {
    if (!token) {
      try {
        if (!values.username.length) {
          setValidateError(true);
          return;
        }
        const response = await authGetRequestWithParams('resetPassword', {
          email: values.username,
        });
        if (response.status === 200) {
          setSuccess(true);
          setRequestError(false);
        } else setRequestError(true);
      } catch (e) {
        setRequestError(true);
      }
    } else {
      try {
        if (!values.password.length || values.password !== values.rePassword) {
          setValidateError(true);
          return;
        }
        const response = await authPatchRequest('setNewPassword', {
          password: values.password,
          token,
        });
        if (response.status === 200) {
          setSuccess(true);
          setRequestError(false);
        } else setRequestError(true);
      } catch (e) {
        setRequestError(true);
      }
    }
  };

  const handleEnterClick = (event) => {
    if (event.key === 'Enter') {
      send();
    }
  };

  const successAlert = () => (
    <Alert severity="success" variant="outlined">
      <h5>
        {token
          ? subtitles.resetPassword.setPassword.successMsg_
          : subtitles.resetPassword.emailPage.successMsg_}
      </h5>
    </Alert>
  );

  const registerErrorAlert = () => (
    <Alert severity="error" variant="outlined">
      <h5>
        {token
          ? subtitles.resetPassword.setPassword.error_
          : subtitles.resetPassword.emailPage.error_}
      </h5>
    </Alert>
  );

  return (
    <div className={classes.wrapper}>
      <Button className={classes.langIconWrapper} onClick={changeLanguage}>
        <LanguageIcon className={classes.langIcon} />
        {siteLang === 'pl' ? 'EN' : 'PL'}
      </Button>

      <Container className={classes.root} component="main" maxWidth="xs">
        <CssBaseline />
        {success && successAlert()}
        {requestError && registerErrorAlert()}
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <img className={classes.logoIcon} src="logo.svg" alt="Logo" />
          </Avatar>
          <Typography component="h3" variant="h5" className={classes.header}>
            {token
              ? subtitles.resetPassword.setPassword.header_
              : subtitles.resetPassword.emailPage.header_}
          </Typography>
          <form className={classes.form} noValidate>
            {!token ? (
              <TextField
                variant="outlined"
                margin="normal"
                required
                error={validateError && !values.username.length}
                fullWidth
                color="primary"
                InputLabelProps={{
                  classes: {
                    outlined: classes.outlined,
                  },
                }}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    notchedOutline: classes.notchedOutline,
                    input: classes.input,
                  },
                }}
                id="username"
                label={subtitles.loginScreen.email_}
                name="username"
                autoComplete="username"
                autoFocus
                onChange={handleChange}
                value={values.username}
              />
            ) : (
              <>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  error={
                    validateError &&
                    (!values.password.length ||
                      values.password !== values.rePassword)
                  }
                  color="primary"
                  type="password"
                  InputLabelProps={{
                    classes: {
                      outlined: classes.outlined,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      notchedOutline: classes.notchedOutline,
                      input: classes.input,
                    },
                  }}
                  id="password"
                  label={subtitles.resetPassword.setPassword.password_}
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  error={
                    validateError &&
                    (!values.rePassword.length ||
                      values.password !== values.rePassword)
                  }
                  color="primary"
                  InputLabelProps={{
                    classes: {
                      outlined: classes.outlined,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      notchedOutline: classes.notchedOutline,
                      input: classes.input,
                    },
                  }}
                  name="rePassword"
                  label={subtitles.resetPassword.setPassword.rePassword_}
                  type="password"
                  id="rePassword"
                  onChange={handleChange}
                  onKeyPress={handleEnterClick}
                  value={values.rePassword}
                />
              </>
            )}
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={send}
            >
              {subtitles.resetPassword.setPassword.button_}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link variant="body2" onClick={() => history.push('/login')}>
                  {subtitles.loginScreen.login_}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <AppDescription paragraphs={subtitles.appDescription} />
    </div>
  );
};

export default ResetPassword;
