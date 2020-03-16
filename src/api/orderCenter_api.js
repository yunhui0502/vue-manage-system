import Axios from 'axios'
function checkStatus(state) {
    return Axios.get('/api/api/order/order/status')
}
function checkOrder(orderStatus) {
    return Axios.get('/api/api/order/hf-order/query?orderStatus=' + orderStatus);
}
function upDataOrderStatus(params) {
    return Axios.get('/api/api/order/hf-order/modifyStatus?Id=' + params.id+'&orderCode='+params.orderCode+
    '&originOrderStatus='+params.originOrderStatus+'&targetOrderStatus='+params.targetOrderStatus);
}

export default {
    checkStatus: checkStatus,
    checkOrder: checkOrder,
    upDataOrderStatus:upDataOrderStatus
}