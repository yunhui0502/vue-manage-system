import Axios from 'axios';

// let order = 'https://www.tjsichuang.cn:1443/second/order';
let order = 'https://swcloud.tjsichuang.cn:1444/second/order';
// =============================================商品模块
//查询订单
function selectOrder(param) {
    return Axios.get(order + '/SecondOrder/selectOrder', { params: param });
}

function authenticationDispose(params) {
    let fd = new FormData();
    fd.append('AuthenticationId', params.AuthenticationId);
    fd.append('EndAuthenticationState', params.EndAuthenticationState);
    fd.append('StartAuthenticationState', params.StartAuthenticationState);
    fd.append('sonId', params.sonId);
    return Axios.post(user + '/MiniLoginController/authenticationDispose', fd);
}
//每月收入图标
function backendData() {
    return Axios.get(order + '/Statistics/backendData?sonId=0');
}
//订单统计
function orderStatistics() {
    return Axios.get(order + '/Statistics/orderStatistics');
}
//用户统计
function userStatistics() {
    return Axios.get(order + '/Statistics/userStatistics');
}
// //用户统计
// function userStatistics() {
//     return Axios.get(order + '/Statistics/userStatistics');
// }
// //用户统计
// function userStatistics() {
//     return Axios.get(order + '/Statistics/userStatistics');
// }
function selectAdmissionOrder(params) {
    let fd = new FormData();
    if (params.orderStatus != 'all') {
        fd.append('orderStatus', params.orderStatus);
    }

    fd.append('type', params.type);
    return Axios.post(order + '/SecondOrder/selectAdmissionOrder', fd);
}
function selectVideoOrderr(params) {
    let fd = new FormData();
    if (params.orderStatus != 'all') {
        fd.append('orderStatus', params.orderStatus);
    }

    fd.append('type', params.type);
    return Axios.post(order + '/SecondOrder/selectVideoOrder', fd);
}
function statisticsOrder() {
    return Axios.post(order + '/Statistics/statisticsOrder');
}

export default {
    selectOrder: selectOrder,
    authenticationDispose: authenticationDispose,
    backendData: backendData,
    orderStatistics: orderStatistics,
    userStatistics: userStatistics,
    selectAdmissionOrder: selectAdmissionOrder,
    selectVideoOrderr: selectVideoOrderr,
    statisticsOrder: statisticsOrder,
   
};
