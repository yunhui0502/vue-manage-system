/* eslint-disable require-jsdoc */
import Axios from 'axios';
// =============================================商品模块

function getGoodsByProductId(productId) {
  return Axios.get('/api/api/product/hf-goods/getHfGoodsByProductId?quantity=' + productId);
}
export default {
  getGoodsByProductId: getGoodsByProductId,
};
