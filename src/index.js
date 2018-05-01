import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import decode from 'jwt-decode';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import { userLoggedIn } from './actions/auth';

if (localStorage.votingappJWT) {
  const payload = decode(localStorage.votingappJWT);
  const user = {
    email: payload.email,
    token: localStorage.votingappJWT,
  };
  store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
registerServiceWorker();
