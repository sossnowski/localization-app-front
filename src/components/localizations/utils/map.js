import { Style, Circle, Fill, Stroke } from 'ol/style';

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
