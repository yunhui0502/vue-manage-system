/* eslint-disable require-jsdoc */
import log from '@/api/login-api.js';

async function login(params, handleResult) {
  log.login(params).then((res) => handleResult(res));
}

export default {
  login: login,
};

