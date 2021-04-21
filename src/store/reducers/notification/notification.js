const notificationReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return [...action.payload];
    case 'ADD_NOTIFICATION':
      return [...state, action.payload];
    default:
      return state;
  }
};

export default notificationReducer;
