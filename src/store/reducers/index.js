import { combineReducers } from 'redux';
import alerts from './alert/alert';
import map from './map/map';
import language from './language/language';
import posts from './post/post';
import localizations from './localization/localization';
import categories from './category/category';

const allReducers = combineReducers({
  alerts,
  map,
  language,
  posts,
  localizations,
  categories,
});

export default allReducers;
