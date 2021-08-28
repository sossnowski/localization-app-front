import React from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  main: {
    position: 'absolute',
    width: '50px',
    minWidth: '50px',
    height: '50px',
    borderRadius: '50%',
    padding: 0,
    fontSize: '20px',
    color: theme.palette.secondary.main,
  },
}));

const AddButton = (props) => {
  const { top, right, onClickHandler, content } = props;
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color="primary"
      style={{ top, right }}
      className={classes.main}
      onClick={() => onClickHandler()}
    >
      {content}
    </Button>
  );
};

AddButton.propTypes = {
  top: PropTypes.number,
  right: PropTypes.number,
  onClickHandler: PropTypes.func.isRequired,
  content: PropTypes.any,
};

AddButton.defaultProps = {
  top: 100,
  right: 200,
  content: '+',
};

export default AddButton;
