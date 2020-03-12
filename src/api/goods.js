/* eslint-disable require-jsdoc */
import Axios from 'axios';
// =============================================商品模块

function getGoodsByProductId(productId) {
  return Axios.get('/api/api/product/product/selectProductGoods?productId=' + productId);
}
// 根据文件ID获取图片
function getFileFileId(fileId) {
  return Axios.get('/api/api/product/goods/getFile?fileId=' + fileId);
}

// 添加物品
function addProduct(params) {
  let fd = new FormData();
  fd.append('productId', params.productId);
  fd.append('cancelId', params.cancelId);
  fd.append('claim', params.claim);
  fd.append('frames', params.frames);
  fd.append('goodName', params.goodName);
  fd.append('goodsDesc', params.goodsDesc);
  fd.append('requestId', params.requestId);
  fd.append('token', params.token);
  fd.append('fileInfo1', params.fileInfo1);
  fd.append('userId', params.userId);
  return Axios.post('/api/api/product/goods/create', fd);
}
// 添加物品规格值
function additionSpecs (params) {
  let fd = new FormData();
  fd.append('goodsId', params.goodsId);
  fd.append('requestId ', params.requestId);
  fd.append('specValue', params.specValue);
  fd.append('timestamp', params.timestamp);
  fd.append('token', params.token);
  fd.append('userId', params.userId);
  fd.append('productSpecId', params.productSpecId);
  return Axios.post('/api/api/product/goods/addSpecify', fd);
}
export default {
  getGoodsByProductId: getGoodsByProductId,
  getFileFileId: getFileFileId,
  addProduct: addProduct,
  additionSpecs: additionSpecs,
};
