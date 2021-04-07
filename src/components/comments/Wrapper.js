import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import DisplayComment from './Display';
import EditComment from './Edit';
import { addAlert } from '../../store/actions/alert/alert';
import { authDeleteRequestWithParam } from '../../helpers/apiRequests';
import { editPost } from '../../store/actions/post/post';

const CommentWrapper = (props) => {
  const { post, comment } = props;
  const [commentToEdit, setCommentToEdit] = React.useState(null);
  const [commentToDelete, setCommentToDelete] = React.useState(null);
  const dispatch = useDispatch();
  const strings = useSelector((state) => state.language);

  React.useEffect(() => {
    if (!commentToDelete) return;
    authDeleteRequestWithParam('comments', commentToDelete.uid).then(
      (result) => {
        if (result.status !== 200)
          dispatch(
            addAlert({
              title: strings.alerts.dataProccessError.title_,
              desc: result.message,
              type: 'error',
            })
          );
        else {
          dispatch(
            editPost({
              ...post,
              comments: post.comments.filter(
                (postComment) => postComment.uid !== commentToDelete.uid
              ),
            })
          );
          dispatch(
            addAlert({
              title: strings.alerts.addDataSuccess.title_,
              desc: strings.alerts.addDataSuccess.desc_,
              type: 'success',
            })
          );
        }
      }
    );
  }, [commentToDelete]);

  return commentToEdit ? (
    <EditComment
      commentToEdit={commentToEdit}
      setCommentToEdit={setCommentToEdit}
      post={post}
    />
  ) : (
    <DisplayComment
      setCommentToEdit={setCommentToEdit}
      comment={comment}
      setCommentToDelete={setCommentToDelete}
    />
  );
};

CommentWrapper.propTypes = {
  post: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
};

export default CommentWrapper;
