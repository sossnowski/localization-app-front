import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';

export const addSelectedLocalizationToLayer = (
  layer = null,
  feature = null
) => {
  clearLayerSource(layer);
  addFeatureToLayer(layer, feature);
};

export const clearLayerSource = (layer = null) => {
  layer.getSource()?.clear();
};

export const addFeatureToLayer = (layer = null, feature = null) => {
  if (!layer || !feature) return;
  if (layer.getSource()) layer.getSource().addFeature(feature);
  else {
    const vectorSource = new VectorSource();
    vectorSource.addFeature(feature);
    layer.setSource(vectorSource);
  }
};

export const addFeaturesToLayer = (layer = null, features = []) => {
  if (!layer || !features.length) return;
  if (layer.getSource()) layer.getSource().addFeatures(features);
  else {
    const vectorSource = new VectorSource({ features });
    layer.setSource(vectorSource);
  }
};

export const createLayer = (layerName = '') => {
  const vectorLayer = new VectorLayer({});
  vectorLayer.setProperties({ layerName });

  return vectorLayer;
};

export const addLayerToMap = (map, layer) => {
  if (!layer) return;
  removeLayerIfExists(map, layer);
  map.addLayer(layer);
};

export const removeLayerIfExists = (map, layer) => {
  if (!map.getLayers().getLength() || !layer) return;
  map.removeLayer(layer);
};

export const createPointFeature = (coordinates = []) => {
  if (!coordinates.length) return null;
  return new Feature({ geometry: new Point(coordinates) });
};

export const addLocalizationsToLayerIfNotExists = (layer, localizations) => {
  const features = getLayerFeatures(layer);
  if (!features.length) {
    const featuresToAdd = [];
    for (const loc of localizations) {
      const feature = createPointFeature(fromLonLat(loc.geometry.coordinates));
      feature.setId(loc.uid);
      featuresToAdd.push(feature);
    }
    addFeaturesToLayer(layer, featuresToAdd);
  } else {
    const featuresToAdd = [];
    for (const loc of localizations) {
      if (!features.find((feature) => feature.getId() === loc.uid)) {
        const feature = createPointFeature(
          fromLonLat(loc.geometry.coordinates)
        );
        feature.setId(loc.uid);
        featuresToAdd.push(feature);
      }
    }
    addFeaturesToLayer(layer, featuresToAdd);
  }
};

export const removeMissingLocalizationsFromLayer = (
  layer,
  localizationsWhichStay
) => {
  console.log(layer.getSource()?.getFeatures());
  const features = getLayerFeatures(layer);
  console.log(features);
  if (features.length) {
    for (const mapFeature of features) {
      if (
        !localizationsWhichStay.find(
          (locWhichStay) => locWhichStay.uid === mapFeature.getId()
        )
      )
        removeFeatureIfExists(layer, mapFeature);
    }
  }
};

export const centerMapToCordinates = (map = null, coordinates = []) => {
  console.log(map);
  if (!map) return;
  const point = new Point(coordinates);
  map.getView().fit(point);
  map.getView().setZoom(10);
};

export const centerToLayerExtent = (map = null, layer = null) => {
  if (!map || !layer) return;
  const extent = layer.getSource()?.getExtent();
  if (extent) map.getView().fit(extent);
  const zoom = map.getView().getZoom();
  if (zoom > 10) map.getView().setZoom(9);
};

export const removeComponentLayers = (map) => {
  console.log(map.getLayers().getArray());
  if (!Object.keys(map).length) return;

  const layersWhichStay = ['tileLayer'];

  const layersToRemove = [...map.getLayers().getArray()];
  for (const layer of layersToRemove) {
    if (
      !layersWhichStay.find(
        (layerName) => layerName === layer.getProperties().layerName
      )
    )
      map.removeLayer(layer);
  }
  console.log(map.getLayers().getArray());
};

export const getAllClickedFeatures = (map, event) => {
  if (!Object.keys(map).length) return;
  return map.getFeaturesAtPixel(event.pixel);
};

export const getLayerFeatures = (layer) =>
  layer?.getSource()?.getFeatures() || [];

export const removeFeatureIfExists = (layer, feature = {} || '') => {
  if (typeof feature === 'string')
    layer?.getSource()?.removeFeatureById(feature);
  else layer?.getSource().removeFeature(feature);
};
