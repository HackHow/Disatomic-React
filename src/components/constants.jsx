const DNS = 'http://localhost:3001';
const REGISTER_URL = `${DNS}/api/1.0/user/signup`;
const LOGIN_URL = `${DNS}/api/1.0/user/signin`;
const USER_INFO = `${DNS}/api/1.0/user`;

const ADD_FRIEND_URL = `${DNS}/api/1.0/friend`;

const CREATE_SERVER = `${DNS}/api/1.0/server`;
const SERVER_INFO = `${DNS}/api/1.0/server`;

const GET_ALL_FRIEND = `${DNS}/api/1.0/friend/all`;
const GET_PENDING_FRIEND = `${DNS}/api/1.0/friend/pending`;

const CREATE_CHANNEL = `${DNS}/api/1.0/channel`;

const CHANNEL = `${DNS}/api/1.0/channel`;

const ACCEPT_FRIEND = `${DNS}/api/1.0/friend/accept`;
const REJECT_FRIEND = `${DNS}/api/1.0/friend/reject`;
const CANCEL_FRIEND = `${DNS}/api/1.0/friend/cancel`;

const constants = {
  REGISTER_URL,
  LOGIN_URL,
  USER_INFO,
  ADD_FRIEND_URL,
  CREATE_SERVER,
  SERVER_INFO,
  GET_ALL_FRIEND,
  GET_PENDING_FRIEND,
  CREATE_CHANNEL,
  CHANNEL,
  ACCEPT_FRIEND,
  REJECT_FRIEND,
  CANCEL_FRIEND,
};

export default constants;
