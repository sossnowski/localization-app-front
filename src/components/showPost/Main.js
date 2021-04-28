import { Grid, makeStyles, Paper } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { authGetRequestWithParams } from '../../helpers/apiRequests';
import PostWrapper from '../posts/PostWrapper';
import Map from '../map/Main';
import { setSelectedLocalization } from '../../store/actions/localization/selectedLocalization';
import {
  addFeatureToLayer,
  addLayerToMap,
  centerMapToCordinates,
  clearLayerSource,
  createLayer,
  createPointFeature,
  removeLayerIfExists,
} from '../map/utils/main';
import Localizations from '../localizations/Main';
import { setSelectedLocalizationStyle } from '../localizations/utils/map';

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

const ShowPost = () => {
  const { type, uid } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const map = useSelector((state) => state.map);
  const mapPaper = clsx(classes.paper, classes.fixedHeight, classes.noPadding);
  const postLayer = React.useRef(null);
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    if (!Object.keys(map).length) return;
    postLayer.current = createLayer('postLocalization');
    addLayerToMap(map, postLayer.current);

    return () => removeLayerIfExists(map, postLayer.current);
  }, [map]);

  React.useEffect(() => {
    if (type && uid) {
      if (type === 'comment') getCommentData(uid);
      else if (type === 'post') getPostData(uid);
    }

    return () => clearLayerSource(postLayer.current);
  }, [uid]);

  const getCommentData = (uidParam) => {
    authGetRequestWithParams('getPostByComment', { uid: uidParam }).then(
      (result) => {
        if (result.status === 200) handleDataDisplay(result.data.post);
      }
    );
  };

  const getPostData = (uidParam) => {
    authGetRequestWithParams('post', { uid: uidParam }).then((result) => {
      if (result.status === 200) handleDataDisplay(result.data);
    });
  };

  const handleDataDisplay = (postData) => {
    const feature = createPointFeature(
      postData.localization.geometry.coordinates,
      true
    );
    feature.setId(postData.localization.uid);
    setSelectedLocalizationStyle(feature);
    addFeatureToLayer(postLayer.current, feature);
    console.log(feature);
    centerMapToCordinates(map, feature.getGeometry().getCoordinates());
    setPost(postData);
  };

  return (
    <Grid item xs={12}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12} lg={5}>
          <Paper className={mapPaper}>
            <Map />
          </Paper>
        </Grid>

        <Grid item xs={12} md={12} lg={7}>
          <Paper className={classes.paper}>
            {post && (
              <>
                dgfjbehkbf
                <PostWrapper post={post} />
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ShowPost;
