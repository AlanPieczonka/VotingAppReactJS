import { createStore, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  form: reduxFormReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(),
);

export default store;

