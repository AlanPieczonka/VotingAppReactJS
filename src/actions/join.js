import api from '../api';
import { userLoggedIn } from './auth';
import setAuthorizationHeader from '../utils/setAuthorizationHeader';

export const signup = data => dispatch =>
  api.user.signup(data).then((user) => {
    localStorage.votingappJWT = user.token;
    setAuthorizationHeader(localStorage.votingappJWT);
    dispatch(userLoggedIn(user));
  });

