/* eslint-disable no-nested-ternary */
import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import RedoIcon from '@material-ui/icons/Redo';
import { useDispatch, useSelector } from 'react-redux';
import Map from '../map/Main';
import Localizations from '../localizations/Main';
import { authGetRequest } from '../../helpers/apiRequests';
import Posts from '../posts/Main';
import CustomButton from '../common/AddButton';
import AddPost from '../posts/Add';
import { setCategories } from '../../store/actions/category/category';
import LocalizationFilters from './Filters';

const useStyles = makeStyles((theme) => ({
  mainWrapper: {
    overflowX: 'hidden',
  },
  container: {
    paddingTop: 0,
    paddingBottom: 0,
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: 'auto',
    paddingTop: 40,
    borderRadius: 0,
    [theme.breakpoints.up('md')]: {
      overflowX: 'hidden',
      overflowY: 'auto',
      height: 'calc(100vh - 128px)',
      paddingTop: theme.spacing(2),
    },
  },
  fixedHeight: {
    height: 'calc(100vh - 220px)',
    [theme.breakpoints.up('md')]: {
      height: 'calc(100vh - 128px)',
    },
  },
  noPadding: {
    padding: 0,
    marginBottom: 0,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const mapPaper = clsx(classes.paper, classes.fixedHeight, classes.noPadding);
  const localizations = useSelector((state) => state.localizations);
  const selectedLocalization = useSelector(
    (state) => state.selectedLocalization
  );
  const [addPost, setAddPost] = React.useState(false);

  React.useState(() => {
    authGetRequest('categories').then((result) => {
      if (result.status === 200) dispatch(setCategories(result.data));
    });
  }, []);

  const addPostToggle = () => {
    setAddPost(!addPost);
  };

  return (
    <Grid item xs={12} className={classes.mainWrapper}>
      <Grid container className={classes.container}>
        <Grid item xs={12} md={12} lg={5}>
          <Paper className={mapPaper}>
            <Map />
            <Localizations localizations={localizations} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={12} lg={7}>
          <Paper className={classes.paper}>
            {selectedLocalization ? (
              addPost ? (
                <>
                  <AddPost
                    uid={selectedLocalization.getId()}
                    addPostToggle={addPostToggle}
                  />
                  <CustomButton
                    onClickHandler={addPostToggle}
                    top={80}
                    right={30}
                    content={<RedoIcon />}
                  />
                </>
              ) : (
                <>
                  <Posts />
                  <CustomButton
                    top={80}
                    right={30}
                    onClickHandler={addPostToggle}
                  />
                </>
              )
            ) : (
              <Grid item xs={12}>
                <LocalizationFilters />
              </Grid>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
