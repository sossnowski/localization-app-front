/* eslint-disable no-nested-ternary */
import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import RedoIcon from '@material-ui/icons/Redo';
import Map from '../map/Main';
import Localizations from '../localizations/Main';
import {
  authGetRequest,
  authGetRequestWithParams,
} from '../../helpers/apiRequests';
import Posts from '../posts/Main';
import CustomButton from '../common/AddButton';
import AddPost from '../posts/Add';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    marginBottom: '8px',
    overflowX: 'hidden',
    overflowY: 'auto',
    height: 'calc(100vh - 128px)',
  },
  fixedHeight: {
    height: 'calc(100vh - 128px)',
  },
  noPadding: {
    padding: 0,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const mapPaper = clsx(classes.paper, classes.fixedHeight, classes.noPadding);
  const [localizations, setLocalizations] = React.useState([]);
  const [addPost, setAddPost] = React.useState(false);
  const { uid } = useParams();

  React.useEffect(() => {
    if (uid) getLocalization();
    else getAllLocalizations();
  }, [uid]);

  const getAllLocalizations = () => {
    authGetRequest('localizations').then((result) => {
      if (result.status === 200) setLocalizations(result.data);
    });
  };

  const getLocalization = () => {
    authGetRequestWithParams('localizations', { uid }).then((result) => {
      if (result.status === 200) setLocalizations([result.data]);
    });
  };

  const addPostToggle = () => {
    setAddPost(!addPost);
  };

  return (
    <Grid item xs={12}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12} lg={5}>
          <Paper className={mapPaper}>
            <Map />
            <Localizations localizations={localizations} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={12} lg={7}>
          <Paper className={classes.paper}>
            {localizations.length === 1 ? (
              addPost ? (
                <>
                  <AddPost uid={uid} addPostToggle={addPostToggle} />
                  <CustomButton
                    onClickHandler={addPostToggle}
                    content={<RedoIcon />}
                  />
                </>
              ) : (
                <>
                  <Posts localizations={localizations} />
                  <CustomButton onClickHandler={addPostToggle} />
                </>
              )
            ) : (
              <span>Wybierz jedną z lokalizacji</span>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
