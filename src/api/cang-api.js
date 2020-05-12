/* eslint-disable max-len */
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
  fd.append('bossId ', params.bossId);
  fd.append('stoneId ', params.stoneId);
  fd.append('inStorgeId ', params.id);
  return Axios.post('/api/api/product/wareHouse/goodInWarsehouse', fd);
}

function findcang(id) {
  console.log(id);
  return Axios.get('/api/api/product/wareHouse/findGoodsByWarsehouse?wareHouseId=' + id);

}

function chucang(params) {
  let fd = new FormData();
  console.log(params);
  console.log(params.warehouseId, params.type);
  fd.append('goodId', params.goodId);
  fd.append('productId', params.productId);
  fd.append('quantity', params.quantity);
  fd.append('typeWho', params.type);
  fd.append('userId', params.userId);
  fd.append('warehouseId', params.warehouseId);
  fd.append('bossId ', params.bossId);
  fd.append('stoneId ', params.stoneId);
  fd.append('outStorageId ', params.id);
  return Axios.post('/api/api/product/wareHouse/goodOutWarsehouse', fd);
}
function record() {
  return Axios.get('/api/api/product/wareHouse/findWarsehouseRecord');

}
function dan() {

  return Axios.get('/api/api/product/wareHouse/findGoodsWarsehouse?dataType=0');

}
function findRecord(params) {
  console.log(params);
  // eslint-disable-next-line max-len
  // return Axios.get('/api/api/product/wareHouse/findWarsehouseRecord?goodName=' + params.goodName + '&type=' + params.type + '&warehouseId=' + params.wareHouseId);
  return Axios.get('/api/api/product/wareHouse/findWarsehouseRecord?end=' + params.end + '&goodName=' + params.goodName + '&strat=' + params.strat + '&type=' + params.type + '&warehouseId=' + params.wareHouseId);
}
function findru(params) {
  console.log(params);
  // eslint-disable-next-line max-len
  // return Axios.get('/api/api/product/wareHouse/findWarsehouseRecord?goodName=' + params.goodName + '&type=' + params.type + '&warehouseId=' + params.wareHouseId);
  return Axios.get('/api/api/product/wareHouse/findGoodsWarsehouse?categoryName=' + params.categoryName + '&dataType=' + params.dataType + '&goodName=' + params.goodName);
}

export default {
  addcang: addcang,
  checkcang: checkcang,
  delcang: delcang,
  editcang: editcang,
  findkulist: findkulist,
  rucang: rucang,
  findcang: findcang,
  chucang: chucang,
  record: record,
  dan: dan,
  findRecord: findRecord,
  findru: findru,
};

