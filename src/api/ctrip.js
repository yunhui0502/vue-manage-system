import Axios from 'axios';

// let order = 'https://www.tjsichuang.cn:1443/second/order';
let ctrip = 'http://openservice.open.uat.ctripqa.com';
// =============================================商品模块
//查询订单
// Axios.defaults.withCredentials = true

function selectOrder(param) {
    return Axios.get(order + '/SecondOrder/selectOrder', { params: param });
}

function authorize(params) {
    return Axios({
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        method: 'post',
        url: '/api/openserviceauth/authorize.ashx?AID=' + params.AID +'&KEY='+params.KEY + '&SID='+params.SID,
      });
}
function ServiceProxy(params) {
    let tokenData = JSON.parse( localStorage.getItem('tokenData'))
  
    return Axios({
        headers: {
            'Access-Control-Allow-Origin': '*',
            'AccessControlAllowOrigin': '*',
        },
        method: 'post',
        url:  'api/OpenService/ServiceProxy.ashx?SID='+ 375 + '&token=' + tokenData.Access_Token
        + '&UUID=6dc27948-8ca8-11eb-83fc-0a80ff2603de' + '&Mode=1' + '&Format=JSON' + '&AID=' + 162 +'&ICODE=' + params.ICODE,
        // url: '/api/OpenService/ServiceProxy.ashx?SID='+ tokenData.SID + '&token=' + tokenData.Access_Token
        // + '&UUID=6dc27948-8ca8-11eb-83fc-0a80ff2603de' + '&Mode=1' + '&Format=JSON' + '&AID=' + tokenData.AID +'&ICODE=' + params.ICODE,
        data:params,
      });
 
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
    return Axios.post(order + 'SecondOrder/selectVideoOrderr', fd);
}
export default {
    authorize: authorize,
    ServiceProxy: ServiceProxy,

    selectOrder: selectOrder,
    
    backendData: backendData,
    orderStatistics: orderStatistics,
    userStatistics: userStatistics,
    selectAdmissionOrder: selectAdmissionOrder,
    selectVideoOrderr: selectVideoOrderr,
};
