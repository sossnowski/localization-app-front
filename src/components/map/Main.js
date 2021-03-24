import React from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import * as proj from 'ol/proj';
import OSM from 'ol/source/OSM';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { setMap } from '../../store/actions/map/map';
import sidebarOpenContext from '../wrapper/sidebarContext';
import {
  createLayer,
  addLayerToMap,
  createPointFeature,
  centerMapToCordinates,
  addSelectedLocalizationToLayer,
} from './utils/main';

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',
  },
});

const MapComponent = (props) => {
  const { setClickedPoint, pointToCenterMap } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const open = React.useContext(sidebarOpenContext);
  const map = React.useRef();
  const localizationsLayer = React.useRef(null);
  const [click, setClick] = React.useState(null);
  const tileLayer = React.useRef(
    new TileLayer({
      source: new OSM({}),
      layerName: 'tileLayer',
    })
  );

  React.useEffect(() => {
    map.current = new Map({
      target: 'map',
      renderer: 'webgl',
      layers: [tileLayer.current],
      view: new View({
        center: proj.fromLonLat([19.015839, 52.2307]),
        zoom: 10,
      }),
    });
    map.current.on('click', setClick);
    localizationsLayer.current = createLayer('localizationsLayer');
    addLayerToMap(map.current, localizationsLayer.current);
    dispatch(setMap(map.current));
  }, []);

  React.useEffect(() => {
    if (!pointToCenterMap) return;
    console.log(pointToCenterMap);
    const parsedPoint = proj.fromLonLat(pointToCenterMap);
    addPointToMap(parsedPoint);
    centerMapToCordinates(map.current, parsedPoint);
  }, []);

  React.useEffect(() => {
    if (!click || !setClickedPoint) return;
    addPointToMap(click.coordinate);
    setClickedPoint(proj.toLonLat(click.coordinate));
  }, [click]);

  const addPointToMap = (coordinates) => {
    const pointFeature = createPointFeature(coordinates);
    addSelectedLocalizationToLayer(localizationsLayer.current, pointFeature);
  };

  React.useEffect(() => {
    setTimeout(() => map.current.updateSize(), 200);
  }, [open]);

  return <div id="map" className={classes.root} />;
};

MapComponent.propTypes = {
  setClickedPoint: PropTypes.func,
  pointToCenterMap: PropTypes.array,
};

MapComponent.defaultProps = {
  setClickedPoint: null,
  pointToCenterMap: null,
};

export default MapComponent;
