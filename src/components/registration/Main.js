import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LanguageIcon from '@material-ui/icons/Language';
import Alert from '@material-ui/lab/Alert';
import { postRequest } from '../../helpers/apiRequests';
import Languages from '../../consts/languages';
import history from '../../history';
import PopupLoader from '../common/Loader';
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

const SignIn = () => {
  const [siteLang, setSiteLang] = React.useState('pl');
  const [seeableLoader, setSeeableLoader] = React.useState(false);
  const [subtitles, setSubtitles] = React.useState(Languages[siteLang]);
  const [registerSuccess, setRegisterSuccess] = React.useState(false);
  const [rules, setRules] = React.useState(false);
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
    email: '',
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

  const login = () => {
    if (!validate()) return;
    setSeeableLoader(true);
    setRequestError(false);
    postRequest('register', {
      username: values.username,
      password: values.password,
      email: values.email,
    })
      .then((result) => {
        if (result.status !== 201) {
          setSeeableLoader(false);
          setRequestError(true);
          return;
        }
        setSeeableLoader(false);
        setRegisterSuccess(true);
      })
      .catch((error) => {
        setSeeableLoader(false);
        setRequestError(true);
      });
  };

  const validate = () => {
    if (
      !rules ||
      !values.username.length ||
      !values.email.length ||
      !values.password.length
    ) {
      setValidateError(true);
      return false;
    }
    return true;
  };

  const handleEnterClick = (event) => {
    if (event.key === 'Enter') {
      login();
    }
  };

  const registerSuccessAlert = () => (
    <Alert severity="success" variant="outlined">
      <h5>{subtitles.loginScreen.alertHeaderRegister_}</h5>
    </Alert>
  );

  const registerErrorAlert = () => (
    <Alert severity="error" variant="outlined">
      <h5>{subtitles.loginScreen.errorRegister_}</h5>
    </Alert>
  );

  return (
    <div className={classes.wrapper}>
      {seeableLoader && <PopupLoader />}
      <Button className={classes.langIconWrapper} onClick={changeLanguage}>
        <LanguageIcon className={classes.langIcon} />
        {siteLang === 'pl' ? 'EN' : 'PL'}
      </Button>

      <Container className={classes.root} component="main" maxWidth="xs">
        <CssBaseline />
        {registerSuccess && registerSuccessAlert()}
        {requestError && registerErrorAlert()}
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <img className={classes.logoIcon} src="logo.svg" alt="Logo" />
          </Avatar>
          <Typography component="h1" variant="h5" className={classes.header}>
            {subtitles.loginScreen.helloMessage_} {subtitles.appName_}
            {'. '}
            {subtitles.loginScreen.message_}
          </Typography>
          <form className={classes.form} noValidate>
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
              label={subtitles.loginScreen.username_}
              name="username"
              autoComplete="username"
              autoFocus
              onChange={handleChange}
              value={values.username}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={validateError && !values.email.length}
              color="primary"
              type="email"
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
              id="email"
              label={subtitles.loginScreen.email_}
              name="email"
              autoComplete="email"
              onChange={handleChange}
              value={values.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={validateError && !values.password.length}
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
              name="password"
              label={subtitles.loginScreen.password_}
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
              onKeyPress={handleEnterClick}
              value={values.password}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={rules}
                  className={
                    validateError && !rules
                      ? classes.checkboxError
                      : classes.checkboxField
                  }
                  onChange={() => setRules(!rules)}
                />
              }
              label={subtitles.loginScreen.rules_}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={login}
            >
              {subtitles.loginScreen.registerButton_}
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

export default SignIn;
