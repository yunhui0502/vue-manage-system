import Axios from 'axios';

let payment = 'https://swcloud.tjsichuang.cn:1444/second/payment';
// =============================================商品模块
//入驻商家列表
function selectWithdrawal(source) {
    return Axios.get(payment + '/Withdrawal/selectWithdrawal?source=' + source);
}

function disposeWithdrawalApply(params) {
    let fd = new FormData();
    fd.append('WithdrawalId', params.WithdrawalId);
    fd.append('originalType', params.originalType );
    fd.append('type', params.type);
    fd.append('userId', params.userId );
    return Axios.post(payment + '/Withdrawal/disposeWithdrawalApply', fd);
}

export default {
    selectWithdrawal: selectWithdrawal,
    disposeWithdrawalApply:disposeWithdrawalApply
};
