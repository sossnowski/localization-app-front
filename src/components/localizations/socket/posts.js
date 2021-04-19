export const handlePostLike = (posts, socketPostLikeData) => {
  const foundPost = posts.find(
    (post) => post.uid === socketPostLikeData.postUid
  );
  if (!foundPost) return null;
  console.log({
    ...foundPost,
    likes: [...foundPost.likes, socketPostLikeData],
  });

  return {
    ...foundPost,
    likes: [...foundPost.likes, socketPostLikeData],
  };
};

export const handlePostLikeUpdate = (posts, like) => {
  const foundPost = posts.find((post) => post.uid === like.postUid);
  if (!foundPost) return;
  const likes = foundPost.likes.map((l) =>
    l.userUid === like.userUid ? { ...l, isUpVote: like.isUpVote } : l
  );

  return { ...foundPost, likes };
};
