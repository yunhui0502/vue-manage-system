/* eslint-disable require-jsdoc */
import Axios from 'axios';

// 删除活动
function eventsDelete(id) {
  console.log(id);
  return Axios.post('/api/api/product/hfProductActivity/deleteProdcutActivity?id=' + id);
}
// 删除活动里的商品
function deleteGoods(id) {
  console.log(id);
  return Axios.post('/api/api/product/hfProductActivity/deleteActivityProduct?id=' + id);
}
// 给活动绑定商品
function seniorityBinding(params) {
  let fd = new FormData();
  fd.append('productId', params.goodsId);
  fd.append('id', params.seniorityId);
  return Axios.post('/api/api/product/hfProductActivity/intoActivityProduct', fd);
}
// 获取所有商品列表
function selectAll() {
  return Axios.get('/api/api/product/hfProduct/getProductsForRotation?quantity=10');
}

// 查询活动商品列表信息
function getActivityProductList(id) {
  return Axios.get('/api/api/product/hfProductActivity/getActivityProductList?id=' + id);
}
// 完善活动商品信息 添加价格
function updateActivityProduct(params) {
  let fd = new FormData();
  fd.append('id', params.id);
  fd.append('groupNum', params.groupNum);
  fd.append('favoravlePrice', params.favoravlePrice);
  if (params.discountRatio !== undefined) {
    fd.append('discountRatio', params.discountRatio);
  }
  fd.append('inventoryCelling', params.inventoryCelling);
  fd.append('timestamp', params.timestamp);
  fd.append('token', params.token);
  fd.append('userId', params.userId);
  fd.append('requestId', params.requestId);
  return Axios.post('/api/api/product/hfProductActivity/updateActivityProduct', fd);
}

// 修改活动品接口
function updateProdcutActivity(params) {
  let fd = new FormData();
  fd.append('activityName ', params.activityName);
  fd.append('id', params.id);
  return Axios.post('/api/api/product/hfProductActivity/updateProdcutActivity', fd);
}
// ========================================秒杀

// 获取秒杀商品列表
function select() {
  return Axios.get('/api/api/product/hfProductActivity/findProdcutActivity?activityType=seckillActivity');
}
// 获取商品活动类型
function getProdcutActivityType() {
  return Axios.get('/api/api/product/hfProductActivity/getProdcutActivityType');
}

// 添加秒杀商品接口
function ceateInsert(params) {
  let fd = new FormData();
  fd.append('activityName', params.activityName);
  fd.append('activityType', params.activityType);
  fd.append('startTime', params.startTime);
  fd.append('endTime', params.endTime);
  fd.append('timestamp', params.timestamp);
  fd.append('token', params.token);
  fd.append('userId', params.userId);
  fd.append('requestId', params.requestId);
  return Axios.post('/api/api/product/hfProductActivity/addProdcutActivity', fd);
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
  return Axios.get('/api/api/product/hfProductActivity/findProdcutActivity?activityType=groupActivity');
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
  return Axios.get('/api/api/product/hfProductActivity/findProdcutActivity?activityType=seniorityActivity');
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

// 单个删除排行相关信息
function seniorityDelete(seniorityId) {
  return Axios.get('/api/api/product/seniority/deleteSeniorityInfo?seniorityId=' + seniorityId);
}

// 根据排行相关信息获取 绑定信息
function seniorityfind(seniorityId) {
  return Axios.get('/api/api/product/seniority/findSeniorityContent?seniorityId=' + seniorityId);
}
// ========================================分销
// 获取分销活动列表
function findProdcutActivity() {
  return Axios.get('/api/api/product/hfProductActivity/findProdcutActivity?activityType=distributionActivity');
}

export default {
  // 秒杀
  select: select,
  ceateInsert: ceateInsert,
  selectAll: selectAll,
  eventsDelete: eventsDelete,
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
  // 分销
  findProdcutActivity: findProdcutActivity,

  getProdcutActivityType: getProdcutActivityType,
  getActivityProductList: getActivityProductList,
  updateActivityProduct: updateActivityProduct,
  deleteGoods: deleteGoods,
  updateProdcutActivity: updateProdcutActivity,
};

