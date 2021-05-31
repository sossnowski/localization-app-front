import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationIcon from '@material-ui/icons/Notifications';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Badge, Container } from '@material-ui/core';
import Popper from '@material-ui/core/Popper';
import { ExitToApp } from '@material-ui/icons';
import socketIOClient from 'socket.io-client';
import MainListItems from './ListItems';
import ContentController from '../contentController/Main';
import sidebarOpenContext from './sidebarContext';
import Auth from '../../auth/Auth';
import history from '../../history';
import UserSessionDataHandler from '../../auth/UserSessionDataHandler';
import { socketUrl } from '../../consts/config';
import { authGetRequestWithParams } from '../../helpers/apiRequests';
import Notifications from '../notification/Main';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    marginTop: '64px',
    overflowY: 'auto',
    backgroundColor: theme.palette.background.default,
    overflowX: 'hidden',
  },
  container: {
    paddingTop: theme.spacing(4),
  },
  popperPaper: {
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    width: 400,
    marginTop: 40,
    borderRadius: 5,
  },
}));

const MainWrapper = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [notifications, setNotifications] = React.useState([]);
  const notificationsRef = React.useRef([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const mainWrapperRef = React.useRef(null);
  const wasRendered = React.useRef(false);

  React.useEffect(() => {
    getNotifications();
    const socket = socketIOClient(socketUrl, {
      transports: ['websocket'],
      query: {
        auth: UserSessionDataHandler.getUserData()?.uid,
      },
    });
    socket.on('notification', handleSocketNotification);
    socket.on('error', (error) => console.log(error));

    return () =>
      socket.emit('userLeave', UserSessionDataHandler.getUserData()?.uid);
  }, []);

  React.useEffect(() => {
    if (!mainWrapperRef.current) return;
    mainWrapperRef.current.addEventListener('click', handleWrapperClick);

    // return () =>
    //   mainWrapperRef.current.removeEventListener('click', handleWrapperClick);
  }, [mainWrapperRef.current]);

  const handleWrapperClick = () => {
    if (!wasRendered.current) {
      setAnchorEl(null);
      wasRendered.current = true;
    }
  };

  const handleSocketNotification = (notification) => {
    notificationsRef.current = [notification, ...notificationsRef.current];
    setNotifications(notificationsRef.current);
  };

  const getNotifications = () => {
    authGetRequestWithParams('notifications', { offset: 0 }).then((result) => {
      if (result.status === 200) setNotifications(result.data);
    });
  };

  React.useEffect(() => {
    notificationsRef.current = notifications;
  }, [notifications]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const notificationToggle = (event) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      getNotifications();
      setAnchorEl(event.currentTarget);
      wasRendered.current = false;
    }
  };

  const logout = () => {
    Auth.unauthenticate();
    history.push(`/login`);
  };

  const showMoreNotifications = () => {
    authGetRequestWithParams('notifications', {
      offset: notificationsRef.current.length,
    }).then((result) => {
      if (result.status === 200)
        setNotifications([...notifications, ...result.data]);
    });
  };

  const openPopover = Boolean(anchorEl);
  const idOfPopover = openPopover ? 'simple-popper' : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            SpotFinder
          </Typography>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.filter((item) => item.new).length}
              color="error"
            >
              <NotificationIcon
                aria-describedby={idOfPopover}
                onClick={(e) => notificationToggle(e)}
              />
              <Popper id={idOfPopover} open={openPopover} anchorEl={anchorEl}>
                <div className={classes.popperPaper}>
                  <Notifications
                    notifications={notifications}
                    showMore={showMoreNotifications}
                    setNotifications={setNotifications}
                  />
                </div>
              </Popper>
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <ExitToApp onClick={() => logout()} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <MainListItems />
        <Divider />
      </Drawer>
      <main
        className={classes.content}
        ref={(mainWrapper_) => (mainWrapperRef.current = mainWrapper_)}
        id="content-wrapper"
      >
        <Container maxWidth="lg" className={classes.container}>
          <sidebarOpenContext.Provider value={open}>
            <ContentController />
          </sidebarOpenContext.Provider>
        </Container>
      </main>
    </div>
  );
};

export default MainWrapper;
