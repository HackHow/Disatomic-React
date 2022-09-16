const DNS = 'http://localhost:3001';
const REGISTER_URL = `${DNS}/api/1.0/user/signup`;
const LOGIN_URL = `${DNS}/api/1.0/user/signin`;
const USER_INFO = `${DNS}/api/1.0/user`;

const ADD_FRIEND_URL = `${DNS}/api/1.0/friend`;

const CREATE_SERVER = `${DNS}/api/1.0/server`;

const constants = {
  REGISTER_URL,
  LOGIN_URL,
  USER_INFO,
  ADD_FRIEND_URL,
  CREATE_SERVER,
};

export default constants;
