/* eslint-disable require-jsdoc */
import Axios from 'axios';
// =============================================商品模块
// 获取商品列表
function getProductsByBossId(bossId) {
  return Axios.get('/api/api/product/hfProduct/getstone?bossId=' + bossId);
}
// 获取当前商品
function getDetail(productId) {
  return Axios.get('/api/api/product/hfProduct/getDetail?productId=' + productId);
}
// 删除商品图片
function deleteProductPictrue(fileId, productId) {
  return Axios.post('/api/api/product/product/deleteProductPictrue?fileId=' + fileId + '&productId=' + productId);
}
// 添加商品接口 lastModifier
function ceateProduct(params) {
  let fd = new FormData();
  fd.append('bossId ', params.bossId);
  fd.append('categoryId', params.categoryId);
  fd.append('hfName ', params.productName);
  fd.append('productDesc ', params.productDesc);
  fd.append('lastModifier ', params.lastModifier);

  // fd.append('requestId', params.requestId);
  // fd.append('lastModifier', params.lastModifier);
  // fd.append('productDesc', params.productDesc);
  // fd.append('token', params.token);
  // fd.append('userId', params.userId);
  // fd.append('fileInfo', params.fileInfo);
  // 添加商品接口
  return Axios.post('/api/api/product/product/addproduct', fd);
}

// 更新商品接口
function updateProduct(params) {
  let fd = new FormData();
  fd.append('bossId ', params.bossId);
  fd.append('categoryId', params.categoryId);
  fd.append('hfName', params.productName);
  fd.append('productDesc', params.productDesc);
  fd.append('id', params.id);
  fd.append('lastModifier', params.lastModifier);
  return Axios.post('/api/api/product/product/updateProductId', fd);
}
// 删除商品
function deleteProduct(productId) {
  return Axios.get('/api/api/product/product/deleteProductId?productId=' + productId);
}
// 删除商品规格
function deleteSpecifies(productSpecId) {
  return Axios.get('/api/api/product/product/deleteSpecifies?productSpecId=' + productSpecId);
}
// 获取类目列表
function getCatagery() {
  return Axios.get('/api/api/product/product/categoryAll');
}

// 根据商品ID获取商品图片列表和文件ID
function selectProductPictures(productId) {
  return Axios.get('/api/api/product/product/selectProductPictures?productId=' + productId);
}

// 商品规格
function specifies(productId) {
  return Axios.get('/api/api/product/product/specifies?productId=' + productId);
}
// 添加商品规格
function addSpecify (params) {
  let fd = new FormData();
  fd.append('hfName', params.hfName);
  fd.append('requestId ', params.requestId);
  fd.append('timestamp', params.timestamp);
  fd.append('productId', params.productId);
  fd.append('specType', params.specType);
  fd.append('specUnit', params.specUnit);
  fd.append('token', params.token);
  fd.append('userId', params.userId);
  fd.append('specValue', params.specValue);
  return Axios.post('/api/api/product/product/addSpecify', fd);
}

// 修改商品规格
function updatespec (params) {
  let fd = new FormData();
  fd.append('specName', params.hfName);
  fd.append('productId', params.productId);
  fd.append('productSpecId', params.productSpecId);
  fd.append('specUnit', params.specUnit);
  return Axios.post('/api/api/product/product/updatespec', fd);
}
export default {
  getProductsByBossId: getProductsByBossId,
  ceateProduct: ceateProduct,
  getCatagery: getCatagery,
  selectProductPictures: selectProductPictures,
  specifies: specifies,
  addSpecify: addSpecify,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  getDetail: getDetail,
  deleteSpecifies: deleteSpecifies,
  deleteProductPictrue: deleteProductPictrue,
  updatespec: updatespec,
};
