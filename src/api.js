import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000',
});

export default {
  user: {
    signup: user =>
      API.post('/user', { user }).then(res => res.data.user),
    login: credentials =>
      API.post('/auth', { credentials }).then(res => res.data.user),
  },
};
