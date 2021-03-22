import React from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import * as proj from 'ol/proj';
import OSM from 'ol/source/OSM';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Point from 'ol/geom/Point';
import { Feature } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import { setMap } from '../../store/actions/map/map';
import sidebarOpenContext from '../wrapper/sidebarContext';

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',
  },
});

const MapComponent = (props) => {
  const { setClickedPoint } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const open = React.useContext(sidebarOpenContext);
  const map = React.useRef();
  const [click, setClick] = React.useState(null);
  const tileLayer = React.useRef(
    new TileLayer({
      source: new OSM({}),
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
    dispatch(setMap(map.current));
  }, []);

  React.useEffect(() => {
    if (!click || !setClickedPoint) return;
    addPointToMap(click.coordinate);
    setClickedPoint(proj.toLonLat(click.coordinate));
  }, [click]);

  const addPointToMap = (coordinates) => {
    const feature = new Feature({
      geometry: new Point(coordinates),
    });
    console.log(feature);
    const source = new VectorSource({});
    source.addFeature(feature);
    const layer = new VectorLayer({ source });
    map.current.addLayer(layer);
  };

  React.useEffect(() => {
    console.log(open);
    setTimeout(() => map.current.updateSize(), 200);
  }, [open]);

  return <div id="map" className={classes.root} />;
};

MapComponent.propTypes = {
  setClickedPoint: PropTypes.func,
};

MapComponent.defaultProps = {
  setClickedPoint: null,
};

export default MapComponent;
