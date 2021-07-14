import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/core';
import { none } from 'ol/centerconstraint';
import { removeAlert, removeAllAlerts } from '../../store/actions/alert/alert';

const useStyles = makeStyles((theme) => ({
  alertErrorPopupColor: {
    backgroundColor: theme.palette.error.main,
    border: `1px solid ${theme.palette.error.dark}`,
  },
  alertSuccessPopupColor: {
    backgroundColor: theme.palette.success.main,
    border: `1px solid ${theme.palette.success.dark}`,
  },
  alertWarningPopupColor: {
    backgroundColor: theme.palette.warning.main,
    border: `1px solid ${theme.palette.warning.dark}`,
  },
  iconDelete: {
    position: 'absolute',
    top: '10px',
    right: '20px',
    cursor: 'pointer',
    zIndex: 1402,
  },
  wrapper: {
    width: '100%',
    height: 50,
    marginBottom: '10px',
    position: 'relative',
    zIndex: 1401,
    [theme.breakpoints.up('md')]: {
      height: '150px',
    },
  },
  allAlertsWrapper: {
    position: 'absolute',
    top: 30,
    width: '70vw',
    right: '15vw',

    zIndex: 1400,
    [theme.breakpoints.up('md')]: {
      top: 'calc(100vh - 200px)',
      right: '60px',
      width: '300px',
      minHeight: '150px',
    },
  },
  header: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
  },
}));

const AlertComponent = (props) => {
  const { alerts } = props;
  const dispatch = useDispatch();
  const [alertsToDisplay, setAlertsToDisplay] = React.useState([]);
  const classes = useStyles();
  const [showAlert, setShowAlert] = React.useState(true);

  const removeAlertHandler = (alert) => {
    dispatch(removeAlert(alert));
  };

  React.useEffect(() => {
    const array = [];
    Object.keys(alerts).forEach((alertType) => {
      if (!alerts[alertType].length) return;
      const alert = (
        <div>
          <Alert
            variant="filled"
            severity={alertType}
            className={classes.wrapper}
          >
            <ClearIcon
              className={classes.iconDelete}
              onClick={() =>
                removeAlertHandler(
                  alerts[alertType][alerts[alertType].length - 1]
                )
              }
            />
            <span className={classes.header}>
              {alerts[alertType][alerts[alertType].length - 1]?.title}
            </span>
            <p>{alerts[alertType][alerts[alertType].length - 1]?.desc}</p>
          </Alert>
        </div>
      );
      array.push(alert);
    });
    setAlertsToDisplay(array);
    setShowAlert(true);
  }, [alerts]);

  React.useEffect(() => {
    setTimeout(() => {
      setShowAlert(false);
      setAlertsToDisplay([]);
      dispatch(removeAllAlerts());
    }, 3000);
  }, [alerts]);

  return alertsToDisplay.length && showAlert ? (
    <div className={classes.allAlertsWrapper}>{alertsToDisplay}</div>
  ) : null;
};

AlertComponent.propTypes = {
  alerts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps)(AlertComponent);
