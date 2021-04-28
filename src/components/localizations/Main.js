import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { fromLonLat } from 'ol/proj';
import * as proj from 'ol/proj';
import * as extent from 'ol/extent';
import {
  addFeaturesToLayer,
  addLayerToMap,
  createLayer,
  createPointFeature,
  getAllClickedFeatures,
  clearLayerSource,
  addLocalizationsToLayerIfNotExists,
  removeMissingLocalizationsFromLayer,
  centerMapToCordinates,
  addFeatureToLayer,
} from '../map/utils/main';
import { localizationsBorderZoom } from '../../consts/config';
import { authGetRequestWithParams } from '../../helpers/apiRequests';
import { setLocalizations } from '../../store/actions/localization/localization';
import { setSelectedLocalization } from '../../store/actions/localization/selectedLocalization';
import {
  setBasicLocalizationStyle,
  setSelectedLocalizationStyle,
} from './utils/map';

const Localizations = (props) => {
  const { map, localizations } = props;
  const localizationsLayer = React.useRef(null);
  const [click, setClick] = React.useState(null);
  const localizationsRef = React.useRef([]);
  const selectedLocalization = useSelector(
    (state) => state.selectedLocalization
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!Object.keys(map).length) return;
    map.on('click', setClick);
    map.on('moveend', handleMapZoom);
    localizationsLayer.current = createLayer('dashboardLocalizations');
    addLayerToMap(map, localizationsLayer.current);
    handleDisplaySelectedLocalization();

    // return () => removeComponentLayers(map);
  }, [map]);

  const handleDisplaySelectedLocalization = () => {
    if (!selectedLocalization) return;
    setSelectedLocalizationStyle(selectedLocalization);
    addFeatureToLayer(localizationsLayer.current, selectedLocalization);
    centerMapToCordinates(
      map,
      selectedLocalization.getGeometry().getCoordinates()
    );
  };

  React.useEffect(() => {
    if (!Object.keys(map).length) return;
    // adding selected localization to leave it on map
    const localizationsWhichStay = selectedLocalization
      ? [...localizations, { uid: selectedLocalization.getId() }]
      : localizations;
    console.log(localizationsWhichStay);
    console.log(localizations);
    removeMissingLocalizationsFromLayer(
      localizationsLayer.current,
      localizationsWhichStay
    );
    addLocalizationsToLayerIfNotExists(
      localizationsLayer.current,
      localizations
    );

    localizationsRef.current = localizations;
  }, [localizations]);

  // React.useState(() => {
  //   if (selectedLocalization) {
  //     setSelectedLocalizationStyle(selectedLocalization);
  //     centerMapToCordinates(
  //       map,
  //       selectedLocalization.getGeometry().getCoordinates()
  //     );
  //   }
  // }, [selectedLocalization]);

  React.useEffect(() => {
    if (!click) return;
    const clickedFeatures = getAllClickedFeatures(map, click);
    if (!clickedFeatures.length) unselectLocalization();
    else handleLocalizationSelect(clickedFeatures);
  }, [click]);

  const handleLocalizationSelect = (clickedFeatures) => {
    if (!selectedLocalization) {
      setSelectedLocalizationStyle(clickedFeatures[0]);
      dispatch(setSelectedLocalization(clickedFeatures[0]));
    } else if (clickedFeatures[0].getId() !== selectedLocalization.getId()) {
      setBasicLocalizationStyle(selectedLocalization);
      setSelectedLocalizationStyle(clickedFeatures[0]);
      dispatch(setSelectedLocalization(clickedFeatures[0]));
    }
  };

  const unselectLocalization = () => {
    setBasicLocalizationStyle(selectedLocalization);
    dispatch(setSelectedLocalization(null));
  };

  const handleMapZoom = () => {
    const zoom = map.getView().getZoom();
    console.log(localizationsRef.current.length);
    console.log(zoom > localizationsBorderZoom);

    if (zoom > localizationsBorderZoom) {
      const mapExtent = map.getView().calculateExtent();
      if (mapExtent) {
        getLocalizationsFromExtent({
          a: proj.toLonLat(extent.getTopLeft(mapExtent)),
          b: proj.toLonLat(extent.getTopRight(mapExtent)),
          c: proj.toLonLat(extent.getBottomRight(mapExtent)),
          d: proj.toLonLat(extent.getBottomLeft(mapExtent)),
          e: proj.toLonLat(extent.getTopLeft(mapExtent)),
        });
      }
    } else if (localizationsRef.current.length) dispatch(setLocalizations([]));
  };

  const getLocalizationsFromExtent = (points) => {
    authGetRequestWithParams('localizations', points).then((result) => {
      if (result.status === 200) dispatch(setLocalizations(result.data));
    });
  };

  return null;
};

const mapStateToProps = (state) => ({
  map: state.map,
});

export default connect(mapStateToProps)(Localizations);
