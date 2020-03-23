/* eslint-disable require-jsdoc */
import store from '@/api/store-api.js';

async function addStore(params, handleResult) {
  store.addStore(params).then((res) => handleResult(res));
}
async function getStore(bossId, handleResult) {
  store.getStore(bossId).then((res) => handleResult(res));
}
async function addPerson(params, handleResult) {
  store.addPerson(params).then((res) => handleResult(res));
}
async function checkPerson(storeId, handleResult) {
  store.checkPerson(storeId).then((res) => handleResult(res));
}
async function getStoreid(id, handleResult) {
  store.getStoreid(id).then((res) => handleResult(res));
}
async function updataStore(params, handleResult) {
  store.updataStore(params).then((res) => handleResult(res));
}
async function isCancel(params, handleResult) {
  store.isCancel(params).then((res) => handleResult(res));
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
