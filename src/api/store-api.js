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
export default {
  addStore: addStore,
  getStore: getStore,
  addPerson: addPerson,
  checkPerson: checkPerson,
  getStoreid: getStoreid,
  updataStore: updataStore,
  isCancel: isCancel,
};
