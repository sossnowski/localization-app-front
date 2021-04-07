export const sortByLikes = (dataToSort = []) => {
  dataToSort.sort(
    (a, b) =>
      b.likes.filter((like) => like.isUpVote).length -
        a.likes.filter((like) => like.isUpVote).length ||
      a.likes.filter((like) => !like.isUpVote).length -
        b.likes.filter((like) => !like.isUpVote).length
  );
};
