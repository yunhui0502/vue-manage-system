/* eslint-disable require-jsdoc */
import Axios from 'axios';

function addStore(params) {
  let fd = new FormData();
  fd.append('bossId ', 1);
  fd.append('hfDesc', params.hfDesc);
  fd.append('hfName ', params.hfName);
  fd.append('hfStatus  ', params.hfStatus);
  fd.append('userId   ', params.userId);
  return Axios.post('/api/api/product/stone/addStone', fd);
}
function getStore(bossId) {
  return Axios.get('/api/api/product/stone/byBossId?bossId=' + bossId);
}
function addPerson(params) {
  console.log(params);
  let fd = new FormData();
  fd.append('userId', params.personid);
  fd.append('storeId', params.stoneId);
  return Axios.post('/api/api/user/HfStoreMenber/add', fd);
}
function checkPerson(storeId) {
  return Axios.get('/api/api/user/HfStoreMenber/select?bossId=1&storeId=' + storeId);
}

export default {
  addStore: addStore,
  getStore: getStore,
  addPerson: addPerson,
  checkPerson: checkPerson,
};
