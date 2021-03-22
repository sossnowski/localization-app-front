import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/core';
import { removeAlert } from '../../store/actions/alert/alert';

const useStyles = makeStyles((theme) => ({
  alertCounter: {
    width: '40px',
    height: '40px',
    position: 'absolute',
    right: '-20px',
    top: '-20px',
    zIndex: 2000,
    borderRadius: '50%',
    textAlign: 'center',
    lineHeight: '36px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '20px',
  },
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
    top: '20px',
    right: '20px',
    cursor: 'pointer',
    zIndex: 1402,
  },
  wrapper: {
    width: '100%',
    height: '150px',
    marginBottom: '10px',
    position: 'relative',
    zIndex: 1401,
  },
  allAlertsWrapper: {
    position: 'absolute',
    bottom: '30px',
    right: '60px',
    width: '300px',
    minHeight: '150px',
    zIndex: 1400,
  },
}));

const AlertComponent = (props) => {
  const { alerts } = props;
  const dispatch = useDispatch();
  const [alertsToDisplay, setAlertsToDisplay] = React.useState([]);
  const classes = useStyles();

  const removeAlertHandler = (alert) => {
    dispatch(removeAlert(alert));
  };

  const getStyles = (type) => {
    if (type === 'error') return classes.alertErrorPopupColor;
    if (type === 'warning') return classes.alertWarningPopupColor;
    return classes.alertSuccessPopupColor;
  };

  React.useEffect(() => {
    const array = [];
    Object.keys(alerts).forEach((alertType) => {
      if (!alerts[alertType].length) return;
      const alert = (
        <div>
          <span
            className={`${classes.alertCounter}
              ${getStyles(
                alerts[alertType][alerts[alertType].length - 1].type
              )}`}
          >
            {alerts[alertType].length}
          </span>
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
            <h5>{alerts[alertType][alerts[alertType].length - 1]?.title}</h5>
            <p>{alerts[alertType][alerts[alertType].length - 1]?.desc}</p>
          </Alert>
        </div>
      );
      array.push(alert);
    });
    setAlertsToDisplay(array);
  }, [alerts]);

  return (
    alertsToDisplay.length && (
      <div className={classes.allAlertsWrapper}>{alertsToDisplay}</div>
    )
  );
};

AlertComponent.propTypes = {
  alerts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps)(AlertComponent);
