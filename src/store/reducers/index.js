import { combineReducers } from 'redux';
import alerts from './alert/alert';

const allReducers = combineReducers({
  alerts,
});

export default allReducers;
