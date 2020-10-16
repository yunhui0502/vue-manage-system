/* eslint-disable require-jsdoc */
import product from '@/api/payment.js';

async function selectWithdrawal(source,handleResult) {
    product.selectWithdrawal(source).then(res => handleResult(res));
}
async function disposeWithdrawalApply(params,handleResult) {
    product.disposeWithdrawalApply(params).then(res => handleResult(res));
}
export default {
    selectWithdrawal: selectWithdrawal,
    disposeWithdrawalApply:disposeWithdrawalApply
};
