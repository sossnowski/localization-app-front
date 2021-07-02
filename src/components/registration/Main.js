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
import { useDispatch } from 'react-redux';
import LocalAirportIcon from '@material-ui/icons/LocalAirport';
import LanguageIcon from '@material-ui/icons/Language';
import Alert from '@material-ui/lab/Alert';
import { postRequest } from '../../helpers/apiRequests';
import { addAlert } from '../../store/actions/alert/alert';
import Languages from '../../consts/languages';
import history from '../../history';
import PopupLoader from '../common/Loader';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100vw',
    height: '100vh',
    position: 'relative',
    backgroundColor: '#ffffff',
    overflowY: 'auto',
    uverflowX: 'hidden',
    [theme.breakpoints.up('md')]: {
      backgroundColor: '#6E736F',
    },
  },
  root: {
    width: '100%',
    padding: 15,
    color: 'white',
    backgroundColor: '#ffffff',
    [theme.breakpoints.up('md')]: {
      paddingTop: '15px',
      paddingBottom: '15px',
      marginTop: '10%',
      marginLeft: 'calc(50% - 220px)',
      marginBottom: '40px',
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
    color: theme.palette.third.main,
  },
  langIcon: {
    color: theme.palette.third.main,
    position: 'relative',
    top: '-2px',
    // left: '-3px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.fontColor,
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
}));

const SignIn = () => {
  const [siteLang, setSiteLang] = React.useState('en');
  const [seeableLoader, setSeeableLoader] = React.useState(false);
  const [subtitles, setSubtitles] = React.useState(Languages[siteLang]);
  const [registerSuccess, setRegisterSuccess] = React.useState(false);
  const dispatch = useDispatch();

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
    setSeeableLoader(true);
    postRequest('register', {
      username: values.username,
      password: values.password,
      email: values.email,
    })
      .then((result) => {
        if (result.status !== 201) {
          dispatch(
            addAlert({
              title: subtitles.alerts.loginError.title_,
              desc: subtitles.alerts.loginError.desc_,
              type: 'error',
            })
          );
          setSeeableLoader(false);
          return;
        }

        dispatch(
          addAlert({
            title: subtitles.alerts.loginSuccess.title_,
            desc: subtitles.alerts.loginSuccess.desc_,
            type: 'success',
          })
        );
        setSeeableLoader(false);
        setRegisterSuccess(true);
      })
      .catch((error) => {
        setSeeableLoader(false);
        dispatch(
          addAlert({
            title: subtitles.alerts.loginError.title_,
            desc: error.message,
            type: 'error',
          })
        );
      });
  };

  const handleEnterClick = (event) => {
    if (event.key === 'Enter') {
      login();
    }
  };

  const registerSuccessAlert = () => (
    <Alert severity="success" variant="outlined">
      <h5>Poprawnie zarejestrowano</h5>
      <Grid container>
        <Grid item xs>
          <Link href="" variant="body2" onClick={() => history.push('/login')}>
            {subtitles.loginScreen.message_}
          </Link>
        </Grid>
      </Grid>
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
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LocalAirportIcon />
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
                <Checkbox value="remember" className={classes.checkboxField} />
              }
              label={subtitles.loginScreen.rememberMe_}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={login}
            >
              {subtitles.loginScreen.button_}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  href=""
                  variant="body2"
                  onClick={() => history.push('/login')}
                >
                  {subtitles.loginScreen.login_}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default SignIn;
