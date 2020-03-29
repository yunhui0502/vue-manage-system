/* eslint-disable require-jsdoc */
import home from '@/api/home-api.js';
async function getstoneproduct(bossId, handleResult) {
  home.getstoneproduct(bossId).then((res) => handleResult(res));
}
export default {
  getstoneproduct: getstoneproduct,
};

