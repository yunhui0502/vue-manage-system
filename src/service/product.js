/* eslint-disable require-jsdoc */
import product from '@/api/product.js';

async function getProductsByBossId(handleResult) {
  let bossId = 1;
  product.getProductsByBossId(bossId).then((res) => handleResult(res));
}

async function deleteById(productId, handleResult) {
  product.deleteProductById(productId).then((res) => handleResult(res));
}

async function ceateProduct(productInfo, handleResult) {
  // 组装请求参数
  product.ceateProduct(productInfo).then((res) => handleResult(res));
}


async function getCatagery(handleResult) {
  product.getCatagery().then((res) => handleResult(res));
}
export default {
  getProductsByBossId: getProductsByBossId,
  deleteById: deleteById,
  ceateProduct: ceateProduct,
  getCatagery: getCatagery,
};
