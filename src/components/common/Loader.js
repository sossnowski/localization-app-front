import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import RotateLoader from 'react-spinners/RotateLoader';

const useStyles = makeStyles({
  modalContainer: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    zIndex: '2000',
    height: '100vh',
  },
  loaderContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.80)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

const PopupLoader = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.modalContainer}>
      <div className={classes.loaderContainer}>
        <RotateLoader
          color={theme.palette.primary.main}
          size={40}
          margin={40}
        />
      </div>
    </div>
  );
};

export default PopupLoader;
