/* eslint-disable require-jsdoc */
import product from '@/api/product.js';

async function getProductsByBossId(handleResult) {
  let bossId = 2;
  product.getProductsByBossId(bossId).then((res) => handleResult(res));
}

async function deleteById(productId, handleResult) {
  product.deleteProductById(productId).then((res) => handleResult(res));
}

export default {
  getProductsByBossId: getProductsByBossId,
  deleteById: deleteById,
};
