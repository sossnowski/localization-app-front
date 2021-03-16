const mapReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case 'SET_MAP':
      return action.payload;
    default:
      return state;
  }
};

export default mapReducer;
