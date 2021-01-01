import { combineReducers } from 'redux';
import errors from './errors/errors';
import session from './session/session';
import event from './event/event';
import filters from './event/filter';

export default combineReducers({
  session,
  errors,
  event,
  filters
});