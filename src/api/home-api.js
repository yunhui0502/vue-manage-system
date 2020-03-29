/* eslint-disable require-jsdoc */
import Axios from 'axios';
function getstoneproduct(bossId) {
  return Axios.get('/api/api/product/home/findAmountData?bossId=' + bossId);
}
export default {
  getstoneproduct: getstoneproduct,

};
