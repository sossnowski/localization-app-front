import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { authGetRequestWithParams } from '../../helpers/apiRequests';
import { addAlert } from '../../store/actions/alert/alert';
import Comment from './Display';
import AddComment from './Add';
import { sortByLikes } from '../../utils/main';

const MainComments = (props) => {
  const { postUid } = props;
  const [comments, setComments] = React.useState([]);
  const dispatch = useDispatch();
  const strings = useSelector((state) => state.language);

  React.useEffect(() => {
    authGetRequestWithParams('comments', { postUid }).then((result) => {
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
        setComments(result.data);
      }
    });
  }, []);

  return (
    <>
      {comments.map((comment) => (
        <Comment comment={comment} key={comment.uid} />
      ))}
      <AddComment postUid={postUid} />
    </>
  );
};

MainComments.propTypes = {
  postUid: PropTypes.string.isRequired,
};

export default MainComments;
