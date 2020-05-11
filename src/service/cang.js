/* eslint-disable require-jsdoc */
import cang from '@/api/cang-api.js';

async function addcang(params, handleResult) {
  cang.addcang(params).then((res) => handleResult(res));
}
async function checkcang(params, handleResult) {
  cang.checkcang(params).then((res) => handleResult(res));
}
async function delcang(wareHouseId, handleResult) {
  cang.delcang(wareHouseId).then((res) => handleResult(res));
}
async function editcang(params, handleResult) {
  cang.editcang(params).then((res) => handleResult(res));
}
async function findkulist(handleResult) {
  cang.findkulist().then((res) => handleResult(res));
}
async function rucang(params, handleResult) {
  cang.rucang(params).then((res) => handleResult(res));
}
export default {
  addcang: addcang,
  checkcang: checkcang,
  delcang: delcang,
  editcang: editcang,
  findkulist: findkulist,
  rucang: rucang,
};
