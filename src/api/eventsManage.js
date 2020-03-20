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
// 单个删除秒杀商品
function killDelete(id) {
  console.log(id);
  return Axios.get('/api/api/product/kill/delete?id=' + id);
}
// 添加秒杀商品接口 startTime
function ceateInsert(params) {
  let fd = new FormData();
  fd.append('goodsId', params.goodsId);
  fd.append('id', params.id);
  fd.append('price', params.price);
  fd.append('repertory', params.repertory);
  fd.append('startTime', params.startTime);
  fd.append('stopTime', params.stopTime);
  // 添加商品接口
  return Axios.post('/api/api/product/kill/insert', fd);
}
// 修改秒杀商品接口 startTime
function killupdate(params) {
  let fd = new FormData();
  fd.append('goodsId', params.goodsId);
  fd.append('price', params.price);
  fd.append('id', params.id);
  fd.append('repertory', params.repertory);
  fd.append('startTime', params.startTime);
  fd.append('stopTime', params.stopTime);
  return Axios.post('/api/api/product/kill/update', fd);
}

// ========================================拼团
// 获取团购商品列表
function groupSelete() {
  return Axios.get('/api/api/product/group/selete');
}
// 单个删除秒杀商品
function groupDelete(id) {
  return Axios.get('/api/api/product/group/delete?id=' + id);
}

// 添加团购商品接口
function groupInsert(params) {
  let fd = new FormData();
  fd.append('goodsId', params.goodsId);
  fd.append('number', params.number);
  fd.append('price', params.price);
  fd.append('repertory', params.repertory);
  fd.append('startTime', params.startTime);
  fd.append('stopTime', params.stopTime);
  return Axios.post('/api/api/product/group/insert', fd);
}
// 修改团购商品接口
function groupupdate(params) {
  let fd = new FormData();
  fd.append('goodsId', params.goodsId);
  fd.append('number', params.number);
  fd.append('groupId', params.groupId);
  fd.append('price', params.price);
  fd.append('repertory', params.repertory);
  fd.append('startTime', params.startTime);
  fd.append('stopTime', params.stopTime);
  return Axios.post('/api/api/product/group/update', fd);
}
// ========================================精选

// 查询排行相关信息
function seniorityfindSeniorityInfo() {
  return Axios.get('/api/api/product/seniority/findSeniorityInfo');
}
// 查询排行内容
function seniorityfindSeniorityContent() {
  return Axios.get('/api/api/product/seniority/findSeniorityContent');
}
// 添加排行相关信息
function seniorityEvent(params) {
  let fd = new FormData();
  // fd.append('fileId', params.fileId);
  fd.append('fileInfo', params.fileInfo);
  fd.append('repertory', params.repertory);
  fd.append('seniorityName', params.seniorityName);
  fd.append('timestamp', params.timestamp);
  fd.append('token', params.token);
  fd.append('userId', params.userId);
  return Axios.post('/api/api/product/seniority/addSeniorityInfo', fd);
}
// 排行相关信息和商品进行绑定
function seniorityBinding(params) {
  let fd = new FormData();
  fd.append('transfedata.goodsId', params.goodsId);
  fd.append('seniorityId', params.seniorityId);
  return Axios.post('/api/api/product/seniority/addSeniorityContent', fd);
}
// 单个删除排行相关信息
function seniorityDelete(seniorityId) {
  return Axios.get('/api/api/product/seniority/deleteSeniorityInfo?seniorityId=' + seniorityId);
}

// 根据排行相关信息获取 绑定信息
function seniorityfind(seniorityId) {
  return Axios.get('/api/api/product/seniority/findSeniorityContent?seniorityId=' + seniorityId);
}
// ========================================分销
export default {
  // 秒杀
  select: select,
  ceateInsert: ceateInsert,
  selectAll: selectAll,
  killDelete: killDelete,
  killupdate: killupdate,
  // 团购
  groupSelete: groupSelete,
  groupInsert: groupInsert,
  groupDelete: groupDelete,
  groupupdate: groupupdate,
  // 精选
  seniorityfindSeniorityInfo: seniorityfindSeniorityInfo,
  seniorityEvent: seniorityEvent,
  seniorityBinding: seniorityBinding,
  seniorityDelete: seniorityDelete,
  seniorityfind: seniorityfind,
  seniorityfindSeniorityContent: seniorityfindSeniorityContent,
};

