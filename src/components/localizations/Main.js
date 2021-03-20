import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import React from 'react';
import { connect } from 'react-redux';

const Localizations = (props) => {
  const { map, localizations } = props;

  React.useEffect(() => {
    if (!Object.keys(map).length) return;
    const features = [];
    for (const loc of localizations) {
      const feature = new Feature({
        geometry: new Point(fromLonLat(loc.geometry.coordinates)),
      });
      features.push(feature);
    }
    const source = new VectorSource({ features });
    const layer = new VectorLayer({ source });
    map.addLayer(layer);
  }, [localizations]);

  return null;
};

const mapStateToProps = (state) => ({
  map: state.map,
});

export default connect(mapStateToProps)(Localizations);
