const DNS = 'http://localhost:3001';
const REGISTER_URL = `${DNS}/api/1.0/user/signup`;
const LOGIN_URL = `${DNS}/api/1.0/user/signin`;
const ADD_FRIEND_URL = `${DNS}/api/1.0/user/friend`;
const CREATE_SERVER = `${DNS}/api/1.0/server`;
const USER_INFO = `${DNS}/api/1.0/user`;

const constants = {
  REGISTER_URL,
  LOGIN_URL,
  ADD_FRIEND_URL,
  CREATE_SERVER,
  USER_INFO,
};

export default constants;
