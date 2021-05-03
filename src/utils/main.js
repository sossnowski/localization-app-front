import UserSessionDataHandler from '../auth/UserSessionDataHandler';
import Languages from '../consts/languages';

export const sortByLikes = (dataToSort = []) => {
  dataToSort.sort(
    (a, b) =>
      b.likes.filter((like) => like.isUpVote).length -
        a.likes.filter((like) => like.isUpVote).length ||
      a.likes.filter((like) => !like.isUpVote).length -
        b.likes.filter((like) => !like.isUpVote).length
  );
};

export const parseCreatedDateToString = (date) => {
  const now = Date.now();
  const time = now - new Date(date);
  const language =
    UserSessionDataHandler.getSettings()?.defaultLanguage || 'pl';
  if (time <= 60000) return Languages[language].postTimes.first;
  if (time > 60000 && time < 3600000)
    return `${parseInt(time / 60000)}  ${Languages[language].postTimes.second}`;
  if (time > 3600000 && time < 2 * 3600000)
    return Languages[language].postTimes.third;
  if (time > 2 * 3600000 && time < 24 * 3600000)
    return `${parseInt(time / 3600000)}  ${
      Languages[language].postTimes.fourth
    }`;
  return date.split('T')[0];
};
