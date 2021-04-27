const localizationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_SELECTED_LOCALIZATIONS':
      return action.payload;
    default:
      return state;
  }
};

export default localizationReducer;
