/* eslint-disable require-jsdoc */
import Axios from 'axios';
// =============================================商品模块

function getGoodsByProductId(productId) {
  return Axios.get('/api/api/product/hf-goods/getHfGoodsByProductId?quantity=' + productId);
}
// 根据文件ID获取图片
function getFileFileId(fileId) {
  return Axios.get('/api/api/product/goods/getFile?fileId=' + fileId);
}
export default {
  getGoodsByProductId: getGoodsByProductId,
  getFileFileId: getFileFileId,
};
