/* eslint-disable require-jsdoc */
import Axios from 'axios';
// =============================================商品模块
// 获取商品列表
function getProductsByBossId(bossId) {
  return Axios.get('/api/api/product/product/byBossId?bossId=' + bossId);
}

// 添加商品接口
function ceateProduct(params) {

  let fd = new FormData();
  fd.append('userStatus', params.userStatus);
  fd.append('realName', params.realName);
  // fd.append('birthDay', params.birthDay)
  fd.append('phone', params.phone);
  fd.append('requestId', params.requestId);
  fd.append('sex', params.sex);
  fd.append('token', params.token);
  fd.append('userId', params.userId);
  // 添加商品接口
  return Axios.post('/log/user/update', fd);
}

// 获取类目列表
function getCatagery() {
  return Axios.get('/api/api/product/product/byBossId');
}

export default {
  getProductsByBossId: getProductsByBossId,
  ceateProduct: ceateProduct,
  getCatagery: getCatagery,
};
