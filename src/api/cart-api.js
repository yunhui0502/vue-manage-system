/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable require-jsdoc */
import Axios from './index';
// 添加取款方法
function AddMethod(params) {
    let fd = new FormData();
    fd.append('bossId', params.bossId);
    fd.append('commissionType', params.commissionType);
    fd.append('grantAccount', params.grantAccount);
    fd.append('withdrawalCommission', params.withdrawalCommission);
    fd.append('withdrawalWayName', params.withdrawalWayName);
    return Axios.post('/api/api/cart/Withdrawal/AddMethod', fd);
}
// 取款申请
function withdrawalApply(params) {
    let fd = new FormData();
    fd.append('bossId', params.bossId);
    fd.append('account ', params.account);
    fd.append('methodId ', params.methodId);
    fd.append('money ', params.money);
    fd.append('name ', params.name);
    fd.append('stoneId  ', params.stoneId);
    fd.append('userId  ', params.userId);
    return Axios.post('/api/api/cart/Withdrawal/withdrawalApply', fd);
}
// 删除取款
function DeletedMethod(params) {
    let fd = new FormData();
    fd.append('withdrawalMethodId ', params);
    return Axios.post('/api/api/cart/Withdrawal/DeletedMethod', fd);
}
// 处理取款申请
function disposeWithdrawalApply(params) {
    let fd = new FormData();
    fd.append('WithdrawalId ', params.WithdrawalId);
    fd.append('type', params.type);
    fd.append('userId ', params.userId);
    return Axios.post('/api/api/cart/Withdrawal/disposeWithdrawalApply', fd);
}
// 查询取款方法
function SelectMethod(bossId) {
    return Axios.get('/api/api/cart/Withdrawal/SelectMethod?bossId=' + bossId);
}

// 取款申请列表
function withdrawalApplyList() {
    return Axios.get('/api/api/cart/Withdrawal/withdrawalApplyList');
}

export default {
    AddMethod: AddMethod,
    SelectMethod: SelectMethod,
    withdrawalApplyList: withdrawalApplyList,
    withdrawalApply: withdrawalApply,
    DeletedMethod: DeletedMethod,
    disposeWithdrawalApply: disposeWithdrawalApply,
};