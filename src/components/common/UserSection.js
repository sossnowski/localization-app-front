import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    color: '#e0e0e0',
    padding: '8px',
  },
  toTop: {
    marginTop: '10px',
  },
  textAlign: {
    textAlign: 'right',
  },
  paddingLeft: {
    paddingLeft: 20,
    [theme.breakpoints.up('md')]: {
      paddingLeft: 5,
    },
  },
}));

const UserSection = (props) => {
  const { username, time } = props;
  const classes = useStyles();

  return (
    <Grid container className={classes.wrapper}>
      <Grid item xs={1}>
        <Avatar>U</Avatar>
      </Grid>
      <Grid item xs={7} className={`${classes.toTop} ${classes.paddingLeft}`}>
        {username}
      </Grid>
      <Grid item xs={4} className={`${classes.toTop} ${classes.textAlign}`}>
        {time}
      </Grid>
    </Grid>
  );
};

UserSection.propTypes = {
  username: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default UserSection;
