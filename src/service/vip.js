/* eslint-disable require-jsdoc */
import vip from '@/api/vip-api.js';

async function addLevel(params, handleResult) {
  vip.addLevel(params).then((res) => handleResult(res));
}
async function checkLevel (handleResult) {
  vip.checkLevel().then((res) => handleResult(res));
}

export default {
  addLevel: addLevel,
  checkLevel: checkLevel,
};

