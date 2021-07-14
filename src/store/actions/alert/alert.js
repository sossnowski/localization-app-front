export const addAlert = (alertData = {}) => ({
  type: 'ADD_ALERT',
  payload: alertData,
});

export const removeAlert = (alert = {}) => ({
  type: 'REMOVE_ALERT',
  payload: alert,
});

export const removeAllAlerts = () => ({
  type: 'REMOVE_ALL_ALERTS',
  payload: null,
});
