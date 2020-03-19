/* eslint-disable require-jsdoc */
import Axios from 'axios';
// ========================================秒杀

// 获取秒杀商品列表
function select() {
  return Axios.get('/api/api/product/kill/select');
}
// 获取所有商品列表
function selectAll() {
  return Axios.get('/api/api/product/kill/selectAll');
}
// 添加秒杀商品接口 startTime
function ceateInsert(params) {
  let fd = new FormData();
  fd.append('goodsId', params.goodsId);
  fd.append('price', params.price);
  fd.append('repertory', params.repertory);
  fd.append('startTime', params.startTime);
  fd.append('stopTime', params.stopTime);
  // 添加商品接口
  return Axios.post('/api/api/product/kill/insert', fd);
}

// ========================================拼团

// ========================================精选
// ========================================分销
export default {
  select: select,
  ceateInsert: ceateInsert,
  selectAll: selectAll,
};

