import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { authGetRequestWithParams } from '../../helpers/apiRequests';
import { addAlert } from '../../store/actions/alert/alert';
import Comment from './Display';
import AddComment from './Add';
import { sortByLikes } from '../../utils/main';
import { editPost } from '../../store/actions/post/post';

const MainComments = (props) => {
  const { post } = props;
  const [comments, setComments] = React.useState([]);
  const dispatch = useDispatch();
  const strings = useSelector((state) => state.language);
  const initRender = React.useRef(true);

  React.useEffect(() => {
    authGetRequestWithParams('comments', { uid: post.uid }).then((result) => {
      if (result.status !== 200)
        dispatch(
          addAlert({
            title: strings.alerts.dataProccessError.title_,
            desc: result.message,
            type: 'error',
          })
        );
      else {
        sortByLikes(result.data);
        dispatch(editPost({ ...post, comments: result.data }));
      }
    });
  }, []);

  React.useEffect(() => {
    if (initRender.current) {
      initRender.current = false;
      return;
    }
    setComments(post.comments);
  }, [post]);

  return (
    <>
      {comments.map((comment) => (
        <Comment comment={comment} key={comment.uid} />
      ))}
      <AddComment post={post} />
    </>
  );
};

MainComments.propTypes = {
  post: PropTypes.object.isRequired,
};

export default MainComments;
