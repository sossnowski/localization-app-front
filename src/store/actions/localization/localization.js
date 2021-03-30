export const setLocalizations = (localization = []) => ({
  type: 'SET_LOCALIZATION',
  payload: localization,
});

export const removeLocalizations = (localization = {}) => ({
  type: 'REMOVE_LOCALIZATION',
  payload: localization,
});

export const addLocalizations = (localization = {}) => ({
  type: 'ADD_LOCALIZATION',
  payload: localization,
});
