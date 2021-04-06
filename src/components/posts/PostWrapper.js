import React from 'react';
import PropTypes from 'prop-types';
import DisplayPost from './DisplayPost';
import EditPost from './Edit';

const PostWrapper = (props) => {
  const { post } = props;
  const [postToEdit, setPostToEdit] = React.useState(null);
  const [postToDelete, setPostToDelete] = React.useState(null);

  return postToEdit ? (
    <EditPost postToEdit={postToEdit} setPostToEdit={setPostToEdit} />
  ) : (
    <DisplayPost
      setPostToEdit={setPostToEdit}
      post={post}
      setPostToDelete={setPostToDelete}
      postToEdit={postToEdit}
    />
  );
};

PostWrapper.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostWrapper;
