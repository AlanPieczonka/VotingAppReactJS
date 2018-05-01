import { combineReducers } from 'redux';

import { reducer as form } from 'redux-form';
import user from './reducers/user';

const rootReducer = combineReducers({
  form,
  user,
});

export default rootReducer;