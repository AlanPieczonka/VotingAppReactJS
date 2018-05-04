import { combineReducers } from 'redux';

import { reducer as form } from 'redux-form';
import user from './reducers/user';
import snackbar from './reducers/snackbar';

const rootReducer = combineReducers({
  form,
  user,
  snackbar,
});

export default rootReducer;
