export const handleCommentLike = (posts, comment) => {
  console.log(comment);
  const foundPost = posts.find((post) => post.uid === comment.postUid);
  const updatedComments = foundPost?.comments.map((c) =>
    c.uid === comment.like.commentUid
      ? {
          ...c,
          likes: [...c.likes, comment.like],
        }
      : c
  );
  console.log(foundPost);

  return { ...foundPost, comments: updatedComments };
};

export const handleCommentLikeUpdate = (posts, socketLike) => {
  console.log('#####');
  console.log(posts);
  console.log(socketLike);
  console.log('$$$$$$');
  const foundPost = posts.find((post) => post.uid === socketLike.postUid);
  console.log('post', foundPost);
  const updatedComments = foundPost?.comments.map((comment) =>
    comment.uid === socketLike.commentUid
      ? {
          ...comment,
          likes: comment.likes?.map((like) =>
            like.userUid === socketLike.userUid
              ? { ...like, isUpVote: socketLike.isUpVote }
              : like
          ),
        }
      : comment
  );

  return { ...foundPost, comments: updatedComments };
};

export const handleAddComment = (posts, comment) => {
  const foundPost = posts.find((post) => post.uid === comment.postUid);
  if (!foundPost) return;

  return {
    ...foundPost,
    comments: [...foundPost.comments, comment],
  };
};
