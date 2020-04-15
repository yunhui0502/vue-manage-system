/* eslint-disable require-jsdoc */
import Axios from 'axios';

function addStore(params) {
  let fd = new FormData();
  fd.append('bossId ', 1);
  fd.append('hfDesc', params.hfDesc);
  fd.append('hfName ', params.hfName);
  fd.append('hfStatus', params.hfStatus);
  fd.append('userId', params.userId);
  fd.append('address', params.address);
  return Axios.post('/api/api/product/stone/addStone', fd);
}
function getStore(bossId) {
  return Axios.get('/api/api/product/stone/byBossId?bossId=' + bossId);
}
function getStoreid(id) {
  return Axios.get('/api/api/product/stone/selectById?id=' + id);
}
function addPerson(params) {
  console.log(params);
  let fd = new FormData();
  fd.append('StoreRoleId', 1);
  fd.append('ids', params.ids);
  fd.append('storeId', params.stoneId);
  return Axios.post('/api/api/user/HfStoreMenber/add', fd);
}
function checkPerson(storeId) {
  return Axios.get('/api/api/user/HfStoreMenber/select?bossId=1&storeId=' + storeId);
}
function isCancel(params) {
  return Axios.get('/api/api/user/HfStoreMenber/isCancel?isCancel=' + params.isCancel + '&userId=' +
   params.userId + '&stoneId=' + params.stoneId);
}
function getStoreRole(storeId) {
  return Axios.get('/api/api/user/HfStoreMenber/selectRole?StoreId=' + storeId);
}
function updateRole(params) {
  return Axios.get('/api/api/user/HfStoreMenber/updateRole?StoreId=' + params.storeId + '&StoreRoleId=' + params.StoreRoleId + '&userId=' + params.userId);
}
function getstoneproduct(storeId) {
  return Axios.get('/api/api/product/hfProduct/getstone?stoneId=' + storeId);
}
function updataStore(params) {
  console.log(params);
  let fd = new FormData();
  fd.append('bossId ', 1);
  fd.append('hfDesc', params.hfDesc);
  fd.append('hfName ', params.hfName);
  fd.append('hfStatus', params.hfStatus);
  fd.append('userId', params.userId);
  fd.append('address', params.address);
  fd.append('stoneId', params.stoneId);
  return Axios.post('/api/api/product/stone/updateStone', fd);
}
function storeAddProduct(params) {
  console.log(params);
  let fd = new FormData();
  fd.append('productIds ', params.productIds);
  fd.append('stoneId', params.stoneId);
  fd.append('userId ', params.userId);
  return Axios.post('/api/api/product/product/addStoneProduct', fd);
}
function getproductgood(productId) {
  return Axios.get('/api/api/product/product/selectProductGoods?productId=' + productId);
}
function selectProductGoods(productId, stoneId) {
  return Axios.get('/api/api/product/product/selectProductGoods?productId=' + productId + '&stoneId' + stoneId);
}
function updatagood(params) {
  console.log(params);
  let fd = new FormData();
  fd.append('id', params.id);
  fd.append('stoneId', params.stoneId);
  fd.append('userId ', params.userId);
  fd.append('productId ', params.productId);
  fd.append('sellPrice ', params.sellPrice);
  return Axios.post('/api/api/product/goods/updategood', fd);
}
function addStonePicture(params) {
  console.log(params);
  let fd = new FormData();
  fd.append('file', params.file);
  fd.append('stoneId', params.stoneId);
  return Axios.post('/api/stone/addStonePicture', fd);
}
export default {
  addStore: addStore,
  getStore: getStore,
  addPerson: addPerson,
  checkPerson: checkPerson,
  getStoreid: getStoreid,
  updataStore: updataStore,
  isCancel: isCancel,
  getStoreRole: getStoreRole,
  updateRole: updateRole,
  getstoneproduct: getstoneproduct,
  storeAddProduct: storeAddProduct,
  getproductgood: getproductgood,
  updatagood: updatagood,
  selectProductGoods: selectProductGoods,
  addStonePicture: addStonePicture,
};
