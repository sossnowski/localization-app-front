const localizationFilterReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_LOCALIZATION_FILTERS':
      return action.payload;
    default:
      return state;
  }
};

export default localizationFilterReducer;
