/* eslint-disable require-jsdoc */
import order from '@/api/order.js';

async function selectOrder(param,handleResult) {
    order.selectOrder(param).then(res => handleResult(res));
}
async function backendData(handleResult) {
    order.backendData().then(res => handleResult(res));
}
async function orderStatistics(handleResult) {
    order.orderStatistics().then(res => handleResult(res));
}
async function userStatistics(handleResult) {
    order.userStatistics().then(res => handleResult(res));
}
async function selectAdmissionOrder(param,handleResult) {
    order.selectAdmissionOrder(param).then(res => handleResult(res));
}
async function selectVideoOrderr(param,handleResult) {
    order.selectVideoOrderr(param).then(res => handleResult(res));
}
async function statisticsOrder(handleResult) {
    order.statisticsOrder().then(res => handleResult(res));
}

export default {
    selectOrder: selectOrder,
    backendData:backendData,
    orderStatistics:orderStatistics,
    userStatistics:userStatistics,
    selectAdmissionOrder: selectAdmissionOrder,
    selectVideoOrderr: selectVideoOrderr,
    statisticsOrder: statisticsOrder,

};
