import React from 'react';
import { connect } from 'react-redux';
import { fromLonLat } from 'ol/proj';
import {
  addFeaturesToLayer,
  addLayerToMap,
  centerToLayerExtent,
  createLayer,
  createPointFeature,
  getAllClickedFeatures,
  clearLayerSource,
} from '../map/utils/main';
import history from '../../history';

const Localizations = (props) => {
  const { map, localizations } = props;
  const localizationsLayer = React.useRef(null);
  const [click, setClick] = React.useState(null);

  React.useEffect(() => {
    if (!Object.keys(map).length) return;
    map.on('click', setClick);
    localizationsLayer.current = createLayer('dashboardLocalizations');
    addLayerToMap(map, localizationsLayer.current);

    // return () => removeComponentLayers(map);
  }, [map]);

  React.useEffect(() => {
    if (!Object.keys(map).length) return;
    const features = [];
    for (const loc of localizations) {
      const feature = createPointFeature(fromLonLat(loc.geometry.coordinates));
      feature.setId(loc.uid);
      features.push(feature);
    }
    addFeaturesToLayer(localizationsLayer.current, features);
    centerToLayerExtent(map, localizationsLayer.current);
  }, [localizations]);

  React.useEffect(() => {
    if (!click || !clickedOnDetailsLocalizationScreen()) return;
    const clickedFeatures = getAllClickedFeatures(map, click);
    if (!clickedFeatures.length) return;
    const localization = clickedFeatures[0].getId();
    clearLayerSource(localizationsLayer.current);
    history.push(`/dashboard/${localization}`);
  }, [click]);

  const clickedOnDetailsLocalizationScreen = () =>
    history.location.pathname.split('/').length === 2;

  return null;
};

const mapStateToProps = (state) => ({
  map: state.map,
});

export default connect(mapStateToProps)(Localizations);
