import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import * as proj from 'ol/proj';
import * as extent from 'ol/extent';
import {
  addLayerToMap,
  createLayer,
  getAllClickedFeatures,
  addLocalizationsToLayerIfNotExists,
  removeMissingLocalizationsFromLayer,
  centerMapToCordinates,
  addFeatureToLayer,
  addGroupedLocalizationsToLayer,
} from '../map/utils/main';
import { localizationsBorderZoom } from '../../consts/config';
import {
  authGetRequest,
  authGetRequestWithParams,
} from '../../helpers/apiRequests';
import { setSelectedLocalization } from '../../store/actions/localization/selectedLocalization';
import {
  setBasicLocalizationStyle,
  setSelectedLocalizationStyle,
} from './utils/map';

const Localizations = (props) => {
  const { map } = props;
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
    addGroupedLocalizationsFromDB();

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
    if (!click) return;
    const clickedFeatures = getAllClickedFeatures(map, click).filter(
      (feature) => !!feature.get('clickable')
    );

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

  const handleMapZoom = async () => {
    const zoom = map.getView().getZoom();

    if (zoom > localizationsBorderZoom) {
      const mapExtent = map.getView().calculateExtent();
      if (mapExtent) {
        const result = await authGetRequestWithParams('localizations', {
          a: proj.toLonLat(extent.getTopLeft(mapExtent)),
          b: proj.toLonLat(extent.getTopRight(mapExtent)),
          c: proj.toLonLat(extent.getBottomRight(mapExtent)),
          d: proj.toLonLat(extent.getBottomLeft(mapExtent)),
          e: proj.toLonLat(extent.getTopLeft(mapExtent)),
        });

        if (result.status === 200) handleLocalizationsChange(result.data);
      }
    } else if (localizationsRef.current.length) {
      removeMissingLocalizationsFromLayer(localizationsLayer.current, []);
      addGroupedLocalizationsFromDB();
      localizationsRef.current = [];
    }
  };

  const addGroupedLocalizationsFromDB = async () => {
    const result = await authGetRequest('groupedLocalizations');
    if (result.status === 200)
      addGroupedLocalizationsToLayer(localizationsLayer.current, result.data);
  };

  const handleLocalizationsChange = (currentLocalizations) => {
    const localizationsWhichStay = selectedLocalization
      ? [...currentLocalizations, { uid: selectedLocalization.getId() }]
      : currentLocalizations;
    removeMissingLocalizationsFromLayer(
      localizationsLayer.current,
      localizationsWhichStay
    );
    addLocalizationsToLayerIfNotExists(
      localizationsLayer.current,
      currentLocalizations
    );

    localizationsRef.current = currentLocalizations;
  };

  return null;
};

const mapStateToProps = (state) => ({
  map: state.map,
});

export default connect(mapStateToProps)(Localizations);
