import { combineReducers } from 'redux';
import alerts from './alert/alert';
import map from './map/map';

const allReducers = combineReducers({
  alerts,
  map,
});

export default allReducers;
