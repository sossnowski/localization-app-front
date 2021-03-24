import React from 'react';
import { connect } from 'react-redux';
import { fromLonLat } from 'ol/proj';
import {
  addFeaturesToLayer,
  addLayerToMap,
  centerToLayerExtent,
  createLayer,
  createPointFeature,
  removeComponentLayers,
} from '../map/utils/main';

const Localizations = (props) => {
  const { map, localizations } = props;
  const localizationsLayer = React.useRef(null);

  React.useEffect(() => {
    if (!Object.keys(map).length) return;
    localizationsLayer.current = createLayer('dashboardLocalizations');
    addLayerToMap(map, localizationsLayer.current);

    const features = [];
    for (const loc of localizations) {
      features.push(createPointFeature(fromLonLat(loc.geometry.coordinates)));
    }
    console.log(features);
    addFeaturesToLayer(localizationsLayer.current, features);
    centerToLayerExtent(map, localizationsLayer.current);

    return () => removeComponentLayers(map);
  }, [localizations]);

  return null;
};

const mapStateToProps = (state) => ({
  map: state.map,
});

export default connect(mapStateToProps)(Localizations);
