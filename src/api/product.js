/* eslint-disable require-jsdoc */
import Axios from 'axios';
// =============================================商品模块
// 获取商品列表
function getProductsByBossId(bossId) {
  return Axios.get('/api/api/product/product/byBossId?bossId=' + bossId);
}

export default {
  getProductsByBossId: getProductsByBossId,
};
