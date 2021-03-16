import React from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import * as proj from 'ol/proj';
import OSM from 'ol/source/OSM';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import sidebarOpenContext from '../wrapper/sidebarContext';
import { setMap } from '../../store/actions/map/map';

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',
  },
});

const MapComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const open = React.useContext(sidebarOpenContext);
  const map = React.useRef();
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

    dispatch(setMap(map.current));
  }, []);

  React.useEffect(() => {
    console.log(open);
    setTimeout(() => map.current.updateSize(), 200);
  }, [open]);

  return <div id="map" className={classes.root} />;
};

export default MapComponent;
