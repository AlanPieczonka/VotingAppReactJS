import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000',
});

export default {
  user: {
    signup: user =>
      API.post('/join', { user }).then(res => res.data.user),
  },
};
