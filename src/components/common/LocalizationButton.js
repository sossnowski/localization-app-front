import React from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles((theme) => ({
  main: {
    position: 'absolute',
    width: '50px',
    minWidth: '50px',
    height: '50px',
    borderRadius: '50%',
    padding: 0,
    fontSize: '20px',
    zIndex: 1001,
    color: theme.palette.secondary.main,
  },
}));

const LocalizationButton = (props) => {
  const { bottom, right, setUserPosition } = props;
  const classes = useStyles();

  const localizationHandler = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserPosition([position.coords.longitude, position.coords.latitude]);
    });
  };

  return (
    <Button
      variant="contained"
      color="primary"
      style={{ bottom, right }}
      className={classes.main}
      onClick={() => localizationHandler()}
    >
      <LocationOnIcon />
    </Button>
  );
};

LocalizationButton.propTypes = {
  bottom: PropTypes.number,
  right: PropTypes.number,
  setUserPosition: PropTypes.func.isRequired,
};

LocalizationButton.defaultProps = {
  right: 200,
};

export default LocalizationButton;
