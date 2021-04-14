import languageData from '../../../consts/languages';

export const setLanguage = (language) => ({
  type: 'SET_LANGUAGE',
  payload: languageData[language],
});
