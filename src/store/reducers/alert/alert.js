const alertReducer = (
  state = { success: [], error: [], warning: [] },
  action
) => {
  switch (action.type) {
    case 'ADD_ALERT':
      return {
        ...state,
        [action.payload.type]: [...state[action.payload.type], action.payload],
      };
    case 'REMOVE_ALERT':
      return { ...state, [action.payload.type]: [] };
    default:
      return state;
  }
};

export default alertReducer;
