/* eslint-disable require-jsdoc */
import goods from '@/api/goods.js';

async function getGoodsByProductId(productId, handleResult) {
  goods.getGoodsByProductId(productId).then((res) => handleResult(res));
}

export default {
  getGoodsByProductId: getGoodsByProductId,
};
