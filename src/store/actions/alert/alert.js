export const addAlert = (alertData = {}) => ({
  type: 'ADD_ALERT',
  payload: alertData,
});

export const removeAlert = (alert = {}) => ({
  type: 'REMOVE_ALERT',
  payload: alert,
});
