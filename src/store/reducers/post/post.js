const postReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return [...action.payload];
    case 'ADD_POST':
      return [...state, action.payload];
    case 'REMOVE_POST':
      return state.filter((post) => post.uid !== action.payload.uid);
    case 'EDIT_POST':
      return [
        ...state.map((post) =>
          post.uid === action.payload.uid ? action.payload : post
        ),
      ];
    default:
      return state;
  }
};

export default postReducer;
