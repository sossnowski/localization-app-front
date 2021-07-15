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
  addSelectedLocalizationToLayer,
} from './utils/main';
import LocalizationButton from '../common/LocalizationButton';

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',
    position: 'relative',
  },
});

const MapComponent = (props) => {
  const { setClickedPoint } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const open = React.useContext(sidebarOpenContext);
  const map = React.useRef();
  const localizationsLayer = React.useRef(null);
  const [click, setClick] = React.useState(null);
  const [userPosition, setUserPosition] = React.useState(null);
  const tileLayer = React.useRef(
    new TileLayer({
      source: new OSM({}),
      layerName: 'tileLayer',
    })
  );

  React.useEffect(() => {
    map.current = new Map({
      controls: [],
      target: 'map',
      renderer: 'webgl',
      layers: [tileLayer.current],
      view: new View({
        center: proj.fromLonLat([19.015839, 52.2307]),
        zoom: 6,
        maxZoom: 18,
      }),
    });
    map.current.on('click', setClick);
    localizationsLayer.current = createLayer('localizationsLayer');
    addLayerToMap(map.current, localizationsLayer.current);
    dispatch(setMap(map.current));
  }, []);

  React.useEffect(() => {
    if (!click || !setClickedPoint) return;
    handleUserClickOnMap(click.coordinate);
  }, [click]);

  const handleUserClickOnMap = (coordinates) => {
    addPointToMap(coordinates);
    setClickedPoint(proj.toLonLat(coordinates));
  };

  const addPointToMap = (coordinates) => {
    const pointFeature = createPointFeature(coordinates);
    addSelectedLocalizationToLayer(localizationsLayer.current, pointFeature);
  };

  React.useEffect(() => {
    setTimeout(() => map.current.updateSize(), 1000);
  }, [open]);

  React.useEffect(() => {
    if (userPosition && !setClickedPoint) {
      handleZoomToUserPosition();
    } else if (userPosition && setClickedPoint) {
      handleUserClickOnMap(proj.fromLonLat(userPosition));
      handleZoomToUserPosition();
    }
  }, [userPosition]);

  const handleZoomToUserPosition = () => {
    map.current.getView().setCenter(proj.fromLonLat(userPosition));
    map.current.getView().setZoom(16);
  };

  return (
    <div id="map" className={classes.root}>
      <LocalizationButton
        setUserPosition={setUserPosition}
        bottom={20}
        right={20}
      />
    </div>
  );
};

MapComponent.propTypes = {
  setClickedPoint: PropTypes.func,
};

MapComponent.defaultProps = {
  setClickedPoint: null,
};

export default MapComponent;
