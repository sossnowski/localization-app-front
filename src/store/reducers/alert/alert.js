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
    case 'REMOVE_ALL_ALERTS':
      return { success: [], error: [], warning: [] };
    default:
      return state;
  }
};

export default alertReducer;
