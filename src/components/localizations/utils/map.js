import { Style, Circle, Fill, Stroke } from 'ol/style';
import axios from 'axios';

export const setBasicLocalizationStyle = (localizationFeature) => {
  const style = new Style({
    image: new Circle({
      radius: 7,
      fill: new Fill({ color: [0, 0, 255, 0.4] }),
      stroke: new Stroke({
        color: [0, 0, 255],
        width: 2,
      }),
    }),
  });

  if (localizationFeature) localizationFeature.setStyle(style);
};

export const setSelectedLocalizationStyle = (localizationFeature) => {
  const style = new Style({
    image: new Circle({
      radius: 7,
      fill: new Fill({ color: [0, 255, 0, 0.4] }),
      stroke: new Stroke({
        color: [0, 255, 0],
        width: 2,
      }),
    }),
  });

  if (localizationFeature) localizationFeature.setStyle(style);
};

export const setGroupedLocalizationStyle = (localizationFeature) => {
  const style = new Style({
    image: new Circle({
      radius: 10,
      fill: new Fill({ color: [168, 168, 168, 0.4] }),
      stroke: new Stroke({
        color: [168, 168, 168],
        width: 2,
      }),
    }),
  });

  if (localizationFeature) localizationFeature.setStyle(style);
};

export const getLocalizationNameByCoordinates = async (coordinates) => {
  const result = await axios.get(
    `https://photon.komoot.io/reverse?lon=${coordinates[0]}&lat=${coordinates[1]}`
  );

  return (
    result.data.features[0]?.properties?.city ||
    result.data.features[0]?.properties?.name ||
    null
  );
};
