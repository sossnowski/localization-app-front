import { combineReducers } from 'redux';
import alerts from './alert/alert';
import map from './map/map';
import language from './language/language';
import posts from './post/post';

const allReducers = combineReducers({
  alerts,
  map,
  language,
  posts,
});

export default allReducers;
