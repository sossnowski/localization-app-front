import { makeStyles } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  instruction: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
      color: '#BDD7E4',
      position: 'absolute',
      bottom: 80,
      left: 80,
      minWidth: 200,
      maxWidth: '20vw',
    },
  },
}));

const AppDescription = (props) => {
  const { paragraphs } = props;
  const classes = useStyles();

  return (
    <div className={classes.instruction}>
      <p>{paragraphs.first_}</p>
      <p>{paragraphs.second_}</p>
      <p>{paragraphs.third_}</p>
    </div>
  );
};

AppDescription.propTypes = {
  paragraphs: PropTypes.object.isRequired,
};

export default AppDescription;
