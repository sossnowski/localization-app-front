import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import DisplayPost from './DisplayPost';
import EditPost from './Edit';
import { addAlert } from '../../store/actions/alert/alert';
import { authDeleteRequestWithParam } from '../../helpers/apiRequests';
import { removePost } from '../../store/actions/post/post';

const PostWrapper = (props) => {
  const { post } = props;
  const [postToEdit, setPostToEdit] = React.useState(null);
  const [postToDelete, setPostToDelete] = React.useState(null);
  const dispatch = useDispatch();
  const strings = useSelector((state) => state.language);

  React.useEffect(() => {
    if (!postToDelete) return;
    authDeleteRequestWithParam('post', postToDelete.uid).then((result) => {
      if (result.status !== 200)
        dispatch(
          addAlert({
            title: strings.alerts.dataProccessError.title_,
            desc: result.message,
            type: 'error',
          })
        );
      else {
        dispatch(removePost(postToDelete));
        dispatch(
          addAlert({
            title: strings.alerts.addDataSuccess.title_,
            desc: strings.alerts.addDataSuccess.desc_,
            type: 'success',
          })
        );
      }
    });
  }, [postToDelete]);

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
