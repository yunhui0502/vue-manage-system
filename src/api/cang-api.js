/* eslint-disable require-jsdoc */
import Axios from 'axios';

function addcang(params) {
  let fd = new FormData();
  console.log(params);
  fd.append('hfDesc', params.hfDesc);
  fd.append('bossId', params.bossId);
  fd.append('hfName', params.hfName);
  fd.append('hfRegion', params.hfRegion);
  fd.append('userId', params.userId);
  return Axios.post('/api/api/product/wareHouse/createWareHouse', fd);
}


function checkcang(params) {
  console.log(params);
  return Axios.get('/api/api/product/wareHouse/listWareHouse?bossId=' + params.bossId);

}
function delcang(wareHouseId) {
  console.log(wareHouseId);
  return Axios.get('/api/api/product/wareHouse/deleteWareHouse?wareHouseId=' + wareHouseId);

}
function editcang(params) {
  let fd = new FormData();
  console.log(params);
  fd.append('hfDesc', params.hfDesc);
  fd.append('bossId', params.bossid);
  fd.append('hfName', params.hfName);
  fd.append('hfRegion', params.hfRegion);
  fd.append('userId', params.userId);
  fd.append('id', params.id);
  return Axios.post('/api/api/product/wareHouse/updateWareHouse', fd);
}
function findkulist() {
  return Axios.get('/api/api/product/wareHouse/findGoodsWarsehouse?dataType=1');

}
function rucang(params) {
  let fd = new FormData();
  console.log(params);
  fd.append('goodId', params.goodId);
  fd.append('productId', params.productId);
  fd.append('quantity', params.quantity);
  fd.append('typeWho', params.typeWho);
  fd.append('userId', params.userId);
  fd.append('warehouseId', params.warehouseId);
  return Axios.post('/api/api/product/wareHouse/goodInWarsehouse', fd);
}
export default {
  addcang: addcang,
  checkcang: checkcang,
  delcang: delcang,
  editcang: editcang,
  findkulist: findkulist,
  rucang: rucang,
};

