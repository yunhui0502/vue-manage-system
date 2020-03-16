/* eslint-disable require-jsdoc */
import orderCenter from '@/api/orderCenter_api.js';
// 添加后台管理员
async function checkStatus(handleResult) {
    orderCenter.checkStatus().then((res) => handleResult(res));
}
async function checkOrder(orderStatus,handleResult) {
    orderCenter.checkOrder(orderStatus).then((res) => handleResult(res));
}
async function upDataOrderStatus(params,handleResult) {
    orderCenter.upDataOrderStatus(params).then((res) => handleResult(res));
}

export default {
    checkStatus: checkStatus,
    checkOrder: checkOrder,
    upDataOrderStatus: upDataOrderStatus
};
