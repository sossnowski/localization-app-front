export const setPosts = (posts = []) => ({
  type: 'SET_POSTS',
  payload: posts,
});

export const editPost = (post = {}) => ({
  type: 'EDIT_POST',
  payload: post,
});

export const removePost = (post = {}) => ({
  type: 'REMOVE_POST',
  payload: post,
});

export const addPost = (post = {}) => ({
  type: 'ADD_POST',
  payload: post,
});
