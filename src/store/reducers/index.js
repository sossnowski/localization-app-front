import { combineReducers } from 'redux';
import alerts from './alert/alert';
import map from './map/map';
import language from './language/language';
import posts from './post/post';
import localizations from './localization/localization';
import categories from './category/category';
import notification from './notification/notification';
import selectedLocalization from './localization/selectedLocalization';
import localizationFilters from './localization/filter';
import theme from './theme/theme';

const allReducers = combineReducers({
  alerts,
  map,
  language,
  posts,
  localizations,
  categories,
  notification,
  selectedLocalization,
  localizationFilters,
  theme,
});

export default allReducers;
