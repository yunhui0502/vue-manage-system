/* eslint-disable require-jsdoc */
import eventsManage from '@/api/eventsManage.js';
// ========================================秒杀

// 获取秒杀商品列表
async function select(handleResult) {
  eventsManage.select().then((res) => handleResult(res));
}
// 获取所有商品列表
async function selectAll(handleResult) {
  eventsManage.selectAll().then((res) => handleResult(res));
}
// 添加秒杀商品接口
async function ceateInsert(params, handleResult) {
  eventsManage.ceateInsert(params).then((res) => handleResult(res));
}
// ========================================拼团

// ========================================精选
// ========================================分销
export default {
  select: select,
  ceateInsert: ceateInsert,
  selectAll: selectAll,
};
