import UserSessionDataHandler from '../../../auth/UserSessionDataHandler';
import language from '../../../consts/languages';

const pageLanguage = UserSessionDataHandler.getSettings()?.language || 'pl';

const languageReducer = (state = language[pageLanguage], action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...action.payload };
    default:
      return state;
  }
};

export default languageReducer;
