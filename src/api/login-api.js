/* eslint-disable require-jsdoc */
import Axios from 'axios';

function login (params) {
  console.log(params);
  let fd = new FormData();
  fd.append('authKey', params.authKey);
  fd.append('authType', params.authType);
  fd.append('passwd', params.code);
  fd.append('type', params.type);
  return Axios.post('/api/api/user/hf-auth/login', fd);
}
export default {
  login: login,
};
