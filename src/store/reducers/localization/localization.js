const localizationReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_LOCALIZATIONS':
      return [...action.payload];
    case 'ADD_LOCALIZATION':
      return [...state, action.payload];
    case 'REMOVE_LOCALIZATION':
      return state.filter((loc) => loc.uid !== action.payload.uid);
    default:
      return state;
  }
};

export default localizationReducer;
