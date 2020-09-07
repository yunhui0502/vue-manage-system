/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable require-jsdoc */
import cart from '@/api/cart-api.js';

async function AddMethod(params, handleResult) {
    cart.AddMethod(params).then((res) => handleResult(res));
}

async function SelectMethod(bossId, handleResult) {
    cart.SelectMethod(bossId).then((res) => handleResult(res));
}

async function withdrawalApply(params, handleResult) {
    cart.withdrawalApply(params).then((res) => handleResult(res));
}
async function DeletedMethod(params, handleResult) {
    cart.DeletedMethod(params).then((res) => handleResult(res));
}
async function withdrawalApplyList(handleResult) {
    cart.withdrawalApplyList().then((res) => handleResult(res));
}
async function disposeWithdrawalApply(params, handleResult) {
    cart.disposeWithdrawalApply(params).then((res) => handleResult(res));
}

export default {
    AddMethod: AddMethod,
    SelectMethod: SelectMethod,
    withdrawalApply: withdrawalApply,
    withdrawalApplyList: withdrawalApplyList,
    DeletedMethod: DeletedMethod,
    disposeWithdrawalApply: disposeWithdrawalApply,
};